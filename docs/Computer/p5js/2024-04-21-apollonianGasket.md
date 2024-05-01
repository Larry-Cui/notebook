---
layout: post
title: Apollonian Gasket
date: 2024-04-21
categories: Eng
tags:
  - p5js
  - Math
---

This post is inspired by [Daniel Shiffman's episode](https://youtu.be/6UlGLB_jiCs){:target="\_blank"} of the same topic on youtube.

<br>

<img src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Apollonian_gasket.svg" style="width: 50%">

## Math Explanation

The above picture portraits a fractal pattern called [Apollonian gasket](https://en.wikipedia.org/wiki/Apollonian_gasket){:target="\_blank"}, whish is named after Greek mathematician Apollonius of Perga.

The construction of the Apollonian gasket starts with three circles $C_1, C_2$ and $C_3$, that are each tangent to the other two, but that do not have a single point of triple tangency. As Apollonius discovered, there exist two more circles $C_4$ and $C_5$ that are tangent to all three of the original circles: these are called Apollonian circles.

<img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Descartes_Circles.svg" style="width: 50%">

The size of each new circle is determined by [Descartes' theorem](https://en.wikipedia.org/wiki/Descartes%27_theorem){:target="\_blank"}, which states that, for any **four** mutually tangent circles, the radii of the circles obeys the equation:

$$\left( \frac{1}{r_1} + \frac{1}{r_2} + \frac{1}{r_3} + \frac{1}{r_4} \right)^2 = 2 \left( \frac{1}{r_1^2} + \frac{1}{r_2^2} + \frac{1}{r_3^2} + \frac{1}{r_4^2}\right)$$

### Descartes' theorem

A more popular statement of this theorem is in terms of the circle's curvature, $k$, which is the reciprocal of the radius, $\displaystyle \frac{1}{r}$.

\begin{equation}
k_1^2 + k_2^2 + k_3^2 + k_4^2 = \frac{1}{2} \left(k_1 + k_2 + k_3 + k_4 \right)^2 \tag{1}
\end{equation}

Curvature $k$ could be zero, where the circle degenerates into a straight line (the radius is approaching infinite). It could also be negative, which means the circle concaves toward another circle with a positive $k$.

### Finding Radius of the 4th Circle

If we have curvature $k_i$ for any three mutually tangent circles, we can immediately find $k_4$ by solving roots for equation 1:

\begin{equation}
k_4 = k_1 + k_2 + k_3 \pm 2\sqrt{k_1k_2 + k_1k_3 + k_2k_3} \tag{2}
\end{equation}

As we can tell from the sketch as well as from the above formula, there are two circles mutually tangent to the first three.

### Proof of Descartes' theorem

One of the many proofs of Descartes' theorem is based on this connection to triangle geometry and on [Heron's formula](https://en.wikipedia.org/wiki/Heron%27s_formula){:target="\_blank"} for the area of a triangle as a function of its side lengths. For detailed proof steps, please check out [here](https://en.wikipedia.org/wiki/Descartes%27_theorem){:target="\_blank"}.

### Complex Descartes' theorem

Finding $k_4$ is not good enough. We also need location, or the position of the circle center, to draw the fourth tangent circle.

It turns out that if we represent the circles' center as a complex number $z$, where $z=x+yi$, then we have a very similar equation as the Descartes' theorem:

\begin{equation}
k_1^2z_1^2 + k_2^2z_2^2 + k_3^2z_3^2 + k_4^2z_4^2 = \frac{1}{2} \left(k_1z_1 + k_2z_2 + k_3z_3 + k_4z_4 \right)^2 \tag{3}
\end{equation}

### Finding Coordinates of the Center of the 4th Circle

\begin{equation}
z_4 = \frac{k_1z_1 + k_2z_2 + k_3z_3 \pm 2 \sqrt{k_1k_2z_1z_2 + k_1k_3z_1z_3 + k_2k_3z_2z_3}}{k_4} \tag{4}
\end{equation}

Same as curvature, we have two options for the center of the fourth circle.

{==

We need to understand the complex number operations[^1] to apply the above formula.

==}

[^1]: **Complex Number Operation**

    The operation of complex number is a little bit different from that of real number. We need to deal with real part and imaginary part separately. It's easy to understand plus, minus, scaling and product, but a bit tricky with square root.

    We can simplify calculation of square root by converting **Cartesian coordinates** $(x,y)$ to **Polar coordinates** $(r, \theta)$.

    For $z=x+yi$, represented in Polar coordinates as:

    $$r=\sqrt{x^2 +y^2}, \qquad \theta = \tan^{-1}{\frac{y}{x}}$$

    We use [De Moivre's formula](https://en.wikipedia.org/wiki/De_Moivre%27s_formula){:target="\_blank"} to find the square roots of a complex number $r(\cos{\theta} + \sin{\theta}i)$:

    \begin{align*}
    \sqrt{r(\cos{\theta} + \sin{\theta}i)}
    &= \sqrt{r}\left(\cos{\frac{\theta}{2}} + i\sin{\frac{\theta}{2}}\right)
    \end{align*}

### Proof of Complex Descartes' theorem

["Beyond the Descartes Circle Theorem"](https://arxiv.org/pdf/math/0101066.pdf){:target="\_blank"} may provide a proof to this Complex theorem, or at least point to the right direction of the proof, though I've been having a hard time to follow its reasoning. I feel reassured when I came across [a post by a math professor](https://mathlesstraveled.com/2016/06/10/apollonian-gaskets-and-descartes-theorem-ii/){:target="\_blank"} who admitted he couldn't understand the proof either.

## Coding Knacks

### Operations can be applied continuously

We not only need a vector-like function to annotate complex number, but want the function to handle calculation operations on the complex numbers continuously, like `complexA.add(complexB).sub(complexC)`.

For this purpose, we need the operation return a new complex number every time it runs an operation. Here is the code snippets:

```js
class Complex {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(c2) {
		const a = this.x + c2.x;
		const b = this.y + c2.y;
		return new Complex(a, b);
	}

	minus(c2) {
		const a = this.x - c2.x;
		const b = this.y - c2.y;
		return new Complex(a, b);
	}

	scale(value) {
		const a = this.x * value;
		const b = this.y * value;
		return new Complex(a, b);
	}

	mult(c2) {
		const a = this.x * c2.x - this.y * c2.y;
		const b = this.x * c2.y + this.y * c2.x;
		return new Complex(a, b);
	}
}
```

### Difference between `Math.atan()` and `Math.atan2()`

We already know how to find the square root of a complex number from math perspective. But when it comes to coding, it will be very wrong if we use `Math.atan()`, because the result this method returns is quite different from what you will expect.

In most cases, we need to use method `Math.atan2()`. Please refer to [this article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2){:target="\_blank"} for the connection and difference of these two methods.

Now we can write the last operation `sqrt` for the complex number class:

```js
sqrt() {
  const r = Math.sqrt(this.x * this.x + this.y * this.y);

  // Math.atan2(y,x) is key to correct result
  const theta = Math.atan2(this.y, this.x);

  const a = Math.sqrt(r) * Math.cos(theta / 2);
  const b = Math.sqrt(r) * Math.sin(theta / 2);

  return new Complex(a, b);
}
```

### Hash table for redundancy check

The idea for coding an Apollonian gasket is quite simple and straight forward: we use the formulas to calculate the curvature and center position of each circle, push it to an circles array, and draw them one by one on the canvas.

There's one catch however.

As we will iterate all combinations of existing circles, there must be some duplicates, and if we push all calculated circles to the array, the calculation will go on infinitely and the array is doomed to overflow in the end.

To check for duplicity, the easiest way is to iterate every value in the array, but this method is costly in terms of time complexity ($n$). A better approach is use a hash table.

I mapped every circle in the array to a hash table, which is essentially another array, but with a length of the width of the maximum diameter of the circles. I used the x component of circle center as the array index (from how way the circles are created, the spread of x component is exactly same as the maximum diameter) and put the corresponding circle to that position in the hash table array. If two circles have the same x component of the center, they are saved as a sub-array under that index. In the end, we created a 2D hash table array.

Here's the code snippets for hash table.

```js
// create a hash table
let hashTable = new Array(canvasWidth);
for (let i = 0; i < hashTable.length; i++) {
	hashTable[i] = new Array();
}

// map value to hash table
function mappingToHashTable(circle) {
	const circleIndex = Math.floor(circle.center.x + canvasWidth / 2);
	hashTable[circleIndex].push(circle);
}

// check redundancy
function isDuplicated(circle) {
	const circleIndex = Math.floor(circle.center.x + canvasWidth / 2);

	// if the calculated circle is out of bound
	// regarded as redundancy
	if (circleIndex < 0 || circleIndex > canvasWidth - 1) return true;

	// if x-bucket in hastTable is empty, no redundancy
	if (hashTable[circleIndex].length == 0) return false;

	// if x-bucket is not empty, iterate to check redundancy
	for (let i = 0; i < hashTable[circleIndex].length; i++) {
		const yDiff = Math.abs(
			circle.center.y - hashTable[circleIndex][i].center.y
		);
		if (yDiff < epsilon) return true;
	}

	// when the program runs down to this point
	// we are sure it isn't redundant
	return false;
}
```

The time complexity for hash table check is still $n$ in worst scenario, but on average it's just $1$.

Here is the [full length code](https://drive.google.com/file/d/1tes6N1QT8YMBIgfpU5XPwsmppEs1pVqV/view?usp=sharing){:target="\_blank"} of this project.
