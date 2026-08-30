import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import { getPosts } from "@/lib/posts";
import type { MetadataRoute } from "next";

const baseUrl = siteConfig.baseUrl;

function languageAlternates(path: string, locales: readonly string[]) {
  return Object.fromEntries(locales.map((locale) => [locale, `${baseUrl}/${locale}${path}`]));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;

  // Static pages
  const staticPages = ["", "/posts", "/works"];
  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: languageAlternates(page, locales),
      },
    })),
  );

  // Posts
  const postsByLocale = Object.fromEntries(locales.map((locale) => [locale, getPosts(locale)]));

  const postEntries = locales.flatMap((locale) =>
    postsByLocale[locale].map((post) => {
      const availableLocales = locales.filter((l) =>
        postsByLocale[l].some((p) => p.slug === post.slug),
      );

      return {
        url: `${baseUrl}/${locale}/posts/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: {
          languages: languageAlternates(`/posts/${post.slug}`, availableLocales),
        },
      };
    }),
  );

  return [...staticEntries, ...postEntries];
}
