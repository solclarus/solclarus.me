"use client";

import {
  BunIcon,
  DockerIcon,
  FigmaIcon,
  GitIcon,
  GoIcon,
  JavaScriptIcon,
  NextjsIcon,
  NodejsIcon,
  PostgreSQLIcon,
  PythonIcon,
  ReactIcon,
  SupabaseIcon,
  SwiftIcon,
  TailwindIcon,
  TypeScriptIcon,
  VercelIcon,
  VimIcon,
  VSCodeIcon,
} from "@/components/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const SKILL_GROUPS = [
  {
    label: "Frontend",
    skills: [
      { name: "JavaScript", icon: JavaScriptIcon, color: "#F7DF1E" },
      { name: "TypeScript", icon: TypeScriptIcon, color: "#3178C6" },
      { name: "React", icon: ReactIcon, color: "#61DAFB" },
      { name: "Next.js", icon: NextjsIcon, color: "currentColor" },
      { name: "Tailwind CSS", icon: TailwindIcon, color: "#06B6D4" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", icon: NodejsIcon, color: "#5FA04E" },
      { name: "Bun", icon: BunIcon, color: "#fbf0df" },
      { name: "Python", icon: PythonIcon, color: "#3776AB" },
      { name: "Go", icon: GoIcon, color: "#00ADD8" },
      { name: "PostgreSQL", icon: PostgreSQLIcon, color: "#4169E1" },
      { name: "Supabase", icon: SupabaseIcon, color: "#3FCF8E" },
    ],
  },
  {
    label: "Mobile",
    skills: [{ name: "Swift", icon: SwiftIcon, color: "#F05138" }],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git", icon: GitIcon, color: "#F05032" },
      { name: "Docker", icon: DockerIcon, color: "#2496ED" },
      { name: "Vercel", icon: VercelIcon, color: "currentColor" },
      { name: "Vim", icon: VimIcon, color: "#019733" },
      { name: "VS Code", icon: VSCodeIcon, color: "#007ACC" },
      { name: "Figma", icon: FigmaIcon, color: "#F24E1E" },
    ],
  },
];

export function SkillsSection() {
  return (
    <section className="space-y-4">
      {SKILL_GROUPS.map((group) => (
        <div key={group.label} className="flex flex-wrap items-center gap-2">
          <span className="w-20 shrink-0 text-sm text-muted-foreground">{group.label}</span>
          {group.skills.map((skill) => (
            <Tooltip key={skill.name}>
              <TooltipTrigger asChild>
                <div className="cursor-default p-1 transition-all duration-300 hover:-translate-y-0.5">
                  <skill.icon className="size-5" style={{ color: skill.color }} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{skill.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      ))}
    </section>
  );
}
