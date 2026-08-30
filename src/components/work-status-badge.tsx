import type { WorkStatus } from "@/config/works";

const STATUS_CONFIG: Record<WorkStatus, { label: string; dotClass: string; textClass: string }> = {
  live: {
    label: "Live",
    dotClass: "bg-brand",
    textClass: "text-brand",
  },
  building: {
    label: "Building",
    dotClass: "bg-amber-500",
    textClass: "text-amber-700 dark:text-amber-400",
  },
  archived: {
    label: "Archived",
    dotClass: "bg-muted-foreground",
    textClass: "text-muted-foreground",
  },
};

type Props = {
  status: WorkStatus;
};

export function WorkStatusBadge({ status }: Props) {
  const { label, dotClass, textClass } = STATUS_CONFIG[status];

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
