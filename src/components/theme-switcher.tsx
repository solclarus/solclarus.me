"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const MotionMoon = motion.create(Moon);
const MotionSun = motion.create(Sun);

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-10 shrink-0 rounded-full">
        <span className="size-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="size-10 shrink-0 cursor-pointer rounded-full"
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <MotionMoon
            key="moon"
            className="size-4 text-orange-300"
            initial={{ opacity: 0, scale: 0.2, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.2, rotate: 180 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <MotionSun
            key="sun"
            className="size-4 text-orange-500"
            initial={{ opacity: 0, scale: 0.2, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.2, rotate: 180 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </Button>
  );
}
