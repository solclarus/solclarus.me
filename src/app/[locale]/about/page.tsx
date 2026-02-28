import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <main>
      <h1 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        {t("title")}
      </h1>
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p>{siteConfig.author}</p>
        <p>
          {locale === "ja"
            ? "ソフトウェアエンジニア。Web開発や技術について書いています。"
            : "Software Engineer. Writing about web development and technology."}
        </p>

        <h2>{locale === "ja" ? "リンク" : "Links"}</h2>
        <ul>
          <li>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
