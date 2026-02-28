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
      className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
    >
      {otherLocale.toUpperCase()}
    </Link>
  );
}
