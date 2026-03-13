# RadixArk Website - Client Handover Documentation

This document explains how to operate, maintain, and publish the RadixArk Website.

## 1) Project overview

The site contains:

- Landing page: `/`
- Blog index: `/blog/`
- Blog detail pages: `/blog/<slug>/`

The site is built with Hugo and deployed to GitHub Pages.

## 2) Environment and prerequisites

Install:

- Git
- Hugo Extended (recommended version: `0.157.0` or compatible newer version)

Verify:

```bash
hugo version
git --version
```

## 3) Key files and folders

| Path | Purpose |
|---|---|
| `hugo.toml` | Production configuration (GitHub Pages base URL) |
| `hugo.local.toml` | Local override configuration for development |
| `content/blog/` | All blog content files (`.md`) |
| `content/blog/_index.md` | Blog section metadata |
| `layouts/` | Hugo HTML templates |
| `static/` | Source assets (styles, scripts, images) |
| `docs/` | Generated static output (kept for compatibility) |
| `.github/workflows/deploy-pages.yml` | Automatic deployment workflow |

## 4) Run locally

Start a local development server:

```bash
hugo server --config hugo.toml,hugo.local.toml
```

Local URL:

`http://localhost:55504/`

## 5) Blog content management

All blog posts are in `content/blog/`.

### A) Add a new blog post

1. Create a new markdown file in `content/blog/`, for example:
   `content/blog/11-new-topic.md`
2. Use this front matter template:

```yaml
---
title: "Your Post Title"
date: 2026-07-01
author: "Team or Author Name"
tags: ["ai", "systems"]
description: "One sentence summary for card and SEO."
math: false
image: "https://images.unsplash.com/photo-XXXXXXXXXXXX?q=80&w=2000&auto=format&fit=crop"
---
```

3. Write the post body below the front matter.
4. Save and preview locally.

Notes:

- Use landscape images for better card/hero display.
- Set `math: true` only if the post includes equations.
- Keep `description` concise (recommended 1 sentence).

### B) Edit an existing blog post

1. Open the target file in `content/blog/`.
2. Update front matter and/or body content.
3. Preview locally.

### C) Delete a blog post

1. Delete the corresponding `.md` file from `content/blog/`.
2. Rebuild and redeploy (steps in section 7).

Hugo will automatically remove the post from list pages and generated feeds.

## 6) Optional content updates

### Update homepage content

- Edit `layouts/index.html` for structure/text.
- Edit landing styles in `static/landing/css/`.

### Update blog UI styles

- Edit `static/styles.css`.

### Update global blog templates

- Blog list: `layouts/blog/list.html`
- Blog detail: `layouts/blog/single.html`
- Base layout: `layouts/_default/baseof.html`

## 7) Build and publish workflow

After content or template changes:

```bash
# Build local output
hugo

# Build docs output (for compatibility)
hugo -d docs

# Commit and push
git add -A
git commit -m "Describe your change"
git push origin main
```

Deployment is automatic via GitHub Actions on push to `main`.

## 8) GitHub Pages settings

Repository:

`https://github.com/letusbuild-tech/RadixArk-Website`

Expected live site:

`https://letusbuild-tech.github.io/RadixArk-Website/`

Recommended Pages source setting:

- Source: **GitHub Actions**

## 9) Troubleshooting

### Site shows 404 on GitHub Pages

- Check latest workflow run in Actions tab.
- Confirm repository is public (or plan supports private Pages).
- Confirm Pages is enabled.

### CSS/layout appears broken locally

- Make sure you run with local override:
  `hugo server --config hugo.toml,hugo.local.toml`
- Hard refresh browser cache.

### Broken links after repository rename

- Update `baseURL` in `hugo.toml`.
- Rebuild and push again.

## 10) Handover checklist

- [ ] Client has admin access to repository
- [ ] Client can run Hugo locally
- [ ] Client understands add/edit/delete post workflow
- [ ] Client confirms GitHub Actions deployment succeeds
- [ ] Live URL is accessible

---

For quick usage instructions, see `README.md`.
