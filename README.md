# Tiny Rocket

A minimally styled theme for Astro.

🧑‍🚀 Features:

- ✅ Designed for company website and blog
- ✅ Simple enough for personal website and/or blog
- ✅ Markdown support (.mdx)
- ✅ Sitemap.xml generation
- ✅ Style is highly customisable with Tailwind CSS
- ✅ Search capability using lightweight client-side JS

Refer to [Tiny Rocket Documentation](https://tinyrocket.pages.dev/doc).

## 🚀 Project Structure

Below is an overview.

```bash
/
├── public/
│   ├── assets
│   ├── _pagefind
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── components/
│   ├── layouts/
│   └── pages/
│       └── index.astro
│       └── doc.astro
│       └── search.astro
│       └── privacy.md
│       └── blog/
│           └── [...page].astro
│           └── few_sample_posts.md
└── astro.config.mjs
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

Any static assets, like images, are placed in the `public/` directory.

## 👀 Want to learn more?

- [Astro documentation](https://github.com/withastro/astro)

- [Tiny Rocket Documentation](https://tinyrocket.pages.dev/doc)
