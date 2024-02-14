---
layout: post
title: Basics of Matter.js
date: 2023-07-09
categories: Eng
tags:
  - p5js
---

# What is Matter.js

[Matter.js](https://brm.io/matter-js/){:target="\_blank"} is a Javascript library, just like [p5.js](https://p5js.org/){:target="\_blank"}. While `p5.js` focuses on the drawings for web pages, `Matter.js` is a 2D physics engine, and works well with `p5.js`.

To use `p5.js` and `Matter.js` on your web pages, you simply add the following script to your `html` file's `<head>` part.

```html
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"
	integrity="sha512-3RlxD1bW34eFKPwj9gUXEWtdSMC59QqIqHnD8O/NoTwSJhgxRizdcFVQhUMFyTp5RwLTDL0Lbcqtl8b7bFAzog=="
	crossorigin="anonymous"
	referrerpolicy="no-referrer"
></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/addons/p5.sound.min.js"
	integrity="sha512-WzkwpdWEMAY/W8WvP9KS2/VI6zkgejR4/KTxTl4qHx0utqeyVE0JY+S1DlMuxDChC7x0oXtk/ESji6a0lP/Tdg=="
	crossorigin="anonymous"
	referrerpolicy="no-referrer"
></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"
	integrity="sha512-0z8URjGET6GWnS1xcgiLBZBzoaS8BNlKayfZyQNKz4IRp+s7CKXx0yz7Eco2+TcwoeMBa5KMwmTX7Kus7Fa5Uw=="
	crossorigin="anonymous"
	referrerpolicy="no-referrer"
></script>
```

## How does Matter.js work

You don't need `Matter.js` to draw an object falling down due to the gravity. But if there are a lot of objects, especially when they are in irregular shapes, determine the collision will become complicated at an exponential rate, that's why `Matter.js` can come in handy, for it has built in functions, formulas to calculate the positions of all kinds objects in an environment with many influencing factors, such as gravity, collision, friction, bouncing and so on. For this reason, `Matter.js` is called a physical engine for web design.

There are two steps to use this engine: 1) create objects by this engine; and 2) add objects created to the engine world.

## First step first

`Matter.js` comes with a lot of methods, which is the interface between the engine itself and the outside codes. The commonly used methods include:

```js
Matter.Engine;
Matter.Render;
Matter.World;
Matter.Bodies;
Matter.Body;
Matter.Constraint;
Matter.Mouse;
Matter.MouseConstraint;
```

These methods' names look a little bit lengthy, so sometimes people will simplify by attribute them to short words.

```js
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
```

or, we can write them in a more concise way:

```js
const {
	Engine,
	Render,
	World,
	Bodies,
	Body,
	Constraint,
	Mouse,
	MouseConstraint,
} = Matter;
```

## How to create objects in Matter.js

The most common objects we want to create are rectangular, circle, and polygon. Here below are code examples.

```js
box = Bodies.rectangle(300, 400, 120, 120, options);
```

The above code tells computer to create an 120\*120 box at `{x:300, y:400}`.

Two points you should pay attention to:

- in `Matter.js`, the origin of the coordinates of an object is at the center, while in `p5.js` it's at the top left corner.
- `options` can be defined somewhere else, or you can just fill in the curly brackets `{}`. We talk about options in details below.

```js
circle = Bodies.circle(mouseX, mouseY, 20, options);
```

```js
polygon = Bodies.polygon(x, y, sides, radius, options);
```

## Object's options

### isStatic `isStatic: true`

The default value of `isStatic` is false, meaning the object is subject to gravity. If you don't want it move, in case you draw a ground on the canvas, you need to manually set it to true.

### angle `angle: 0`

Value `0` means the object is level. You can set the angle at any value, or you can give the angle an increment every loop to make it rotate clockwise or anti-clockwise.

You will see the options of an object can be given at the creation, but you can also change or set it afterwards.

```js
Body.setAngle(object, angle);
Body.setAngularVelocity(object, angleSpeed);
angle = angle + angleSpeed;
```

If you give an increment to angle every frame, the object will in fact rotate around its center.

A tricky point, or a "bug" if you think it in a different way, is that rotating object doesn't have angular speed automatically. You must set the angular speed manually by `Body.setAngularVelocity(object, angleSpeed)`. The purpose of this code is to let other objects hitting the rotating one pick the speed and being pushed away at the correct speed.

