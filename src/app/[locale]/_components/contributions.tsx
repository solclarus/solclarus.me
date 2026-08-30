import { ContributionsSection } from "@/app/[locale]/_components/contributions-section";
import { getGitHubContributions } from "@/lib/github";

type Props = {
  username: string;
};

export async function Contributions({ username }: Props) {
  const contributions = await getGitHubContributions(username);

  if (!contributions) return null;

  return <ContributionsSection data={contributions} username={username} />;
}
