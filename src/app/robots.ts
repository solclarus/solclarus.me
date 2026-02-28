import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

const baseUrl = siteConfig.baseUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
