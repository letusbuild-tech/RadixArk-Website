---
title: "Cost Models in Relational Databases"
date: 2026-06-03
author: "Data Engineering Team"
tags: ["database", "sql"]
description: "The mathematical heuristic behind how RDBMS engines choose the fastest query execution plan."
math: true
image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&auto=format&fit=crop&w=1920&h=1080"
---

When you execute a `SELECT` statement SQL query, the database engine doesn't just run it. It builds an Abstract Syntax Tree and calculates the "cost" of multiple execution plans using mathematical heuristics.

### Disk I/O vs CPU Cost

The total cost of a query plan is typically modeled as a linear combination of physical disk reads and CPU operations:

$$
\text{Cost} = (W_{\text{io}} \cdot N_{\text{pages}}) + (W_{\text{cpu}} \cdot N_{\text{tuples}})
$$

Where \( W_{\text{io}} \) is the assigned weight for fetching a page from disk, and \( W_{\text{cpu}} \) is the weight for evaluating a tuple in memory.

### Join Estimation Formula

When joining two massive tables, the query optimizer must estimate the cardinality (number of rows) of the output to decide between a Nested Loop, Hash Join, or Merge Join. For an equi-join on a foreign key, the estimated size is:

\[ \text{Est}(A \bowtie B) = \frac{|A| \times |B|}{\max(V(A, f), V(B, f))} \]

Where \( |A| \) represents the cardinality of table A, and \( V(A, f) \) represents the number of distinct values in the join column. Understanding this formula is critical for indexing strategies.
