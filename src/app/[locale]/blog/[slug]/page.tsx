import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";

export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const posts = getBlogPosts(params.locale);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);

  if (!post) {
    notFound();
  }

  const { default: MDXContent } = await evaluate(post.content, {
    ...runtime,
    remarkPlugins: [remarkGfm],
  });

  return (
    <main>
      <article>
        <header className="mb-8">
          <time className="text-sm text-zinc-500">{post.date}</time>
          <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {post.title}
          </h1>
        </header>
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <MDXContent />
        </div>
      </article>
    </main>
  );
}
