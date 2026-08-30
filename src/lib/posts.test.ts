import { describe, expect, it } from "vitest";
import { calculateReadingTime, getPost, getPosts } from "./posts";

describe("calculateReadingTime", () => {
  it("returns 1 minute at minimum, even for empty content", () => {
    expect(calculateReadingTime("")).toBe(1);
  });

  it("rounds up based on 500 characters per minute, ignoring whitespace", () => {
    const content = "a".repeat(1001);
    expect(calculateReadingTime(content)).toBe(3);
  });

  it("does not count whitespace towards the character count", () => {
    const withSpaces = `${"a".repeat(500)}${" ".repeat(10000)}`;
    expect(calculateReadingTime(withSpaces)).toBe(1);
  });
});

describe("getPosts", () => {
  it("returns posts for a known locale", () => {
    const posts = getPosts("en");

    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post).toMatchObject({
        slug: expect.any(String),
        title: expect.any(String),
        date: expect.any(String),
        description: expect.any(String),
        content: expect.any(String),
        readingTime: expect.any(Number),
      });
    }
  });

  it("sorts posts by date, newest first", () => {
    const posts = getPosts("en");
    const dates = posts.map((post) => post.date);
    const sorted = [...dates].sort((a, b) => (a > b ? -1 : 1));

    expect(dates).toEqual(sorted);
  });

  it("returns an empty array for an unknown locale", () => {
    expect(getPosts("fr")).toEqual([]);
  });
});

describe("getPost", () => {
  it("returns the post matching locale and slug", () => {
    const post = getPost("en", "hello-world");

    expect(post).not.toBeNull();
    expect(post?.slug).toBe("hello-world");
    expect(post?.title).toBe("Hello World");
  });

  it("returns null when the slug does not exist", () => {
    expect(getPost("en", "does-not-exist")).toBeNull();
  });

  it("returns null when the locale does not exist", () => {
    expect(getPost("fr", "hello-world")).toBeNull();
  });
});
