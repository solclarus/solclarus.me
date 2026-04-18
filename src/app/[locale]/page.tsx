import { GitHubHeatmap } from "@/components/github-heatmap";
import { GitHubIcon } from "@/components/icons";
import { WorkCard } from "@/components/work-card";
import { WORKS } from "@/config/works";
import { Link, routing } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { getGitHubContributions } from "@/lib/github";
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
  const contributions = await getGitHubContributions(siteConfig.author);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        <div className="flex items-center gap-4">
          <Image
            src="/avatar.png"
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

      {/* GitHub Contributions */}
      {contributions && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Contributions</h2>
          <GitHubHeatmap data={contributions} username={siteConfig.author} />
        </section>
      )}

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
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredWorks.map((work) => (
              <WorkCard key={work.id} work={work} locale={locale} />
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
