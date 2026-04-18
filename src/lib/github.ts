import { unstable_cache } from "next/cache";

type ContributionDay = {
  date: string;
  contributionCount: number;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export type ContributionData = {
  weeks: ContributionWeek[];
  totalContributions: number;
};

async function fetchContributions(username: string): Promise<ContributionData | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username } }),
    });

    if (!res.ok) return null;

    const json = await res.json();
    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    return {
      weeks: calendar.weeks,
      totalContributions: calendar.totalContributions,
    };
  } catch {
    return null;
  }
}

export const getGitHubContributions = unstable_cache(fetchContributions, ["github-contributions"], {
  revalidate: 3600,
});
