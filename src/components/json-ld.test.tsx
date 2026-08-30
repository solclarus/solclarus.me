import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArticleJsonLd, BreadcrumbJsonLd, WebsiteJsonLd } from "./json-ld";

function readJsonLd(container: HTMLElement) {
  const script = container.querySelector('script[type="application/ld+json"]');
  expect(script).not.toBeNull();
  return JSON.parse(script?.innerHTML ?? "null");
}

describe("WebsiteJsonLd", () => {
  it("renders a WebSite schema for the given locale", () => {
    const { container } = render(<WebsiteJsonLd locale="ja" />);
    const jsonLd = readJsonLd(container);

    expect(jsonLd["@type"]).toBe("WebSite");
    expect(jsonLd.inLanguage).toBe("ja");
    expect(jsonLd.url).toContain("/ja");
    expect(jsonLd.author["@type"]).toBe("Person");
  });
});

describe("ArticleJsonLd", () => {
  it("defaults dateModified to publishedTime when not provided", () => {
    const { container } = render(
      <ArticleJsonLd
        title="Title"
        description="Description"
        publishedTime="2026-01-01"
        url="https://solclarus.me/en/posts/title"
        locale="en"
      />,
    );
    const jsonLd = readJsonLd(container);

    expect(jsonLd.datePublished).toBe("2026-01-01");
    expect(jsonLd.dateModified).toBe("2026-01-01");
    expect(jsonLd.image).toBeUndefined();
  });

  it("includes image and mainEntityOfPage when provided", () => {
    const { container } = render(
      <ArticleJsonLd
        title="Title"
        description="Description"
        publishedTime="2026-01-01"
        modifiedTime="2026-02-01"
        image="https://solclarus.me/en/posts/title/opengraph-image"
        url="https://solclarus.me/en/posts/title"
        locale="en"
      />,
    );
    const jsonLd = readJsonLd(container);

    expect(jsonLd.dateModified).toBe("2026-02-01");
    expect(jsonLd.image).toEqual(["https://solclarus.me/en/posts/title/opengraph-image"]);
    expect(jsonLd.mainEntityOfPage).toEqual({
      "@type": "WebPage",
      "@id": "https://solclarus.me/en/posts/title",
    });
  });
});

describe("BreadcrumbJsonLd", () => {
  it("numbers items starting at 1 in the given order", () => {
    const { container } = render(
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://solclarus.me/en" },
          { name: "Posts", url: "https://solclarus.me/en/posts" },
          { name: "Hello World", url: "https://solclarus.me/en/posts/hello-world" },
        ]}
      />,
    );
    const jsonLd = readJsonLd(container);

    expect(jsonLd["@type"]).toBe("BreadcrumbList");
    expect(jsonLd.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: "https://solclarus.me/en" },
      { "@type": "ListItem", position: 2, name: "Posts", item: "https://solclarus.me/en/posts" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Hello World",
        item: "https://solclarus.me/en/posts/hello-world",
      },
    ]);
  });
});
