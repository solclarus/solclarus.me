import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

type Props = {
  href: string;
  label: string;
};

export function ViewAllLink({ href, label }: Props) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {label}
      <ArrowRight className="size-3.5" />
    </Link>
  );
}
