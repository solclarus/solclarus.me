import { describe, expect, it } from "vitest";
import { extractToc } from "./toc";

describe("extractToc", () => {
  it("returns an empty array when there are no headings", () => {
    expect(extractToc("just some text\nwithout headings")).toEqual([]);
  });

  it("extracts only level-2 (##) headings", () => {
    const content = ["# Title", "## Introduction", "### Details", "## Conclusion"].join("\n");

    const toc = extractToc(content);

    expect(toc).toEqual([
      { id: "introduction", text: "Introduction", level: 2 },
      { id: "conclusion", text: "Conclusion", level: 2 },
    ]);
  });

  it("slugifies headings by lowercasing and replacing spaces with hyphens", () => {
    const toc = extractToc("## Getting Started With Next.js");

    expect(toc[0]).toEqual({
      id: "getting-started-with-nextjs",
      text: "Getting Started With Next.js",
      level: 2,
    });
  });

  it("preserves Japanese characters in the generated id", () => {
    const toc = extractToc("## はじめに");

    expect(toc[0]).toEqual({ id: "はじめに", text: "はじめに", level: 2 });
  });

  it("trims surrounding whitespace from heading text", () => {
    const toc = extractToc("##   Spaced Heading   ");

    expect(toc[0].text).toBe("Spaced Heading");
  });
});
