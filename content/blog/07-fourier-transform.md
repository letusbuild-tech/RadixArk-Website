---
title: "Graph Theory in Network Routing (Dijkstra)"
date: 2026-06-15
author: "Network Engineering"
tags: ["networks", "algorithms"]
description: "How internet routers mathematically determine the shortest path for your packets."
math: true
image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
---

Every time an HTTP request leaves your device, it traverses a complex graph of autonomous systems. Protocols like OSPF use Dijkstra's algorithm to calculate the absolute shortest path mathematically.

### The Weighted Graph

Let the network be a weighted directed graph \( G = (V, E) \), where \( V \) is the set of router nodes and \( E \) is the set of edges (fiber links). The weight function maps edges to real-number costs, often based on latency or bandwidth:

$$
w: E \rightarrow \mathbb{R}^+
$$

The goal is to find the path \( P = \langle v_0, v_1, \dots, v_k \rangle \) from a source \( s \) to a destination \( d \) that minimizes the total cost:

\[ w(P) = \sum_{i=1}^{k} w(v_{i-1}, v_i) \]

### The Relaxation Equation

The core software loop of Dijkstra's algorithm relies on the principle of edge relaxation. We maintain an estimated distance \( d[u] \) from the source for every node. 

When evaluating an edge from node \( u \) to node \( v \) with weight \( w(u, v) \), we check if the path through \( u \) is strictly faster than the currently known path to \( v \):

$$
\text{if } d[v] > d[u] + w(u, v) \text{ then } d[v] \leftarrow d[u] + w(u, v)
$$

By maintaining a priority queue and repeatedly relaxing the edges of the smallest known node, the algorithm proves \( d[v] \) is the optimal minimal path.