### friction `friction: 0`

You can tell from the name, `0` means no friction at all, while `1` means huge friction.

### restitution `restitution: 0.5`

`restitution` is about the bouncing ability of an object.

## Add to and remove from engine world

If it's your first time to add an object, there's a preliminary step you need to do: create an engine.

```js
const engine = Engine.create(); // create an engine
```

To add objects to an engine world:

```js
World.add(engine.world, [box, circle, polygon]);
```

To remove objects from an engine world:

```js
World.remove(engine.world, [body]);
```

## Constraint

Constraint is a string-like object that connects two other objects together.

### Create constraint

There are two kinds of constraints, one is to connect two objects, the other is to connect an object to a fixed point.

```js
const myConstraint = Constraint.create({
	bodyA: box,
	pointA: { x: 0, y: 0 },
	bodyB: circle,
	pointB: { x: 0, y: 0 },

	length: 20,
	stiffness: 0.01,
	damping: 0.0001,
});
```

The above code means the box (`bodyA`) is connected to the circle (`bodyB`) with a string of length `20`.

`pointA` and `pointB` is the connecting point on the objects. `{ x: 0, y: 0 }` is the center of the object, but you are free to move it to anywhere on the object.

`stiffness` is to determine if the connection is elastic. `damping` is about the slowing down tendency of relative movement.

```js
const myConstraint = Constraint.create({
	pointA: { x: 300, y: 300 },
	bodyB: circle,
	pointB: { x: 0, y: 0 },

	length: 20,
});
```

The above constraint is connecting the circle to a point at `300,300`.

### Add to and remove of constraint

The add of constraint is same as other objects. The example below is adding objects and constraints together, but if other objects have been added before, no need to add again.

```js
World.add(engine.world, [myConstraint, box, circle]);
```

And to remove a constraint:

```js
World.remove(engine.world, myConstraint);
```

### Remove issue raised up from `Angry Bird` project

In the `Angry Bird` project, to release the bird from the slingshot, the code is bit weird.

```js
// "Angry Bird" release code
function mouseReleased() {
	setTimeout(() => {
		// release bodyB from the constraint
		slingshotConstraint.bodyB = null;
		// re-position pointA so the ugly string/slingshot
		// wont's stay in the way
		slingshotConstraint.pointA = { x: 0, y: 0 };
	}, 100);
}
```

The Javascript method `setTimeout(function, time)` is to give the bird a `100` milliseconds to pick up the speed before release it from the constraint.

The weird part is the arrow function: why we don't just remove the constraint (`slingshotConstraint`), but instead set `bodyB` free from the constraint, and re-position `pointA` to a new coordinates?

The answer is due to a "bug" in `Matter.js`. When you remove the constraint from an engine world, the constraint object in fact still stays in the heap of the memory. As a result, it can be retrieved by draw function in the code, and the ugly constraint string will be drawn on the canvas.

## Mouse constraint

Mouse constraint is to set up an interaction relationship between mouse and objects on the canvas. You may want the mouse to interact with only certain objects but not all, which is a topic beyond this post. Please refer to the thread [how to all only a single body to move using matter.js mouse](https://stackoverflow.com/questions/73252974/how-to-allow-only-a-single-body-to-move-using-matter-js-mouse){:target="\_blank"} on stack**overflow**.

### Code example

Here below is the code snippet for mouse interaction.

```js
function setupMouseInteraction() {
	const mouse = Mouse.create(canvas.elt);
	const mouseParams = {
		mouse: mouse,
		constraint: { stiffness: 0.05 },
	};
	mouseConstraint = MouseConstraint.create(engine, mouseParams);
	mouseConstraint.mouse.pixelRatio = pixelDensity();
	World.add(engine.world, mouseConstraint);
}
```

### Comments

- We need to tell `Matter.js` where the mouse is on the canvas. This is realized by `Mouse.create(element)` method. Here we use `canvas.elt` directly, because `canvas` is the default `html` element created by `p5.js`.
- Normal display and Apple's Retina display have different pixel density. We need this line `mouseConstraint.mouse.pixelRatio = pixelDensity()` to tell the code what monitor we are using, in order for the computer to read the correct coordinates of the mouse on the canvas.
