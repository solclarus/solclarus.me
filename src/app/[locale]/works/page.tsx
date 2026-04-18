import { WorkCard } from "@/components/work-card";
import { WORKS } from "@/config/works";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
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
  const t = await getTranslations({ locale, namespace: "works" });
  const url = `${siteConfig.baseUrl}/${locale}/works`;

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

export default async function WorksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "works" });

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        {WORKS.map((work) => (
          <WorkCard key={work.id} work={work} locale={locale} />
        ))}
      </div>
    </div>
  );
}
