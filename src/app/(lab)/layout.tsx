import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/lib/config";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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

export const metadata: Metadata = {
  title: {
    default: "Lab",
    template: `%s | Lab | ${siteConfig.author}`,
  },
  description: "Experiments and playgrounds.",
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur">
                <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 md:px-6">
                  <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                    ← {siteConfig.author}
                  </Link>
                  <ThemeSwitcher />
                </div>
              </header>
              <main className="flex-1">{children}</main>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
