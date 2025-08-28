/*!
 * Before After Viewer - JavaScript plugin for Before After Viewer
 *
 * Copyright (c) 2021 MAMEDUL ISLAM
 *
 * Licensed under the MIT license:
 *   https://opensource.org/licenses/MIT
 *
 * Project home:
 *   https://mamedul.github.io/jquery-before-after-slider
 *
 * Version: 2.0.0
 */
(function($) {
	"use strict";

	// Inject CSS into <head> to avoid inline styles
	function injectStyles() {
		if ($('#jQuery-beforeAfter-styles').length) return;

		var css = `
			.before-after-container {
				position: relative;
				overflow: hidden;
				-webkit-user-select: none; -ms-user-select: none; user-select: none;
			}
			.before-after-container.initialized .before-after-image {
				display: none;
			}
			.before-after-container img {
				display: block;
				width: 100%;
				height: auto;
			}
			.before-wrapper {
				position: relative;
				width: 100%;
				height: 100%;
			}
			.after-wrapper {
				position: absolute;
				height: 100%;
				top: 0;
				right: 0;
				overflow: hidden;
			}
			.after-wrapper img {
			    position: absolute;
    			top: 0;
    			right: 0;
				z-index: 1;
				height: 100%;
				width: auto;
				max-width: none; /* Important for resizing */
			}
			.separator {
				position: absolute;
				width: 4px;
				height: 100%;
				top: 0;
				background-color: #ffffff;
				cursor: e-resize;
				transform: translateX(50%); /* Center the line on the cursor */
				z-index: 10;
			}
			.separator-bullet {
				position: absolute;
				width: 40px;
				height: 40px;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				border-radius: 50%;
				background-color: #ffffff;
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				box-shadow: 0 0 10px rgba(0,0,0,0.2);
			}
			.arrow {
				border-style: solid;
				border-width: 0 3px 3px 0;
				display: inline-block;
				padding: 4px;
			}
			.left-arrow {
				transform: rotate(135deg);
				-webkit-transform: rotate(135deg);
			}
			.right-arrow {
				transform: rotate(-45deg);
				-webkit-transform: rotate(-45deg);
			}
		`;

		$('<style>', { id: 'jQuery-beforeAfter-styles', type: 'text/css' })
			.html(css)
			.appendTo('head');
	}

	var methods = {
		init: function(options) {
			// Inject styles once
			injectStyles();

			return this.each(function() {
				var that = $(this);
				if (that.data('beforeAfter')) return; // Already initialized

				var settings = $.extend({
					movable: true,
					clickMove: true,
					position: 50,
					opacity: 0.7,
					activeOpacity: 1,
					hoverOpacity: 0.9,
					separatorColor: '#ffffff',
					bulletColor: '#ffffff',
					arrowColor: '#333333',
					onMoveStart: function() {},
					onMoving: function() {},
					onMoveEnd: function() {}
				}, options);

				if (that.children().length !== 2) {
					console.warn("BeforeAfter plugin requires exactly two child elements.");
					return;
				}
				
				var originalChildren = that.children().addClass('before-after-image');

				// --- Setup DOM ---
				var firstImg = originalChildren.eq(0).clone().removeClass('before-after-image');
				var secondImg = originalChildren.eq(1).clone().removeClass('before-after-image');

				that.addClass('before-after-container initialized');

				var beforeWrapper = $('<div>', { 'class': 'before-wrapper' }).append(firstImg);
				var afterWrapper = $('<div>', { 'class': 'after-wrapper' });
				var afterImgClone = secondImg.clone().appendTo(afterWrapper);
				var separator = $('<div>', { 'class': 'separator' });
				var bullet = $('<div>', { 'class': 'separator-bullet' });
				var leftArrow = $('<i>', { 'class': 'arrow left-arrow' });
				var rightArrow = $('<i>', { 'class': 'arrow right-arrow' });

				bullet.append(leftArrow, rightArrow);
				separator.append(bullet);
				that.append(beforeWrapper, afterWrapper, separator);

				// --- Store data and elements ---
				that.data('beforeAfter', {
					settings: settings,
					elements: {
						separator: separator,
						afterWrapper: afterWrapper,
						firstImg: firstImg,
						afterImgClone: afterImgClone
					}
				});
				
				methods.set.call(that, 'position', settings.position);
				methods.set.call(that, 'opacity', settings.opacity);
				methods.set.call(that, 'separatorColor', settings.separatorColor);
				methods.set.call(that, 'bulletColor', settings.bulletColor);
				methods.set.call(that, 'arrowColor', settings.arrowColor);

				// --- Event Handlers ---
				var isDragging = false;
				var moveSlider = function(posX) {
					var containerOffset = that.offset().left;
					var containerWidth = that.width();
					var position = ((containerOffset + containerWidth) - posX);
					var percentage = Math.max(0, Math.min(100, (position / containerWidth) * 100));
					methods.set.call(that, 'position', percentage);
					if (isDragging) settings.onMoving.call(that);
				};
				
				var onResize = function() {
					var beforeImgHeight = firstImg.height();
					var beforeImgWidth = firstImg.width();
					that.height(beforeImgHeight);
					afterImgClone.css({ height: beforeImgHeight, width: beforeImgWidth });
				};
				
				$(window).on('resize.ba', onResize);
				setTimeout(onResize, 50);

				if (settings.movable) {
					separator.on('mousedown.ba touchstart.ba', function(e) {
						e.preventDefault();
						isDragging = true;
						separator.css('opacity', settings.activeOpacity);
						settings.onMoveStart.call(that);

						$(document).on('mousemove.ba touchmove.ba', function(e) {
							if (!isDragging) return;
							var pageX = (e.pageX !== undefined) ? e.pageX : e.originalEvent.touches[0].pageX;
							moveSlider(pageX);
						});

						$(document).on('mouseup.ba touchend.ba touchcancel.ba', function() {
							if (!isDragging) return;
							isDragging = false;
							separator.css('opacity', that.is(':hover') ? settings.hoverOpacity : settings.opacity);
							settings.onMoveEnd.call(that);
							$(document).off('.ba');
						});
					});

					that.on('mouseenter.ba', function() { if (!isDragging) separator.css('opacity', settings.hoverOpacity); })
						.on('mouseleave.ba', function() { if (!isDragging) separator.css('opacity', settings.opacity); });

					if (settings.clickMove) {
						that.on('click.ba', function(e) {
							if ($(e.target).is(separator) || $(e.target).closest(separator).length) return;
							moveSlider(e.pageX);
						});
					}
				}
			});
		},
		destroy: function() {
			return this.each(function() {
				var that = $(this);
				var data = that.data('beforeAfter');
				if (!data) return;

				// Remove plugin-added elements and classes
				that.css('height', '');
				that.removeClass('before-after-container initialized');
				that.find('.before-wrapper, .after-wrapper, .separator').remove();
				that.children('.before-after-image').removeClass('before-after-image').show();
				
				// Unbind all namespaced events
				that.off('.ba');
				$(window).off('.ba');
				$(document).off('.ba');

				// Remove stored data
				that.removeData('beforeAfter');
			});
		},
		get: function(key) {
			var data = this.first().data('beforeAfter');
			if (data && data.settings.hasOwnProperty(key)) {
				return data.settings[key];
			}
			return undefined;
		},
		set: function(key, value) {
			return this.each(function() {
				var that = $(this);
				var data = that.data('beforeAfter');
				if (!data) return;

				data.settings[key] = value;
				var elements = data.elements;

				switch (key) {
					case 'position':
						elements.afterWrapper.css('width', value + '%');
						elements.separator.css('right', value + '%');
						break;
					case 'opacity':
						elements.separator.css('opacity', value);
						break;
					case 'separatorColor':
						elements.separator.css('background-color', value);
						break;
					case 'bulletColor':
						elements.separator.find('.separator-bullet').css('background-color', value);
						break;
					case 'arrowColor':
						elements.separator.find('.arrow').css('border-color', value);
						break;
				}
			});
		}
	};

	$.fn.beforeAfter = function(methodOrOptions) {
		if (methods[methodOrOptions]) {
			return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + methodOrOptions + ' does not exist on jQuery.beforeAfter');
		}
	};

}(window.jQuery || jQuery));