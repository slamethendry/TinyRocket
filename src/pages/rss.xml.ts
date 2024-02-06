import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedPosts from "../utils/getSortedPosts";

export async function GET(context) {
export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: 'Tiny Rocket',
    description: 'A humble Astronaut’s guide to the stars',
    site: context.site,
    items: sortedPosts.map(({ data, slug }) => ({
      link: `posts/${slug}`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
