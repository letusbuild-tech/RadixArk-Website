---
title: "Stochastic Gradient Descent and Adam"
date: 2026-06-08
author: "Machine Learning Devs"
tags: ["ml", "optimization"]
description: "The technical implementation of the training loop that powers deep neural networks."
math: true
image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&auto=format&fit=crop&w=1920&h=1080"
---

Training a massive neural network requires navigating a high-dimensional loss landscape to find the global minimum. We don't solve this analytically; we use iterative software algorithms.

### The Gradient Descent Loop

Given a software cost function \( J(\theta) \), the system computes the partial derivatives (gradients) using Backpropagation and updates the weights:

$$
\theta_{t+1} = \theta_t - \eta \nabla J(\theta_t)
$$

### The Adam Optimizer

Vanilla gradient descent is slow and gets stuck in local minima. Modern Deep Learning frameworks (TensorFlow, PyTorch) default to the Adam (Adaptive Moment Estimation) optimizer.

It maintains exponentially decaying averages of past gradients \( m_t \) and squared gradients \( v_t \):

$$
m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t
$$

$$
v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2
$$

Because these vectors are initialized to zero, they are biased. The software applies a bias correction step before updating the network weights:

\[ \hat{m}_t = \frac{m_t}{1 - \beta_1^t}, \quad \hat{v}_t = \frac{v_t}{1 - \beta_2^t} \]

\[ \theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t \]

This dynamic, per-parameter learning rate allows LLMs to converge in days instead of years.
