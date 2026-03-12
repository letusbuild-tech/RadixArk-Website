---
title: "Elliptic Curve Cryptography in HTTPS"
date: 2026-06-10
author: "Cybersecurity Division"
tags: ["crypto", "security"]
description: "Why modern securing routing relies on geometry rather than just large prime numbers."
math: true
image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop"
---

While RSA dominated early internet security, modern TLS/HTTPS certificates almost exclusively use Elliptic Curve Cryptography (ECC) because it provides the same security with significantly smaller key sizes, saving bandwidth and CPU cycles.

### The Algebraic Curve

An elliptic curve over a finite field \( \mathbb{F}_p \) is defined by the Weierstrass equation:

$$
y^2 = x^3 + ax + b \pmod{p}
$$

Where \( 4a^3 + 27b^2 \neq 0 \) (ensuring no singular points). 

### Point Addition and Scalar Multiplication

The core cryptographic operation in software is scalar multiplication: adding a point \( P \) on the curve to itself \( k \) times to produce a new point \( Q = kP \).

If \( P = (x_1, y_1) \) and \( Q = (x_2, y_2) \), point addition \( P + Q = R(x_3, y_3) \) requires calculating the slope \( m \):

\[ m = \frac{y_2 - y_1}{x_2 - x_1} \pmod{p} \]

\[ x_3 = m^2 - x_1 - x_2 \pmod{p} \]

\[ y_3 = m(x_1 - x_3) - y_1 \pmod{p} \]

### The Trapdoor Function

Given \( P \) and \( Q \), finding the scalar \( k \) is known as the Elliptic Curve Discrete Logarithm Problem (ECDLP). 

$$
k = \log_P(Q)
$$

It is computationally infeasible to solve this in polynomial time with classical computers, guaranteeing secure communication channels between our servers and clients.
