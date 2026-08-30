import { siteConfig } from "@/lib/config";
import { getPosts } from "@/lib/posts";
import { describe, expect, it, vi } from "vitest";

// `@/i18n/routing` pulls in `next-intl`'s client navigation helpers, which
// depend on the Next.js app-router runtime and don't resolve under Vitest.
// `sitemap.ts` only needs the locale list, so stub that out directly.
vi.mock("@/i18n/routing", () => ({
  routing: { locales: ["ja", "en"], defaultLocale: "ja" },
}));

const routing = { locales: ["ja", "en"] as const };
const { default: sitemap } = await import("./sitemap");

describe("sitemap", () => {
  it("includes every static page for every locale", () => {
    const entries = sitemap();
    const staticPages = ["", "/posts", "/works"];

    for (const locale of routing.locales) {
      for (const page of staticPages) {
        expect(
          entries.some((entry) => entry.url === `${siteConfig.baseUrl}/${locale}${page}`),
        ).toBe(true);
      }
    }
  });

  it("gives the home page the highest priority", () => {
    const entries = sitemap();
    const home = entries.find((entry) => entry.url === `${siteConfig.baseUrl}/ja`);

    expect(home?.priority).toBe(1);
  });

  it("includes an entry for every post in every locale", () => {
    const entries = sitemap();
    const totalPosts = routing.locales.reduce((sum, locale) => sum + getPosts(locale).length, 0);
    const postEntries = entries.filter((entry) => entry.url.includes("/posts/"));

    expect(postEntries).toHaveLength(totalPosts);
  });

  it("cross-links each static page with its translations via hreflang alternates", () => {
    const entries = sitemap();
    const jaHome = entries.find((entry) => entry.url === `${siteConfig.baseUrl}/ja`);

    expect(jaHome?.alternates?.languages).toEqual({
      ja: `${siteConfig.baseUrl}/ja`,
      en: `${siteConfig.baseUrl}/en`,
    });
  });

  it("only lists post translations that actually exist", () => {
    const entries = sitemap();
    const enPost = entries.find(
      (entry) => entry.url === `${siteConfig.baseUrl}/en/posts/hello-world`,
    );

    expect(enPost?.alternates?.languages).toMatchObject({
      en: `${siteConfig.baseUrl}/en/posts/hello-world`,
    });
    expect(Object.keys(enPost?.alternates?.languages ?? {})).not.toContain("fr");
  });
});
