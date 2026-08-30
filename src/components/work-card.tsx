"use client";

import { GitHubIcon } from "@/components/icons";
import { WorkStatusBadge } from "@/components/work-status-badge";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/config/works";

function getFaviconUrl(url: string): string {
  const domain = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
}

function slugifyTech(tech: string): string {
  return tech.toLowerCase().replace(/\s+/g, "");
}

type Props = {
  work: Work;
  locale: string;
};

export function WorkCard({ work, locale }: Props) {
  const isInternalUrl = work.url?.startsWith("/");

  return (
    <motion.article
      whileHover={{ x: 3 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative rounded-none border border-border bg-card/40 font-mono transition-colors duration-300 hover:border-brand/50 hover:shadow-[0_0_16px_-6px_var(--brand)]"
    >
      <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-3 py-1.5">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-destructive/50" />
          <span className="size-2 rounded-full bg-amber-500/50" />
          <span className="size-2 rounded-full bg-brand/50" />
        </div>
        <span className="truncate text-[11px] text-muted-foreground">~/works/{work.id}</span>
        <div className="ml-auto shrink-0">
          <WorkStatusBadge status={work.status} />
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2">
          {work.favicon || (work.url && !isInternalUrl) ? (
            <Image
              src={work.favicon ?? getFaviconUrl(work.url!)}
              alt=""
              width={16}
              height={16}
              className="size-4 rounded-sm"
              unoptimized
            />
          ) : work.github ? (
            <GitHubIcon className="size-4 shrink-0 text-muted-foreground" />
          ) : null}
          <h2 className="font-heading font-semibold text-foreground">
            <span className="text-brand">$</span> {work.name}
            <span className="ml-0.5 inline-block h-[0.9em] w-[0.5ch] translate-y-0.5 animate-pulse bg-brand align-middle opacity-0 group-hover:opacity-100" />
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="text-brand/70">#</span> {work.description[locale as "ja" | "en"]}
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground/80">
          {work.tech.map((tech) => (
            <span key={tech}>#{slugifyTech(tech)}</span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-1 text-xs">
          {work.github && (
            <a
              href={work.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-brand"
            >
              [ code ]
            </a>
          )}
          {work.url &&
            (isInternalUrl ? (
              <Link
                href={work.url}
                className="text-muted-foreground transition-colors hover:text-brand"
              >
                [ visit ]
              </Link>
            ) : (
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-brand"
              >
                [ visit ]
              </a>
            ))}
        </div>
      </div>
    </motion.article>
  );
}
