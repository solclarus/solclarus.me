"use client";

import { GitHubIcon } from "@/components/icons";
import { WorkStatusBadge } from "@/components/work-status-badge";
import { Globe } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/config/works";

function getFaviconUrl(url: string): string {
  const domain = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
}

type Props = {
  work: Work;
  locale: string;
};

export function WorkCard({ work, locale }: Props) {
  const isInternalUrl = work.url?.startsWith("/");

  return (
    <motion.article
      tabIndex={0}
      whileHover={{ x: 3 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative rounded-lg border border-border bg-card/50 p-4 transition-colors duration-300 outline-none hover:border-brand/40 hover:bg-card hover:shadow-md focus-visible:border-brand/40 focus-visible:bg-card"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
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
            <h2 className="font-heading font-semibold text-foreground">{work.name}</h2>
          </div>
          <WorkStatusBadge status={work.status} />
        </div>

        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr]">
          <p className="overflow-hidden text-sm leading-relaxed text-muted-foreground">
            {work.description[locale as "ja" | "en"]}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {work.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-1">
          {work.github && (
            <a
              href={work.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Source"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <GitHubIcon className="size-4" />
            </a>
          )}
          {work.url &&
            (isInternalUrl ? (
              <Link
                href={work.url}
                aria-label="Visit"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Globe className="size-4" />
              </Link>
            ) : (
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Globe className="size-4" />
              </a>
            ))}
        </div>
      </div>
    </motion.article>
  );
}
