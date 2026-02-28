import { siteConfig } from "@/lib/config";
import type { MetadataRoute } from "next";

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
