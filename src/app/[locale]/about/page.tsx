import { GitHubIcon } from "@/components/icons";
import { SkillsSection } from "@/components/skills-section";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import { Mail } from "lucide-react";
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
    <div className="space-y-10">
      {/* Profile */}
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
          <p className="text-xl font-semibold text-foreground">{siteConfig.author}</p>
        </div>
        <p className="leading-relaxed text-muted-foreground">{t("bio")}</p>
      </section>

      {/* Skills */}
      <SkillsSection />

      {/* Links */}
      <section>
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg border border-border bg-card/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-card hover:shadow-sm"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-secondary">
              <GitHubIcon className="size-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">GitHub</p>
              <p className="text-sm text-muted-foreground">@solclarus</p>
            </div>
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="group flex items-center gap-3 rounded-lg border border-border bg-card/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-card hover:shadow-sm"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-secondary">
              <Mail className="size-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">Email</p>
              <p className="text-sm text-muted-foreground">{siteConfig.email}</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
