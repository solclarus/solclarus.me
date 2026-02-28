import { siteConfig } from "@/lib/config";

type WebsiteJsonLdProps = {
  locale: string;
};

export function WebsiteJsonLd({ locale }: WebsiteJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.author,
    url: `${siteConfig.baseUrl}/${locale}`,
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.social.github,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

type ArticleJsonLdProps = {
  title: string;
  description: string;
  publishedTime: string;
  url: string;
  locale: string;
};

export function ArticleJsonLd({
  title,
  description,
  publishedTime,
  url,
  locale,
}: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedTime,
    url,
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.social.github,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
