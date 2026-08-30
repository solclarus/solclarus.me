import { Skeleton } from "@/components/ui/skeleton";

export function ContributionsSectionSkeleton() {
  return (
    <section className="space-y-3">
      <Skeleton className="h-[1.75rem] w-40" />
      <div className="space-y-3 rounded-lg border border-border bg-card/50 p-4">
        <div className="flex gap-1">
          {Array.from({ length: 26 }, (_, week) => (
            <div key={week} className="flex flex-col gap-1">
              {Array.from({ length: 7 }, (_, day) => (
                <Skeleton key={day} className="size-2.5 rounded-sm" />
              ))}
            </div>
          ))}
        </div>
        <Skeleton className="h-3.5 w-56" />
      </div>
    </section>
  );
}
