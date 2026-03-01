import { FloatingMenu } from "@/components/floating-menu";
import { WebsiteJsonLd } from "@/components/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { NAVIGATIONS } from "@/config/navigation";
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

  const navItems = NAVIGATIONS.map((nav) => ({
    href: nav.href,
    label: t(nav.id as "home" | "blog" | "about"),
  }));

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <WebsiteJsonLd locale={locale} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <div className="flex min-h-screen flex-col">
              <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-24 md:px-6">
                <main>{children}</main>
              </div>
            </div>

            <FloatingMenu />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
