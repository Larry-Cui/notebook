---
layout: post
title: Derivative of Function $e^x$
date: 2025-03-07
draft: false
categories: Math
tags:
  - exponential
  - functions
  - calculus
---

# Derivative of Function $e^x$

Function $f(x) = e^x$ has a unique feature in that its derivative is just as itself, $f'(x) = e^x$, throughout the entire domain. This property probably makes $e$ and $e^x$  of the most important constants and functions in Calculus. 

To derive this feature, we need to review the definition of natural number $e$ first. 

!!! note "Natural number $e$ is defined as:"
    \[
    \lim_{x \rightarrow \infty} \left(1 + \frac{1}{x} \right)^x = e
    \]

For $f(x) = e^x$, the derivative is calculated in the following way,

\[
f'(x) = \frac{e^{x+h} - e^x}{h}
\]

When we extract the common factor $e^x$ from the right side of the equation, the question reduces to finding the limit of,

\[
e^x \cdot \lim_{h \rightarrow 0} \frac{e^h -1}{h}
\]

Now here comes the fancy part. If we substitute,

\begin{align*}
n &= e^h -1 \\
n+1 &= e^h \\
\ln(n+1) &= h
\end{align*}

while we also know when $h \rightarrow 0$, $n \rightarrow 0$, we can rewrite the above limit part as,

\begin{align*}
\lim_{n \rightarrow 0} \frac{n}{\ln (n+1)} 
&= \lim_{n \rightarrow 0} \frac{1}{\frac{1}{n} \cdot \ln (n+1)} \\
&= \lim_{n \rightarrow 0} \frac{1}{\ln (n+1) ^ {\frac{1}{n}}} 
\end{align*}

At this moment, we can find the limit inside logarithm first,

\[
\frac{1}{\ln \left( \displaystyle \lim_{n \rightarrow 0} (n+1) ^ {\frac{1}{n}} \right) }
\]

It's apparent by now that the denominator is simply a variant of $e$ definition. 

\[
\frac{1}{\ln \left( \displaystyle \lim_{n \rightarrow 0} (n+1) ^ {\frac{1}{n}} \right) } = \frac{1}{\ln e} = 1
\]

This concludes the proof the $e^x$ derivative:

!!! note "Derivative of function $e^x$ is the function itself:"
    \[
    f'(x) = \frac{e^{x+h} - e^x}{h} = e^x \cdot \lim_{h \rightarrow 0} \frac{e^h -1}{h} = e^x \cdot 1 = e^x
    \]

Khan Academy© also has [a details explanation](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new/ab-2-7/a/proof-the-derivative-of-is){:target="\_blank"} helping you navigate through the proof process. 