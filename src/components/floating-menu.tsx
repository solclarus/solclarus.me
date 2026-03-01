"use client";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { OnlyUp } from "@/components/only-up";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { NAVIGATIONS } from "@/config/navigation";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function FloatingMenu() {
  const [isExpanded, setIsExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <motion.div
        ref={menuRef}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex items-center gap-1 rounded-full border border-border/60 bg-card/95 px-2 py-2 shadow-xl shadow-black/5 backdrop-blur-md dark:shadow-black/20"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="size-10 shrink-0 cursor-pointer rounded-full"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="size-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="size-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="flex items-center overflow-hidden"
            >
              <div className="flex items-center gap-1 pr-1">
                {NAVIGATIONS.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15, delay: index * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href={item.href} onClick={() => setIsExpanded(false)}>
                      <Button
                        variant={isActive(item.href) ? "secondary" : "ghost"}
                        size="icon"
                        className="size-10 cursor-pointer rounded-full"
                      >
                        <item.icon className="size-4" />
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mx-1 h-6 w-px bg-border" />

        <ThemeSwitcher />
        <LocaleSwitcher />
        <OnlyUp />
      </motion.div>
    </nav>
  );
}
