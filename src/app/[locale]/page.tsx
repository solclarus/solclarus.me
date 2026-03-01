import { GitHubIcon } from "@/components/icons";
import { WORKS } from "@/config/works";
import { Link, routing } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
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
  const featuredWorks = WORKS.filter((w) => w.status === "live").slice(0, 2);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        <div className="flex items-center gap-4">
          <Image
            src="https://avatars.githubusercontent.com/u/75738518?v=4"
            alt={siteConfig.author}
            width={64}
            height={64}
            className="rounded-full"
            priority
          />
          <h1 className="text-2xl font-bold text-foreground">{t("greeting")}</h1>
        </div>
        <p className="leading-relaxed text-muted-foreground">{t("intro")}</p>
        <div className="flex items-center gap-4 pt-2">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2 text-sm text-muted-foreground transition-all hover:-translate-y-0.5 hover:bg-card hover:text-foreground hover:shadow-sm"
          >
            <GitHubIcon className="size-4" />
            <span>GitHub</span>
          </a>
        </div>
      </section>

      {/* Featured Works */}
      {featuredWorks.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">{t("featuredWorks")}</h2>
            <Link
              href="/works"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("viewAll")}
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {featuredWorks.map((work) => (
              <a
                key={work.id}
                href={work.url || work.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-border bg-card/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-card hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-foreground">{work.name}</h3>
                  <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
                    </span>
                    Live
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {work.description[locale as "ja" | "en"]}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {work.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {posts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">{t("recentPosts")}</h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("viewAll")}
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-border/50">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="py-3 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-medium text-foreground group-hover:text-primary">
                      {post.title}
                    </h3>
                    <time className="shrink-0 text-sm text-muted-foreground">{post.date}</time>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
