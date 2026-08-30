import { BreadcrumbJsonLd } from "@/components/json-ld";
import { Link, routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import { getPosts } from "@/lib/posts";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "posts" });
  const url = `${siteConfig.baseUrl}/${locale}/posts`;

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function PostsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "posts" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const posts = getPosts(locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tNav("home"), url: `${siteConfig.baseUrl}/${locale}` },
          { name: tNav("posts"), url: `${siteConfig.baseUrl}/${locale}/posts` },
        ]}
      />
      <h1 className="mb-10 font-heading text-3xl font-bold text-foreground">{t("title")}</h1>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">{t("noArticles")}</p>
      ) : (
        <div className="divide-y divide-border/50">
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
              <article className="py-6 transition-colors">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <time>{post.date}</time>
                  <span>·</span>
                  <span>{t("readingTime", { minutes: post.readingTime })}</span>
                </div>
                <h2 className="mt-1.5 font-heading text-lg font-medium text-foreground group-hover:text-brand">
                  {post.title}
                </h2>
                <p className="mt-1.5 line-clamp-1 text-sm text-muted-foreground">
                  {post.description}
                </p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
