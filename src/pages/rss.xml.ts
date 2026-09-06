import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/posts';
import type { APIContext } from 'astro';

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: 'Daniel Zuloaga — Writing',
    description: 'Notes on building with AI agents, agentic workflows, and the judgment calls that still belong to people.',
    site: context.site,
    trailingSlash: false,
    customData: '<language>en-us</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}`,
      categories: post.data.tags,
    })),
  });
}
