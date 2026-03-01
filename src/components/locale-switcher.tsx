"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "@/i18n/routing";
import { AnimatePresence, motion } from "motion/react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CircleFlagLanguage } from "react-circle-flags";

const AVAILABLE_LOCALES = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
] as const;

const MotionCircleFlag = motion.create(CircleFlagLanguage);

export function LocaleSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-10 shrink-0 rounded-full">
        <span className="size-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="size-10 shrink-0 cursor-pointer rounded-full"
          variant="ghost"
          size="icon"
        >
          <AnimatePresence mode="wait">
            <MotionCircleFlag
              key={locale}
              languageCode={locale}
              height={18}
              width={18}
              initial={{ opacity: 0, scale: 0.2, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.2, rotate: 180 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {AVAILABLE_LOCALES.map(({ code, label }) => {
          const isActive = code === locale;

          return (
            <DropdownMenuItem key={code} disabled={isActive} asChild>
              <Link href={`/${code}${pathname}`} className="flex items-center gap-2">
                <CircleFlagLanguage languageCode={code} height={16} width={16} />
                {label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
