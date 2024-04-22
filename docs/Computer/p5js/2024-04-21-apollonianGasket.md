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
z_4 = \frac{k_1z_1 + k_2z_2 + k_3z_3 \pm 2 \sqrt{k_1k_2z_1z_2 + k_1k_3z_1z_3 + k_2k_3z_2z_3}}{k_4}
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
