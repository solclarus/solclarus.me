"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";

export function OnlyUp() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Button
      className="size-10 shrink-0 cursor-pointer rounded-full"
      onClick={scrollToTop}
      variant="ghost"
      size="icon"
      asChild
    >
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <ArrowUp className="size-4" />
      </motion.button>
    </Button>
  );
}
