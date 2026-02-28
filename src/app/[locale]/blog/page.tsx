import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getBlogPosts(locale);

  return (
    <main>
      <h1 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{t("title")}</h1>

      {posts.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">{t("noArticles")}</p>
      ) : (
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <time className="text-sm text-zinc-500 dark:text-zinc-500">{post.date}</time>
                <h2 className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">{post.description}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
