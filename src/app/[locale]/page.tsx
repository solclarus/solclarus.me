import { Contributions } from "@/app/[locale]/_components/contributions";
import { ContributionsSectionSkeleton } from "@/app/[locale]/_components/contributions-section-skeleton";
import { FeaturedWorksSection } from "@/app/[locale]/_components/featured-works-section";
import { Hero } from "@/app/[locale]/_components/hero";
import { RecentPostsSection } from "@/app/[locale]/_components/recent-posts-section";
import { WORKS } from "@/config/works";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import { getPosts } from "@/lib/posts";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
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
  const posts = getPosts(locale).slice(0, 3);
  const featuredWorks = WORKS.filter((w) => w.category === "work" && w.status === "live").slice(
    0,
    2,
  );

  return (
    <div className="space-y-12">
      <Hero greeting={t("greeting")} intro={t("intro")} />

      <Suspense fallback={<ContributionsSectionSkeleton />}>
        <Contributions username={siteConfig.author} />
      </Suspense>

      {featuredWorks.length > 0 && (
        <FeaturedWorksSection
          title={t("featuredWorks")}
          viewAllLabel={t("viewAll")}
          works={featuredWorks}
          locale={locale}
        />
      )}

      {posts.length > 0 && (
        <RecentPostsSection title={t("recentPosts")} viewAllLabel={t("viewAll")} posts={posts} />
      )}
    </div>
  );
}
