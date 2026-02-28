import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { routing } from "@/i18n/routing";

const baseUrl = siteConfig.baseUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;

  // Static pages
  const staticPages = ["", "/blog", "/about"];
  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
    }))
  );

  // Blog posts
  const blogEntries = locales.flatMap((locale) => {
    const posts = getBlogPosts(locale);
    return posts.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  });

  return [...staticEntries, ...blogEntries];
}
