"use client";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname, Link } from "@/i18n/routing";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

type BottomNavProps = {
  locale: string;
  navItems: NavItem[];
};

export function BottomNav({ locale, navItems }: BottomNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 md:hidden">
      <div className="flex items-center gap-1 rounded-2xl border border-zinc-200/50 bg-white/60 px-3 py-2 shadow-xl shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/50 dark:bg-zinc-900/60 dark:shadow-zinc-900/20">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
              isActive(item.href)
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            }`}
            aria-label={item.label}
          >
            {item.icon}
          </Link>
        ))}
        <div className="mx-1 h-6 w-px bg-zinc-300 dark:bg-zinc-700" />
        <ThemeToggle />
        <LocaleSwitcher locale={locale} />
      </div>
    </nav>
  );
}

export function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

export function BlogIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  );
}

export function AboutIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
