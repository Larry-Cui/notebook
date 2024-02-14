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
