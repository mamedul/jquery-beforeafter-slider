# jQuery Before & After Viewer

[![Version](https://img.shields.io/badge/Version-2.0.0-blue.svg)](https://github.com/mamedul/jquery-beforeafter-slider/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mamedul/jquery-beforeafter-slider/blob/main/LICENSE) &nbsp;&nbsp; [![GitHub stars](https://img.shields.io/github/stars/mamedul/jquery-beforeafter-slider?style=social)](https://github.com/mamedul/jquery-beforeafter-slider/stargazers) &nbsp;&nbsp; [![GitHub forks](https://img.shields.io/github/forks/mamedul/jquery-beforeafter-slider?style=social)](https://github.com/mamedul/jquery-beforeafter-slider/network/members) &nbsp;&nbsp; [![GitHub watchers](https://img.shields.io/github/watchers/mamedul/jquery-beforeafter-slider?style=social)](https://github.com/mamedul/jquery-beforeafter-slider/watchers) &nbsp;&nbsp; [![GitHub followers](https://img.shields.io/github/followers/mamedul?style=social)](https://github.com/mamedul?tab=followers)
[![Hire Me](https://img.shields.io/badge/Hire%20Me-Available-brightgreen.svg)](http://mamedul.github.io/)

A responsive, touch-enabled, and highly customizable jQuery plugin to compare two images with a slider. Perfect for showcasing before and after transformations, photo retouching, or any visual comparison.

---

### Live Demo

[![Demo 1](https://img.shields.io/badge/Demo-1-brightgreen.svg)](https://mamedul.github.io/jquery-beforeafter-slider/sample/example4.html) &nbsp; &nbsp; 
[![Demo 2](https://img.shields.io/badge/Demo-2-brightgreen.svg)](https://mamedul.github.io/jquery-beforeafter-slider/sample/example2.html) &nbsp; &nbsp; 
[![Demo 3](https://img.shields.io/badge/Demo-3-brightgreen.svg)](https://mamedul.github.io/jquery-beforeafter-slider/sample/example3.html) &nbsp; &nbsp; 
[![Demo 4](https://img.shields.io/badge/Demo-4-brightgreen.svg)](https://mamedul.github.io/jquery-beforeafter-slider/sample/example4.html)

[![jQuery Before & After Viewer Demo](https://mamedul.github.io/jquery-beforeafter-slider/screencapture-jquery-beforeafter-slider.png)](https://mamedul.github.io/jquery-beforeafter-slider/)

## ✨ Features

* **Fully Responsive**: Adapts to any container size.
* **Touch & Mobile Friendly**: Works smoothly on iOS, Android, and other mobile devices.
* **Highly Customizable**: Easily change colors, positions, and opacities.
* **Callback Functions**: Execute your own code on slider events (`onMoveStart`, `onMoving`, `onMoveEnd`).
* **Public API Methods**: Control the plugin programmatically with `get`, `set`, and `destroy` methods.
* **Lightweight & Easy to Use**: Simple setup with minimal dependencies (just jQuery).
* **CSS Class-based Styling**: All styles are injected into the `<head>`, keeping your HTML clean.

## 🚀 Installation & Usage

Getting started is simple. Just follow these steps:

### 1. Include Files

First, make sure you have jQuery included in your project. Then, include the plugin's JavaScript file.

```html
<!-- 1. Include jQuery -->
<script src="[https://code.jquery.com/jquery-3.7.1.min.js](https://code.jquery.com/jquery-3.7.1.min.js)"></script>

<!-- 2. Include the Before After Viewer plugin -->
<script src="path/to/jquery.before-after.js"></script>
```

### 2. HTML Structure

Create a container `div` with exactly two `img` tags inside it. The first image will be the "before" image, and the second will be the "after" image.

```html
<div id="my-viewer">
    <img src="path/to/before-image.jpg" alt="Before">
    <img src="path/to/after-image.jpg" alt="After">
</div>
```

### 3. Initialize the Plugin

Call the `.beforeAfter()` function on your container element.

```javascript
$(document).ready(function() {
    $('#my-viewer').beforeAfter();
});
```

## ⚙️ Configuration Options

You can customize the plugin by passing an options object during initialization.

```javascript
$('#my-viewer').beforeAfter({
    position: 75,
    separatorColor: '#ff0000',
    arrowColor: '#ffffff'
});
```

Here is a list of all available options:

| Option           | Type       | Default        | Description                                                 |
| ---------------- | ---------- | ---------------| ----------------------------------------------------------- |
| `movable`        | `boolean`  | `true`      	 | If `false`, the slider cannot be moved.                     |
| `clickMove`      | `boolean`  | `true`      	 | Allows moving the slider by clicking on the images.         |
| `position`       | `number`   | `50`        	 | The initial position of the slider in percentage (0-100).   |
| `opacity`        | `number`   | `0.7`       	 | The default opacity of the separator (0-1).                 |
| `activeOpacity`  | `number`   | `1`         	 | The opacity of the separator when being dragged.            |
| `hoverOpacity`   | `number`   | `0.9`       	 | The opacity of the separator on hover.                      |
| `separatorColor` | `string`   | `'#ffffff'`  | The color of the separator line (CSS color value).          |
| `bulletColor`    | `string`   | `'#ffffff'`  | The background color of the circular handle.                |
| `arrowColor`     | `string`   | `'#333333'`  | The color of the arrows inside the handle.                  |
| `onMoveStart`    | `function` | `function(){}` | Callback function executed when the user starts dragging.   |
| `onMoving`       | `function` | `function(){}` | Callback function executed continuously while dragging.     |
| `onMoveEnd`      | `function` | `function(){}` | Callback function executed when the user stops dragging.    |

## 🛠️ Public Methods (API)

You can interact with an initialized slider using public methods.

### Get a Value

Retrieve the current value of any setting.

```javascript
// Initialize the plugin and store the instance
var mySlider = $('#my-viewer').beforeAfter();

// Get the current opacity
var currentOpacity = mySlider.beforeAfter('get', 'opacity');
console.log(currentOpacity); // Outputs: 0.7
```

### Set a Value

Programmatically change a setting after initialization.

```javascript
// Set the position to 25%
mySlider.beforeAfter('set', 'position', 25);

// Change the separator color to blue
mySlider.beforeAfter('set', 'separatorColor', 'blue');
```

### Destroy the Plugin

Revert the container back to its original state (the two images). This is useful for single-page applications or dynamic content.

```javascript
mySlider.beforeAfter('destroy');
```

## 🌐 Browser Support

* Chrome (latest)
* Firefox (latest)
* Safari (latest)
* Edge (latest)
* iOS & Android browsers

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](https://opensource.org/licenses/MIT) file for details.

## 👨‍💻 Author & Hire Me

This plugin was created and is maintained by [**Mamedul Islam**](https://mamedul.github.io/).


I am a passionate **web developer** with experience in creating interactive and user-friendly web components. I am currently *available for freelance projects* or full-time opportunities.

I help businesses grow their online presence with custom web solutions. Specializing in **WordPress**, **WooCommerce**, and **Shopify**, I build modern, responsive, and high-performance websites.

* **WhatsApp**: [message me](https://wa.me/8801847406830?text=Hi%2C%20I%27d%20like%20to%20hire%20you.)
* **Portfolio**: [mamedul.github.io](https://mamedul.github.io/)
* **GitHub**: [@mamedul](https://github.com/mamedul)
* **LinkedIn**: [Connect with me!](https://www.linkedin.com/in/mamedul/)
* **Twitter (X)**: [@mamedul](https://www.x.com/mamedul/)

[![Hire Me](https://img.shields.io/badge/Hire%20Me-Available-brightgreen.svg)](https://mamedul.github.io/)

---

### ⭐ Show Your Support

If you find this extension useful, please consider giving it a star on GitHub! Your support helps motivate further development and improvements.

[![GitHub stars](https://img.shields.io/github/stars/mamedul/jquery-beforeafter-slider?style=for-the-badge)](https://github.com/mamedul/jquery-beforeafter-slider/stargazers) &nbsp;

If you found this project helpful, give it a ⭐ on GitHub!
