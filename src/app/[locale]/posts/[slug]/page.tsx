import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { Toc } from "@/components/toc";
import { siteConfig } from "@/lib/config";
import { getPost, getPosts } from "@/lib/posts";
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
  const posts = getPosts(params.locale);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);

  if (!post) {
    return {};
  }

  const url = `${siteConfig.baseUrl}/${locale}/posts/${slug}`;

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

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPost(locale, slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "posts" });
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

  const url = `${siteConfig.baseUrl}/${locale}/posts/${slug}`;
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        publishedTime={post.date}
        image={`${url}/opengraph-image`}
        url={url}
        locale={locale}
      />
      <BreadcrumbJsonLd
        items={[
          { name: tNav("home"), url: `${siteConfig.baseUrl}/${locale}` },
          { name: tNav("posts"), url: `${siteConfig.baseUrl}/${locale}/posts` },
          { name: post.title, url },
        ]}
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
        <div className="prose max-w-none prose-neutral dark:prose-invert">
          <MDXContent />
        </div>
      </article>
    </>
  );
}
