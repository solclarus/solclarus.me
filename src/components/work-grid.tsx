import { WorkCard } from "@/components/work-card";
import type { Work } from "@/config/works";

type Props = {
  works: Work[];
  locale: string;
};

export function WorkGrid({ works, locale }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {works.map((work) => (
        <WorkCard key={work.id} work={work} locale={locale} />
      ))}
    </div>
  );
}
