"use client";

import { usePathname } from "@/i18n/routing";
import { Link } from "@/i18n/routing";

export function LocaleSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const otherLocale = locale === "ja" ? "en" : "ja";

  return (
    <Link
      href={pathname}
      locale={otherLocale}
      className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
      title={otherLocale === "ja" ? "日本語に切り替え" : "Switch to English"}
    >
      {otherLocale.toUpperCase()}
    </Link>
  );
}
