import { siteConfig } from "@/lib/config";
import { describe, expect, it } from "vitest";
import robots from "./robots";

describe("robots", () => {
  it("allows all user agents to crawl everything", () => {
    const result = robots();

    expect(result.rules).toEqual({ userAgent: "*", allow: "/" });
  });

  it("points to the sitemap and host under the site's base URL", () => {
    const result = robots();

    expect(result.sitemap).toBe(`${siteConfig.baseUrl}/sitemap.xml`);
    expect(result.host).toBe(siteConfig.baseUrl);
  });
});
