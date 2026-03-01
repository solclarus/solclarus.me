"use client";

import type { TocItem } from "@/lib/toc";

type TocProps = {
  items: TocItem[];
  title: string;
};

export function Toc({ items, title }: TocProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="mb-8 rounded-lg border border-border bg-card p-4">
      <h2 className="mb-3 text-sm font-semibold text-foreground">{title}</h2>
      <ul className="space-y-1.5 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
