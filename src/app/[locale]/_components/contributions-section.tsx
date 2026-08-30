import { GitHubHeatmap } from "@/components/github-heatmap";
import type { ContributionData } from "@/lib/github";

type Props = {
  data: ContributionData;
  username: string;
};

export function ContributionsSection({ data, username }: Props) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">Contributions</h2>
      <GitHubHeatmap data={data} username={username} />
    </section>
  );
}
