import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://tinyrocket.pages.dev',
  integrations: [preact(), tailwind(), sitemap(), mdx()],
  legacy: {
    astroFlavoredMarkdown: true
  }
});