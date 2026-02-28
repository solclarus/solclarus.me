import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

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

export default function Home() {
  const t = useTranslations();

  return (
    <main>
      <h1 className="mb-4 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
        {t("home.greeting")}
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">{t("home.intro")}</p>
    </main>
  );
}
