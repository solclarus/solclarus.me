import { BookIcon, HomeIcon, UserIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
};

export const NAVIGATIONS: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    id: "blog",
    label: "Blog",
    icon: BookIcon,
    href: "/blog",
  },
  {
    id: "about",
    label: "About",
    icon: UserIcon,
    href: "/about",
  },
];
