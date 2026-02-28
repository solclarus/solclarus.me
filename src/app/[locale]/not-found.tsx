import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="flex flex-col items-center justify-center py-20">
      <h1 className="mb-4 text-6xl font-bold text-zinc-900 dark:text-zinc-100">404</h1>
      <h2 className="mb-2 text-2xl font-semibold text-zinc-800 dark:text-zinc-200">{t("title")}</h2>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">{t("description")}</p>
      <Link
        href="/"
        className="rounded-lg bg-zinc-900 px-6 py-3 text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {t("backHome")}
      </Link>
    </main>
  );
}
