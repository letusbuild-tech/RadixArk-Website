---
title: "Consistent Hashing in Load Balancers"
date: 2026-06-25
author: "Infrastructure Core"
tags: ["backend", "scaling"]
description: "The hashing formula that prevents mass cache invalidation when servers crash."
math: true
image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2000&auto=format&fit=crop"
---

When distributing millions of cache objects (like user sessions or image blobs) across \( N \) database servers, the simplest method is a modulo hash function:

$$
\text{server\_idx} = \text{hash}(\text{object\_key}) \pmod{N}
$$

### The Rehashing Problem

The equation above works perfectly until a server crashes, changing \( N \) to \( N-1 \). Suddenly, almost every object hashes to a completely different index. This causes massive cache misses and traffic spikes known as a "thundering herd."

### Consistent Hashing Ring

Consistent hashing, implemented heavily in Memcached and DynamoDB, maps both servers and objects onto the same abstract circular space (a hash ring), typically defined modulo \( 2^{32} \):

\[ 0 \le \text{hash}(x) \le 2^{32}-1 \]

To find which server should store an object, the system hashes the object key to obtain an angle \( \theta \) on the ring, then searches clockwise for the nearest server node \( S \):

$$
S_{target} = \min \{ S_i \in S \mid \text{hash}(S_i) \ge \text{hash}(\text{object}) \}
$$

By wrapping the ring (if the object hash is greater than all server hashes, it maps to the first server), the software ensures that adding or removing a server only affects \( 1/N \) of the keys. The rest of the equations remain flawlessly stable, ensuring ultra-reliable backend routing.
