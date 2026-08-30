import { ViewAllLink } from "@/components/view-all-link";
import { WorkGrid } from "@/components/work-grid";
import type { Work } from "@/config/works";

type Props = {
  title: string;
  viewAllLabel: string;
  works: Work[];
  locale: string;
};

export function FeaturedWorksSection({ title, viewAllLabel, works, locale }: Props) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <ViewAllLink href="/works" label={viewAllLabel} />
      </div>
      <WorkGrid works={works} locale={locale} />
    </section>
  );
}
