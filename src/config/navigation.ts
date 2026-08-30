import { BookIcon, FolderIcon, HomeIcon } from "lucide-react";
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
    id: "posts",
    label: "Posts",
    icon: BookIcon,
    href: "/posts",
  },
  {
    id: "works",
    label: "Works",
    icon: FolderIcon,
    href: "/works",
  },
];
