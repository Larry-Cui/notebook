---
layout: post
title: Takeaways of Project EE-CRS
date: 2024-2-13
categories: Eng
tags:
  - Javascript
---

# Takeaways of A Project of EE-CRS Calculation

## Libraries

### Font Awesome

```html
<!-- use font awesome 6 -->
<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
/>
```

### p5.js

```html
<!-- use p5.js library -->
<!-- first one is p5.js -->
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"
	integrity="sha512-uaz5GpnQoE6t5echKlX8P52czvsIGgLPcvlzfvRubLZ1Hp8JemUDnbUiAahbVtPb+jUVrNETuXvAhDDF/N3M4w=="
	crossorigin="anonymous"
	referrerpolicy="no-referrer"
></script>
<!-- second one is p5sound.js -->
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/addons/p5.sound.js"
	integrity="sha512-TU9AWtV5uUZPX8dbBAH8NQF1tSdigPRRT82vllAQ1Ke28puiqLA6ZVKxtUGlgrH6yWFnkKy+sE6luNEGH9ar0A=="
	crossorigin="anonymous"
	referrerpolicy="no-referrer"
></script>
```

### papa parse

```html
<!-- use papa parse library: csv parse -->
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js"
	integrity="sha512-dfX5uYVXzyU8+KHqj8bjo7UkOdg18PaOtpa48djpNbZHwExddghZ+ZmzWT06R5v6NSk3ZUfsH6FNEDepLx9hPQ=="
	crossorigin="anonymous"
	referrerpolicy="no-referrer"
></script>
```

### js-colormpas

```html
<!-- import colormap library: a color mapping library -->
<script src="libraries/js-colormaps.js"></script>
```

## Coding Secrets

### Strict Mode

Always use `"use strict"` at the top of your JavaScript coding.

### Function and Arrow Function

Arrow Function:

```js
const functionName = () => {
	// some coding inside this function...
};
```

- You need to define an arrow function before calling it.
- You can omit `const` before the function name, as the compiler will automatically add it for you, but are strongly advise against omittance.

Normal Function:

```js
function Name() {
	// some coding inside this function...
}
```

You can put normal function anywhere, it always go well with other codings that call it. For this reason, we prefer to normal function.

### Select DOM Element

We are familiar with query select:

```js
// to select single element with className
document.querySelector(".className");

// to select multiple elements with className
document.querySelectorAll(".className");
```

We can select nth child:

```js
// in "P" elements, select the nth one
document.querySelector("p:nth-child(1)");
```

### Select DOM Element from Clicked

We can simply get the clicked target:

```js
Element.addEventListener("click", doSomething);

function doSomething(e) {
	// e.target is the clicked element
}
```

If we want to get the parent of clicked element:

```js
// first select parent element with certain class name
const parentNode = e.target.closest(".parentClassName");

// select the next element to the parent node
const nextNode = parentNode.nextElementSibling;
```

We can also determine if the clicked is the very element we are looking for:

```js
//  we can find element type by the follow method
if (e.target.nodeName == "IMG") {
	// do something...
}
```

### Manipulate Class of Selected Element

The most common method include:

```js
element.classList.remove("className");
element.classList.add("className");
element.classList.contains("className");
```

### How to Use Switch

An example:

```js
switch (variable) {
	case "good":
		// do something...
		break;
	case "neutral":
		// do something...
		break;
	case "bad":
		// do something...
		break;
	default:
		// do something...
		break;
}
```

### Insert or Change html coding of an Element

We use `innerHTML`:

```js
document.querySelector(".className").innerHTML = "some html coding or value";
```

### Convert String to Number to String

Simple and straight-forward way:

```js
numberVar = Number(string);
```

If the string comes with thousandth comma, remove it:

```js
notQuiteLikeString.toString().replace(/,/g, "");
```

When finishing calculation, you want to put comma back:

```js
numberVar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
```

### Loop Methods

For Loop:

```js
for (let i = 0; i < N; i++) {
	// do something...
}
```

For Each of Array:

```js
array.forEach((element) => {
	// do something...
	// here element is each value of array
});
```

### How to Set Data to html element and Obtain it in Javascript

An example:

=== "html"

    ```html
    <p data-age="17">17-</p>
    ```

=== "JavaScript"

    ```js
    ageVariable = e.target.dataset.age;
    ```

### Convert Object to Array

The result we get after papa parse is an object. Sometimes, we need to convert an object to array.

```js
newArray = Object.keys(result.data[0]).map(
	(key)
	=>
	[key, result.data[0][key]]
	);
```

### Papa Parse

For full introduction, go to [Papa Parse homepage](https://www.papaparse.com/){:target="\_blank"}.

The parse of csv files takes time, but the execution of JavaScript code is super fast. As a result, if you want to use the parse result in a function, you need put it after parsing:

```js
// parse a local file
Papa.parse("../../assets/crs-data/distribution.csv", {
	header: true,
	download: true,
	dynamicTyping: true,
	complete: functionToRun,
});

functionToRun () {
	// do something...
}
```

### p5js Instance Mode

In addition to global mode, it's more important to understand p5.js instance mode, as most of the time we need to embed canvas element into DOM.

First of all, we construct a p5js instance function. You can tell that it's exact a typical p5js code inside instance function.

```js
function instanceName(p) {
	p.setup = function () {
		p.createCanvas(500,500);
		p.noLoop();
	};

	p.draw = function () {
		p.background(255);
		//  do something...
	};
```

Now we can create the instance and put it inside an element container:

```js
new p5(scoreDistribution, canvasContainer);
```

The above code works fine but we suggest give the instance a name, like myP5:

```js
const myP5 = new p5(scoreDistribution, canvasContainer);
```

With a name, you can use method of the instance easily, like,

```js
myP3.redraw();
```

### js-colormaps Using

Please refer to [js-colormaps Readme](https://github.com/timothygebhard/js-colormaps){:target="\_blank"} on github for reference.

An example:

```js
// it comes back with a 3-number array in RGB order
const colorArray = evaluate_cmap(0.8, "RdYlGn", true);
```
