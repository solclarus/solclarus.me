import type { ContributionData } from "@/lib/github";

type Props = {
  data: ContributionData;
  username: string;
};

function getColor(count: number): string {
  if (count === 0) return "bg-secondary";
  if (count <= 3) return "bg-green-200 dark:bg-green-900";
  if (count <= 6) return "bg-green-400 dark:bg-green-700";
  if (count <= 9) return "bg-green-600 dark:bg-green-500";
  return "bg-green-700 dark:bg-green-400";
}

export function GitHubHeatmap({ data, username }: Props) {
  const months: { label: string; weekIndex: number }[] = [];
  data.weeks.forEach((week, i) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;
    const date = new Date(firstDay.date);
    if (date.getDate() <= 7) {
      months.push({
        label: date.toLocaleString("en", { month: "short" }),
        weekIndex: i,
      });
    }
  });

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Month labels */}
          <div className="mb-1 flex gap-[3px] pl-0">
            {data.weeks.map((_, i) => {
              const month = months.find((m) => m.weekIndex === i);
              return (
                <div key={i} className="w-[10px] text-[9px] text-muted-foreground">
                  {month?.label ?? ""}
                </div>
              );
            })}
          </div>
          {/* Grid */}
          <div className="flex gap-[3px]">
            {data.weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.contributionDays.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.contributionCount} contributions`}
                    className={`size-[10px] rounded-sm ${getColor(day.contributionCount)}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground"
        >
          {data.totalContributions.toLocaleString()} contributions in the last year
        </a>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="flex gap-[3px]">
            {[0, 2, 5, 8, 11].map((n) => (
              <div key={n} className={`size-[10px] rounded-sm ${getColor(n)}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
