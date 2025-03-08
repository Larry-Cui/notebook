---
layout: post
title: Proof of Trigonometry Limit Theorem
date: 2022-10-05
draft: false
categories: Math
tags:
  - Trigonometry
---

# The Limit of $\sin x / x$

The trigonometry theorem $\displaystyle \lim_{x \rightarrow 0} \frac{\sin x}{x}$ is so important that it is sometimes called the fundamental trig limit theorem in calculus.  This post is about the proof of this theorem.

We work with the proof on a unit circle, which has a radius of unit 1.

<img style="max-width: 350px" src="https://lh3.googleusercontent.com/pw/AP1GczMNl8vyFn0RYmaYaNdRicZM6bHF4lL4WEZtocbnM9Q9-ow_5Df12oIGccfk9agk9PiiIooc6zszrKLAsroVqJkWTrqCGch-aOi5zfFytqmP_ixhwKw" />

Notice the area of triangle $\bigtriangleup ABC$ is $\displaystyle \frac{\sin x}{2}$, the area of the slice $ABC$ is $\displaystyle \frac{x}{2}$, and the area of the larger triangle $\bigtriangleup ABD$ is $\displaystyle \frac{\tan x}{2}$.

We have the inequality of the three terms as follows:

$$
\frac{\sin x}{2} < \frac{x}{2} < \frac{\tan x}{2}
$$

If we divide the left two terms by $x/2$, we have

$$
\frac{\sin x}{x} < 1
$$

and if we divide the right two terms by $x /(2 \cos x)$, 

$$
\frac{\sin x}{x} > \cos x
$$

Linking the above two inequalities together:

$$
\cos x < \frac{\sin x}{x} < 1
$$

as $\lim_{x \rightarrow 0} \cos x = 1$, applying the squeeze theorem, we prove this famous theorem:


!!! note "Fundamental Sine Limit Theorem"

    $$
    \lim_{x \rightarrow 0} \frac{\sin x}{x} = 1
    $$

