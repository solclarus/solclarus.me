export type WorkStatus = "live" | "building" | "archived";

export type Work = {
  id: string;
  name: string;
  description: {
    ja: string;
    en: string;
  };
  tech: string[];
  github?: string;
  url?: string;
  status: WorkStatus;
};

export const WORKS: Work[] = [
  {
    id: "solclarus-me",
    name: "solclarus.me",
    description: {
      ja: "Next.js 16 と Tailwind CSS v4 で構築した個人サイト。MDXブログ、多言語対応、ダークモードを実装。",
      en: "Personal website built with Next.js 16 and Tailwind CSS v4. Features MDX blog, i18n support, and dark mode.",
    },
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    github: "https://github.com/solclarus/solclarus-me",
    url: "https://solclarus.me",
    status: "live",
  },
  {
    id: "jobcan-dashboard",
    name: "Jobcan Dashboard",
    description: {
      ja: "ジョブカンの勤怠データをグラフで可視化するダッシュボード。統計カード、出退勤チャート、月別統計を表示。",
      en: "Dashboard to visualize Jobcan attendance data with charts. Shows stats cards, work hours chart, and monthly statistics.",
    },
    tech: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Zustand"],
    github: "https://github.com/solclarus/jobcan-dashboard",
    url: "https://solclarus.github.io/jobcan-dashboard/",
    status: "live",
  },
  {
    id: "nowt",
    name: "Nowt",
    description: {
      ja: "Apple向けのミニマルな日記アプリ。感じたことをすぐに書き留められるシンプルなデザイン。",
      en: "A minimal diary app for Apple platforms. Designed to capture your feelings instantly with a simple interface.",
    },
    tech: ["Swift", "SwiftUI"],
    github: "https://github.com/solclarus/nowt",
    status: "building",
  },
];
