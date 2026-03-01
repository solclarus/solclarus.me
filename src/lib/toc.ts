export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function extractToc(content: string): TocItem[] {
  const headingRegex = /^(##)\s+(.+)$/gm;
  const toc: TocItem[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF-]/g, "")
      .replace(/\s+/g, "-");

    toc.push({ id, text, level: 2 });
  }

  return toc;
}
