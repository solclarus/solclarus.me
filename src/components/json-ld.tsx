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
  modifiedTime?: string;
  image?: string;
  url: string;
  locale: string;
};

export function ArticleJsonLd({
  title,
  description,
  publishedTime,
  modifiedTime,
  image,
  url,
  locale,
}: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedTime,
    dateModified: modifiedTime ?? publishedTime,
    image: image ? [image] : undefined,
    url,
    inLanguage: locale,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
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

type BreadcrumbJsonLdProps = {
  items: { name: string; url: string }[];
};

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
