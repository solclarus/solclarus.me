import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

const contentDirectory = path.join(process.cwd(), "content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  readingTime: number;
};

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 500;
  const charCount = content.replace(/\s+/g, "").length;
  return Math.max(1, Math.ceil(charCount / wordsPerMinute));
}

export function getBlogPosts(locale: string): BlogPost[] {
  const localeDir = path.join(contentDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(localeDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        description: data.description || "",
        content,
        readingTime: calculateReadingTime(content),
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export function getBlogPost(locale: string, slug: string): BlogPost | null {
  const fullPath = path.join(contentDirectory, locale, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    description: data.description || "",
    content,
    readingTime: calculateReadingTime(content),
  };
}
