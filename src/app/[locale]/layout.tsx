import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing, Link } from "@/i18n/routing";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { siteConfig } from "@/lib/config";
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
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

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

  const [messages, t] = await Promise.all([
    getMessages(),
    getTranslations({ locale, namespace: "nav" }),
  ]);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                if (darkQuery.matches) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 dark:bg-black`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="mx-auto max-w-3xl px-6 py-8">
            <header className="mb-12 flex items-center justify-between">
              <nav className="flex gap-6">
                <Link
                  href="/"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  {t("home")}
                </Link>
                <Link
                  href="/blog"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  {t("blog")}
                </Link>
                <Link
                  href="/about"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  {t("about")}
                </Link>
              </nav>
              <LocaleSwitcher locale={locale} />
            </header>
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
