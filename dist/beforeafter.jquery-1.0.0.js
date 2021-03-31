/*!
 * Before After Viewer - JavaScript plugin for Before After Viewer
 *
 * Copyright (c) 2021 MAMEDUL ISLAM
 *
 * Licensed under the MIT license:
 *   https://opensource.org/licenses/MIT
 *
 * Project home:
 *   https://mamedul.gitlab.io/dev-projects/jquery-before-after-slider
 *
 * Version: 1.0.0
 */
(function($) {

    "use strict";

    jQuery.fn.beforeAfter = function(options) {

        // Plugin Settings
        var settings = jQuery.extend({
            movable: true,
            clickMove: true,
            alwaysShow: true,
            position: 50,
            opacity: 0.4,
            activeOpacity: 1,
            hoverOpacity: 0.8,
            separatorColor: '#ffffff',
            bulletColor: '#ffffff',
            arrowColor: '#333333',
        }, options);

        function beforeAfter(that) {

            if (jQuery(that).children().length == 2) {

                var firstImg = $(that).children()[0];
                var secondImg = $(that).children()[1];

                var baPosition = $(that).css('position'),
                    baZIndex = $(that).css('z-index'),
                    baOverflow = $(that).css('overflow');

                var fPosition = $(firstImg).css('position'),
                    fTop = $(firstImg).css('top'),
                    fLeft = $(firstImg).css('left'),
                    fWidth = $(firstImg).css('width'),
                    fHeight = $(firstImg).css('height'),
                    fZIndex = $(firstImg).css('z-Index'),
                    fFloat = $(firstImg).css('float');

                var sPosition = $(secondImg).css('position'),
                    sTop = $(secondImg).css('top'),
                    sLeft = $(secondImg).css('left'),
                    sWidth = $(secondImg).css('width'),
                    sHeight = $(secondImg).css('height'),
                    sZIndex = $(secondImg).css('z-Index');

                var freserved_style = "position:" + fPosition + ";top:" + fTop + ";left:" + fLeft + ";width:" + fWidth + ";height:" + fHeight + ";z-index:" + fZIndex + ";float:" + fFloat;
                var sreserved_style = "position:" + sPosition + ";top:" + sTop + ";left:" + sLeft + ";width:" + sWidth + ";height:" + sHeight + ";z-index:" + sZIndex;

                jQuery(that).attr('data-bareservedstyle', "position:" + baPosition + ";overflow:" + baOverflow);
                jQuery(firstImg).attr('data-bareservedstyle', freserved_style);
                jQuery(secondImg).attr('data-bareservedstyle', sreserved_style);

                var fZIndexInt = isNaN(parseInt(fZIndex)) ? 0 : parseInt(fZIndex);

                var slctNone = "-webkit-user-select:none;-ms-user-select:none;user-select:none;";

                jQuery(that).css({
                    'position': 'relative',
                    'overflow': 'hidden',
                });

                jQuery(firstImg).css({
                    'position': 'relative',
                    'top': '0',
                    'left': '0',
                    'width': '100%',
                    //'height': 'auto',
                    //'float': 'left',
                });

                jQuery(secondImg).css({
                    'position': 'absolute',
                    'top': '0',
                    'right': '0',
                    'width': 'auto',
                    'height': '100%',
                    'z-index': fZIndexInt + 1,
                });

                //Create DIV and append
                var div1 = document.createElement("DIV");
                div1.setAttribute('style', 'position:relative !important;width:100% !important;height:100%  !important;' + slctNone);
                jQuery(firstImg).clone({
                    withDataAndEvents: true
                }).appendTo(div1);

                var div2 = document.createElement("DIV");
                div2.setAttribute('style', 'position:absolute !important;width:' + settings.position + '% !important;height:100% !important;top:0px !important;right:0px !important;overflow:hidden !important;' + slctNone);
                jQuery(secondImg).clone({
                    withDataAndEvents: true
                }).appendTo(div2);

                var left_arrow = document.createElement("I");
                left_arrow.setAttribute('style', 'border:solid black;border-width:0 2px 2px 0;display:inline-block;padding:3px;transform:rotate(135deg);-webkit-transform:rotate(135deg);');

                var right_arrow = document.createElement("I");
                right_arrow.setAttribute('style', 'border:solid black;border-width:2px 0 0 2px;display:inline-block;padding:3px;transform:rotate(135deg);-webkit-transform:rotate(135deg);');

                var separator_bullet = document.createElement("DIV");
                separator_bullet.setAttribute('style', 'position:absolute;width:32px;height:32px;line-height:30px;padding:4xp;text-align:center;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:50%;background-color:#fff;');

                var separator_content = document.createElement("DIV");
                separator_content.setAttribute('style', 'position:relative;width:100%;height:100%;');

                var separator = document.createElement("DIV");
                separator.setAttribute('style', 'position:absolute !important;width:2px !important;height:100% !important;top:0px !important;right:' + settings.position + '% !important;overflow:visible !important;transform:translateX(50%) !important;background-color: #fff;cursor:e-resize;opacity:' + settings.opacity + ';z-index:' + fZIndexInt + 2 + ";" + slctNone);

                jQuery(left_arrow).css('border-color', settings.arrowColor);
                jQuery(right_arrow).css('border-color', settings.arrowColor);
                jQuery(separator_bullet).css('background-color', settings.bulletColor);
                jQuery(separator).css('background-color', settings.separatorColor);

                separator_bullet.append(left_arrow);
                separator_bullet.append(right_arrow);
                separator_content.append(separator_bullet);
                separator.append(separator_content);

                that.append(div1);
                that.append(div2);
                that.append(separator);

                jQuery(firstImg).remove();
                jQuery(secondImg).remove();


                //On resize fit the div2
                var resize = function() {
                    if (jQuery(div1).children().width() > 0) jQuery(div2).children().width(jQuery(div1).children().width());
                    if (jQuery(div1).children().height() > 0) jQuery(div2).children().height(jQuery(div1).children().height());
                }

                jQuery(window).on('resize', resize);

                // If movable
                if (settings.movable) {

                    var moveEnded = false;

                    // If onclick movable
                    if (settings.clickMove) {

                        jQuery(div1).on('click', function() {
                            if (typeof settings.onMoveStart != "undefined") {
                                settings.onMoveStart();
                            }
                            var oWidth = jQuery(that).width();
                            var oRight = jQuery(separator).css('right');
                            var oRightAdd = parseInt(oRight) + Math.min((oWidth * 0.05), 5);
                            var oPercentage = ((oRightAdd / oWidth) * 100).toFixed(2);
                            var correctRight = oPercentage > 100 ? 100 : (oPercentage < 0 ? 0 : oPercentage);
                            correctRight = correctRight + "%";
                            jQuery(div2).width(correctRight);
                            jQuery(separator).css('right', correctRight);
                            if (typeof settings.onMoving != "undefined" && oRight != jQuery(separator).css('right')) {
                                settings.onMoving();
                            }
                            if (typeof settings.onMoveEnd != "undefined") {
                                settings.onMoveEnd();
                            }
                        });

                        jQuery(div2).on('click', function() {
                            if (typeof settings.onMoveStart != "undefined") {
                                settings.onMoveStart();
                            }
                            var oWidth = jQuery(that).width();
                            var oRight = jQuery(separator).css('right');
                            var oRightAdd = parseInt(oRight) - Math.min((oWidth * 0.05), 5);
                            var oPercentage = ((oRightAdd / oWidth) * 100).toFixed(2);
                            var correctRight = oPercentage > 100 ? 100 : (oPercentage < 0 ? 0 : oPercentage);
                            correctRight = correctRight + "%";
                            jQuery(div2).width(correctRight);
                            jQuery(separator).css('right', correctRight);
                            if (typeof settings.onMoving != "undefined" && oRight != jQuery(separator).css('right')) {
                                settings.onMoving();
                            }
                            if (typeof settings.onMoveEnd != "undefined") {
                                settings.onMoveEnd();
                            }
                        });
                    }

                    jQuery(that).on('mouseenter', function() {
                        jQuery(separator).css('opacity', settings.hoverOpacity);
                    });

                    jQuery(that).on('mouseleave', function() {
                        jQuery(separator).css('opacity', settings.opacity);
                    });

                    var mouseMove = function(e) {

                        var oPageX = e.pageX || e.touches[0].clientX;
                        var oLeft = jQuery(that).offset().left;
                        //var oWidth = that.outerWidth();
                        var oWidth = jQuery(that).width();
                        var oRight = jQuery(separator).css('right');
                        var oPos = (oLeft + oWidth) - oPageX;
                        var oPercentage = ((oPos / oWidth) * 100).toFixed(2);
                        var correctRight = oPercentage > 100 ? 100 : (oPercentage < 0 ? 0 : oPercentage);
                        correctRight = correctRight + "%";
                        jQuery(div2).width(correctRight);
                        jQuery(separator).css('right', correctRight);

                        if (typeof settings.onMoving != "undefined" && oRight != jQuery(separator).css('right')) {
                            settings.onMoving();
                        }

                    }


                    var mouseOut = function(e) {

                        moveEnded = true;

                        jQuery(separator).css('opacity', settings.opacity);

                        if (typeof settings.onMoveEnd != "undefined") {
                            settings.onMoveEnd();
                        }

                    }

                    //Mouse event
                    jQuery(separator).on('mousedown', function(e) {

                        moveEnded = false;

                        jQuery(separator).css('opacity', settings.activeOpacity);

                        if (typeof settings.onMoveStart != "undefined") {
                            settings.onMoveStart();
                        }

                        jQuery(document).on('mousemove', mouseMove);

                        jQuery(document).on('mouseup', function(e) {
                            jQuery(document).off('mousemove', mouseMove);
                            if (!moveEnded) mouseOut(e);
                        });

                        jQuery(window).on('mouseup', function(e) {
                            jQuery(document).off('mousemove', mouseMove);
                            if (!moveEnded) mouseOut(e);
                        });

                    });

                    //Touch event
                    jQuery(separator).on('touchstart', function(e) {

                        moveEnded = false;

                        if (typeof settings.onMoveStart != "undefined") {
                            settings.onMoveStart();
                        }

                        jQuery(separator).css('opacity', settings.activeOpacity);

                        jQuery(document).on('touchmove', mouseMove);

                        jQuery(document).on('touchcancel', function(e) {
                            jQuery(document).off('touchmove', mouseMove);
                            if (!moveEnded) mouseOut(e);
                        });

                        jQuery(window).on('touchcancel', function(e) {
                            jQuery(document).off('touchmove', mouseMove);
                            if (!moveEnded) mouseOut(e);
                        });

                        jQuery(document).on('touchend', function(e) {
                            jQuery(document).off('touchmove', mouseMove);
                            if (!moveEnded) mouseOut(e);
                        });

                    });

                }

                resize();

            } else {

                console.log("%cWarning: %s", 'color:#e4672e;font-size:200%;', 'BeforeAfter plugin need absolutely two childrens.');

            }

        }

        return this.each(function() {
            beforeAfter(this);
        });

    };

}(jQuery));
