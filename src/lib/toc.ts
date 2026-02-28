export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const toc: TocItem[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF-]/g, "")
      .replace(/\s+/g, "-");

    toc.push({ id, text, level });
  }

  return toc;
}
