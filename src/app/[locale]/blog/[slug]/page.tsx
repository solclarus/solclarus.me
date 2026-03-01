import { ArticleJsonLd } from "@/components/json-ld";
import { Toc } from "@/components/toc";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { extractToc } from "@/lib/toc";
import { evaluate } from "@mdx-js/mdx";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import * as runtime from "react/jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";

export function generateStaticParams({ params }: { params: { locale: string } }) {
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

  const url = `${siteConfig.baseUrl}/${locale}/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      authors: [siteConfig.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getBlogPost(locale, slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "blog" });
  const toc = extractToc(post.content);

  const { default: MDXContent } = await evaluate(post.content, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          keepBackground: true,
        },
      ],
    ],
  });

  const url = `${siteConfig.baseUrl}/${locale}/blog/${slug}`;

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        publishedTime={post.date}
        url={url}
        locale={locale}
      />
      <article>
        <header className="mb-8">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <time>{post.date}</time>
            <span>·</span>
            <span>{t("readingTime", { minutes: post.readingTime })}</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold text-foreground">{post.title}</h1>
        </header>
        {toc.length > 0 && <Toc items={toc} title={t("toc")} />}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXContent />
        </div>
      </article>
    </>
  );
}
