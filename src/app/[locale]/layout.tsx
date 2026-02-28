import { BottomNav, HomeIcon, BlogIcon, AboutIcon } from "@/components/bottom-nav";
import { WebsiteJsonLd } from "@/components/json-ld";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { routing, Link } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });

  return {
    metadataBase: new URL(siteConfig.baseUrl),
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    openGraph: {
      type: "website",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      url: siteConfig.baseUrl,
      siteName: t("title"),
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: siteConfig.social.twitter,
    },
    alternates: {
      canonical: `${siteConfig.baseUrl}/${locale}`,
      languages: {
        ja: `${siteConfig.baseUrl}/ja`,
        en: `${siteConfig.baseUrl}/en`,
      },
      types: {
        "application/rss+xml": `${siteConfig.baseUrl}/${locale}/feed.xml`,
      },
    },
  };
}

const themeScript = `
(function() {
  var stored = localStorage.getItem('theme');
  if (stored === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (!stored) {
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (systemDark) {
      document.documentElement.classList.add('dark');
    }
  }
})();
`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ja" | "en")) {
    notFound();
  }

  setRequestLocale(locale);

  const [messages, t] = await Promise.all([
    getMessages(),
    getTranslations({ locale, namespace: "nav" }),
  ]);

  const navItems = [
    { href: "/", label: t("home"), icon: <HomeIcon className="h-6 w-6" /> },
    { href: "/blog", label: t("blog"), icon: <BlogIcon className="h-6 w-6" /> },
    { href: "/about", label: t("about"), icon: <AboutIcon className="h-6 w-6" /> },
  ];

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <WebsiteJsonLd locale={locale} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-zinc-50 font-sans antialiased dark:bg-black`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="mx-auto max-w-3xl px-4 pt-6 pb-20 md:px-6 md:pt-8 md:pb-8">
            {/* Desktop Header */}
            <header className="mb-8 hidden items-center justify-between md:mb-12 md:flex">
              <nav className="flex gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <LocaleSwitcher locale={locale} />
              </div>
            </header>

            <main>{children}</main>
          </div>

          {/* Mobile Bottom Navigation */}
          <BottomNav locale={locale} navItems={navItems} />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
