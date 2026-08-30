import type { WorkStatus } from "@/config/works";

const STATUS_CONFIG: Record<WorkStatus, { label: string; textClass: string; pulse?: boolean }> = {
  live: {
    label: "live",
    textClass: "text-brand",
    pulse: true,
  },
  building: {
    label: "building",
    textClass: "text-amber-600 dark:text-amber-400",
  },
  archived: {
    label: "archived",
    textClass: "text-muted-foreground",
  },
};

type Props = {
  status: WorkStatus;
};

export function WorkStatusBadge({ status }: Props) {
  const { label, textClass, pulse } = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono text-[11px] tracking-wide ${textClass}`}
    >
      <span className="text-muted-foreground/60">[</span>
      {pulse && <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-brand" />}
      {label}
      <span className="text-muted-foreground/60">]</span>
    </span>
  );
}
