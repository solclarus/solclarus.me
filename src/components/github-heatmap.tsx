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
  const monthLabels = new Map<number, string>();
  data.weeks.forEach((week, i) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;
    const date = new Date(firstDay.date);
    if (!Array.from(monthLabels.values()).includes(date.toLocaleString("en", { month: "short" }))) {
      monthLabels.set(i, date.toLocaleString("en", { month: "short" }));
    }
  });

  return (
    <a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block overflow-x-auto rounded-lg border border-border bg-card/50 p-4 transition-colors hover:bg-card"
    >
      <div className="flex gap-1">
        {data.weeks.map((week, i) => (
          <div key={i} className="flex flex-col gap-1">
            {week.contributionDays.map((day) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.contributionCount} contributions`}
                className={`size-2.5 rounded-sm ${getColor(day.contributionCount)}`}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {data.totalContributions.toLocaleString()} contributions in the last year
      </p>
    </a>
  );
}
