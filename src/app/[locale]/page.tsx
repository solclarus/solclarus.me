import { Link, routing } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { Github } from "lucide-react";
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
  const t = await getTranslations({ locale, namespace: "site" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const posts = getBlogPosts(locale).slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold text-foreground">{t("greeting")}</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">{t("intro")}</p>
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-5" />
            <span>GitHub</span>
          </a>
        </div>
      </section>

      {/* Recent Posts */}
      {posts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">{t("recentPosts")}</h2>
            <Link href="/blog" className="text-sm text-primary transition-opacity hover:opacity-80">
              {t("viewAll")} →
            </Link>
          </div>
          <div className="space-y-4">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="rounded-xl border border-transparent p-4 transition-all duration-200 hover:border-border hover:bg-card">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time>{post.date}</time>
                  </div>
                  <h3 className="mt-1 font-medium text-foreground group-hover:text-primary">
                    {post.title}
                  </h3>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
