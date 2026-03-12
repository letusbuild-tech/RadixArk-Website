# RadixArk Blog

Situs RadixArk: **homepage** (landing “Ship AI for All”) + **blog** (artikel).

## Struktur

- **`/`** — Homepage (landing dari `static/landing/`)
- **`/blog/`** — Daftar artikel
- **`/blog/<slug>/`** — Halaman satu artikel

## Folder penting

| Folder | Isi |
|--------|-----|
| `content/blog/` | Artikel blog (Markdown); `_index.md` = halaman indeks blog |
| `layouts/` | Template: `index.html` = homepage, `section/blog.html` = list blog, `blog/single.html` = artikel |
| `static/` | Aset: `styles.css` (blog), `landing/` (CSS, JS, images untuk homepage) |

## Perintah

```bash
# Dev server (homepage di /, blog di /blog)
hugo server

# Build untuk production (output di docs/)
hugo
```
