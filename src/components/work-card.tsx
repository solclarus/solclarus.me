import { GitHubIcon } from "@/components/icons";
import { Globe } from "lucide-react";
import Image from "next/image";
import type { Work, WorkStatus } from "@/config/works";

function getFaviconUrl(url: string): string {
  const domain = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
}

function StatusBadge({ status }: { status: WorkStatus }) {
  const config = {
    live: {
      label: "Live",
      dotClass: "bg-green-500",
      textClass: "text-green-600 dark:text-green-400",
    },
    building: {
      label: "Building",
      dotClass: "bg-amber-500",
      textClass: "text-amber-600 dark:text-amber-400",
    },
    archived: {
      label: "Archived",
      dotClass: "bg-muted-foreground",
      textClass: "text-muted-foreground",
    },
  };

  const { label, dotClass, textClass } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${textClass}`}>
      <span className="relative flex size-2">
        {status === "live" && (
          <span
            className={`absolute inline-flex size-full animate-ping rounded-full ${dotClass} opacity-75`}
          />
        )}
        <span className={`relative inline-flex size-2 rounded-full ${dotClass}`} />
      </span>
      {label}
    </span>
  );
}

type Props = {
  work: Work;
  locale: string;
};

export function WorkCard({ work, locale }: Props) {
  return (
    <article className="group relative rounded-lg border border-border bg-card/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:bg-card hover:shadow-md">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {work.favicon || work.url ? (
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
            <h2 className="font-semibold text-foreground">{work.name}</h2>
          </div>
          <StatusBadge status={work.status} />
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {work.description[locale as "ja" | "en"]}
        </p>

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
          {work.url && (
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Globe className="size-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
