import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WorkCard } from "./work-card";
import type { Work } from "@/config/works";

function makeWork(overrides: Partial<Work>): Work {
  return {
    id: "test",
    name: "Test Work",
    description: { ja: "説明", en: "Description" },
    tech: ["TypeScript"],
    category: "work",
    status: "live",
    ...overrides,
  };
}

describe("WorkCard", () => {
  // Regression test: `getFaviconUrl` calls `new URL(work.url)`, which throws
  // for relative paths like "/usogui-games". The favicon <Image> must never
  // be rendered for an internal URL.
  it("does not throw and skips the favicon image for an internal (relative) url", () => {
    const work = makeWork({ url: "/usogui-games" });

    const { container } = render(<WorkCard work={work} locale="ja" />);

    expect(container.querySelector("img")).toBeNull();
  });

  it("renders a favicon image for an absolute url without an explicit favicon", () => {
    const work = makeWork({ url: "https://example.com" });

    const { container } = render(<WorkCard work={work} locale="ja" />);

    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img?.getAttribute("src")).toContain("example.com");
  });

  it("uses the explicit favicon when provided, even for an internal url", () => {
    const work = makeWork({ url: "/usogui-games", favicon: "/favicons/custom.svg" });

    const { container } = render(<WorkCard work={work} locale="ja" />);

    const img = container.querySelector("img");
    expect(img).not.toBeNull();
  });

  it("falls back to the GitHub icon when there is no url or favicon", () => {
    const work = makeWork({ github: "https://github.com/example/example" });

    const { container } = render(<WorkCard work={work} locale="ja" />);

    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
