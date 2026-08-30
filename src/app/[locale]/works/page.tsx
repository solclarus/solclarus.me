import { WorkGrid } from "@/components/work-grid";
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
  const works = WORKS.filter((work) => work.category === "work");
  const labProjects = WORKS.filter((work) => work.category === "lab");

  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <h1 className="font-heading text-2xl font-bold text-foreground">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </section>

      <section className="space-y-4">
        <WorkGrid works={works} locale={locale} />
      </section>

      {labProjects.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-heading text-lg font-semibold text-foreground">{t("lab")}</h2>
          <WorkGrid works={labProjects} locale={locale} />
        </section>
      )}
    </div>
  );
}
