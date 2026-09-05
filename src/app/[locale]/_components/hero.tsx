"use client";

import { GitHubIcon } from "@/components/icons";
import { siteConfig } from "@/lib/config";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  greeting: string;
  intro: string;
};

export function Hero({ greeting, intro }: Props) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-4">
        <Avatar />
        <TypewriterHeading greeting={greeting} />
      </div>
      <p className="leading-relaxed text-muted-foreground">{intro}</p>
      <div className="flex items-center gap-4 pt-2">
        <motion.a
          href={siteConfig.social.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center rounded-none border border-border bg-card/50 p-2 text-sm text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
        >
          <GitHubIcon className="size-4" />
        </motion.a>
      </div>
    </section>
  );
}

function Avatar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="relative shrink-0 border border-brand/60 p-1"
    >
      <Image
        src="/avatar.png"
        alt={siteConfig.author}
        width={64}
        height={64}
        className="relative size-16 rounded-none object-cover"
        priority
      />
      <span className="absolute -top-1 -left-1 size-1.5 border-t border-l border-brand" />
      <span className="absolute -right-1 -bottom-1 size-1.5 border-r border-b border-brand" />
    </motion.div>
  );
}

function TypewriterHeading({ greeting }: { greeting: string }) {
  const [chars, setChars] = useState(0);

  useEffect(() => {
    setChars(0);
    const interval = setInterval(() => {
      setChars((c) => {
        if (c >= greeting.length) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 35);
    return () => clearInterval(interval);
  }, [greeting]);

  return (
    <h1 className="font-heading text-xl font-medium text-foreground">
      <span className="text-brand">{"> "}</span>
      {greeting.slice(0, chars)}
      <span className="ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-0.5 animate-pulse bg-brand align-middle" />
    </h1>
  );
}
