"use client";

import type { TocItem } from "@/lib/toc";

interface TocProps {
  items: TocItem[];
  title: string;
}

export function Toc({ items, title }: TocProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="mb-8 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
            <a
              href={`#${item.id}`}
              className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
