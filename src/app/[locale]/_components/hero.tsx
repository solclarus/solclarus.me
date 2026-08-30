import { GitHubIcon } from "@/components/icons";
import { siteConfig } from "@/lib/config";
import Image from "next/image";

type Props = {
  greeting: string;
  intro: string;
};

export function Hero({ greeting, intro }: Props) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-4">
        <Image
          src="/avatar.png"
          alt={siteConfig.author}
          width={64}
          height={64}
          className="rounded-full"
          priority
        />
        <h1 className="text-2xl font-bold text-foreground">{greeting}</h1>
      </div>
      <p className="leading-relaxed text-muted-foreground">{intro}</p>
      <div className="flex items-center gap-4 pt-2">
        <a
          href={siteConfig.social.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="inline-flex items-center rounded-lg border border-border bg-card/50 p-2 text-sm text-muted-foreground transition-all hover:-translate-y-0.5 hover:bg-card hover:text-foreground hover:shadow-sm"
        >
          <GitHubIcon className="size-4" />
        </a>
      </div>
    </section>
  );
}
