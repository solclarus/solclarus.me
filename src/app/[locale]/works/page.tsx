import { GitHubIcon } from "@/components/icons";
import { WORKS } from "@/config/works";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import { Globe } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { WorkStatus } from "@/config/works";
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

function StatusBadge({ status }: { status: WorkStatus }) {
  const config = {
    live: {
      label: "Live",
      dotClass: "bg-green-500",
      textClass: "text-green-600 dark:text-green-400",
    },
    building: {
      label: "Building",
      dotClass: "bg-amber-500",
      textClass: "text-amber-600 dark:text-amber-400",
    },
    archived: {
      label: "Archived",
      dotClass: "bg-muted-foreground",
      textClass: "text-muted-foreground",
    },
  };

  const { label, dotClass, textClass } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${textClass}`}>
      <span className="relative flex size-2">
        {status === "live" && (
          <span
            className={`absolute inline-flex size-full animate-ping rounded-full ${dotClass} opacity-75`}
          />
        )}
        <span className={`relative inline-flex size-2 rounded-full ${dotClass}`} />
      </span>
      {label}
    </span>
  );
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
          <article
            key={work.id}
            className="group relative rounded-lg border border-border bg-card/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:bg-card hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold text-foreground">{work.name}</h2>
                <StatusBadge status={work.status} />
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {work.description[locale as "ja" | "en"]}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {work.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-1">
                {work.github && (
                  <a
                    href={work.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <GitHubIcon className="size-3.5" />
                    <span>Source</span>
                  </a>
                )}
                {work.url && (
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Globe className="size-3.5" />
                    <span>Visit</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
