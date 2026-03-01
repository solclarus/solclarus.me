import { routing } from "@/i18n/routing";
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
  const t = await getTranslations({ locale, namespace: "about" });
  const url = `${siteConfig.baseUrl}/${locale}/about`;

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

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <div className="space-y-12">
      {/* Profile */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">{t("title")}</h1>
        <div className="space-y-4">
          <p className="text-2xl font-semibold text-foreground">{siteConfig.author}</p>
          <p className="text-lg leading-relaxed text-muted-foreground">{t("bio")}</p>
        </div>
      </section>

      {/* Interests */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">{t("interests")}</h2>
        <div className="flex flex-wrap gap-2">
          {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Bun"].map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">{t("links")}</h2>
        <div className="flex flex-col gap-3">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-5" />
            <span>github.com/solclarus</span>
          </a>
        </div>
      </section>
    </div>
  );
}
