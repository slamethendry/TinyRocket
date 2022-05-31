# Tiny Rocket

A minimally styled theme for Astro.

🧑‍🚀 Features:

- ✅ For small company website with company blog
- ✅ Can be used for personal website and/or blog
- ✅ Markdown support
- ✅ Sitemap.xml generation
- ✅ Style is highly customisable with Tailwind CSS

Some key settings are documented in [Tiny Rocket's About page](https://tinyrocket.pages.dev/about).

## 🚀 Project Structure

Below is an overview.

```
/
├── public/
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── components/
│   ├── layouts/
│   └── pages/
│       └── index.astro
│       └── about.astro
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

- [Tiny Rocket's About page](https://tinyrocket.pages.dev/about)