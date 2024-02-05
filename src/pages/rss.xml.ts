import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../config";
import getSortedPosts from "../utils/getSortedPosts";

export async function GET(context) {
export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: 'Tiny Rocket',
    description: 'A humble Astronaut’s guide to the stars',
    site: context.site,
    items: await pagesGlobToRssItems(
      import.meta.glob('./blog/*.{md,mdx}'),
    ),
    title: SITE.title,
    description: SITE.description,
    site: SITE.website,
    items: sortedPosts.map(({ data, slug }) => ({
      link: `posts/${slug}`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
