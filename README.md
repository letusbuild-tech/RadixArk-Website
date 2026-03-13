# RadixArk Website

RadixArk Website is a Hugo-based static site with:

- a landing page at `/`
- a blog index at `/blog/`
- individual blog posts at `/blog/<slug>/`

This repository is configured for GitHub Pages deployment and local development.

## Tech stack

- [Hugo](https://gohugo.io/) static site generator
- Markdown content in `content/blog/`
- Custom templates in `layouts/`
- Static assets in `static/`
- GitHub Actions deployment workflow in `.github/workflows/deploy-pages.yml`

## Repository structure

| Path | Purpose |
|---|---|
| `content/blog/` | Blog post Markdown files and blog section metadata (`_index.md`) |
| `layouts/` | Hugo templates (homepage, blog list, blog single page, base layout) |
| `static/` | Source static assets (CSS, JS, images, landing assets) |
| `docs/` | Generated static output used for branch-based Pages compatibility |
| `public/` | Generated local build output |
| `hugo.toml` | Production config (GitHub Pages URL) |
| `hugo.local.toml` | Local override config (localhost base URL) |

## Local development

Use Hugo with the local config override:

```bash
hugo server --config hugo.toml,hugo.local.toml
```

Default local URL:

`http://localhost:55504/`

## Production build

Generate production output:

```bash
hugo
hugo -d docs
```

## Deployment

Deployment is automated with GitHub Actions on push to `main`.

- Workflow file: `.github/workflows/deploy-pages.yml`
- Pages URL: `https://letusbuild-tech.github.io/RadixArk-Website/`

## Content operations (quick reference)

Blog posts are plain Markdown files in `content/blog/`.

- Add post: create a new `.md` file in `content/blog/`
- Edit post: update the existing `.md` file
- Delete post: remove the corresponding `.md` file

After any content change:

```bash
hugo
hugo -d docs
git add -A
git commit -m "Update blog content"
git push origin main
```

For full client handover instructions, see `DOCUMENTATION.md`.
