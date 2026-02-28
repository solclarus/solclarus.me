# solclarus.me

Personal website / Blog

🌐 **https://solclarus.me**

## Tech Stack

| Category         | Technology                   |
| ---------------- | ---------------------------- |
| Framework        | Next.js 16 (App Router)      |
| Language         | TypeScript                   |
| Styling          | Tailwind CSS v4              |
| i18n             | next-intl (Japanese/English) |
| Content          | MDX + gray-matter            |
| Linter/Formatter | oxlint / oxfmt               |
| Package Manager  | Bun                          |
| Hosting          | Vercel                       |

## Setup

```bash
# Clone the repository
git clone https://github.com/solclarus/solclarus-me.git
cd solclarus-me

# Install dependencies
bun install

# Start development server
bun run dev
```

Open http://localhost:3000 in your browser.

## Commands

```bash
bun run dev      # Start dev server
bun run build    # Production build
bun run start    # Start production server
bun run lint     # Run oxlint
bun run format   # Run oxfmt
```

## Directory Structure

```
solclarus-me/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/           # Locale-based routing (ja/en)
│   │   │   ├── layout.tsx      # Main layout
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── blog/           # Blog
│   │   │   └── about/          # About page
│   │   └── globals.css         # Global styles
│   ├── components/             # UI components
│   ├── i18n/                   # i18n configuration
│   ├── lib/                    # Utility functions
│   └── messages/               # Translation files (en.json, ja.json)
├── content/
│   └── blog/                   # Blog posts (MDX)
│       ├── en/
│       └── ja/
└── public/                     # Static files
```

## Architecture

### Internationalization (i18n)

Locale-based routing powered by **next-intl**.

```
/ja/blog/hello  → Japanese version
/en/blog/hello  → English version
```

```tsx
// Server Component
import { getTranslations } from "next-intl/server";
const t = await getTranslations("Home");

// Client Component
import { useTranslations } from "next-intl";
const t = useTranslations("Home");

// Internal links (auto locale prefix)
import { Link } from "@/i18n/routing";
<Link href="/blog">Blog</Link>;
```

### Layout

**Desktop (md and above):**

```
┌─────────────────────────────────┐
│  Home  Blog  About    🌙  EN/JA │  ← Header nav
├─────────────────────────────────┤
│            Content              │
└─────────────────────────────────┘
```

**Mobile:**

```
┌─────────────────────────────────┐
│            Content              │
├─────────────────────────────────┤
│    [🏠] [📝] [👤] │ [🌙] [🌐]    │  ← Floating nav
└─────────────────────────────────┘
```

### Blog

MDX files are placed in `content/blog/[locale]/`.

```mdx
---
title: "Post Title"
date: "2024-01-01"
description: "Post description"
---

## Heading

Body text...
```

**Processing pipeline:**

```
MDX file → gray-matter (frontmatter) → @mdx-js/mdx → rehype-pretty-code (syntax highlighting) → React Component
```

### Theme Toggle

1. Check localStorage on page load
2. Fall back to system preference (`prefers-color-scheme`)
3. Apply `dark` class to `<html>`
4. Use Tailwind's `dark:` prefix for styling

### SEO

- OpenGraph / Twitter cards
- JSON-LD structured data
- Auto-generated sitemap
- Dynamic OG image generation
- RSS feed (ja/en)

## Adding Blog Posts

1. Create `slug.mdx` in `content/blog/ja/`
2. Add frontmatter (title, date, description)
3. Write content in Markdown
4. Create the same file in `content/blog/en/` for English version

## Components

| File                  | Type   | Description                        |
| --------------------- | ------ | ---------------------------------- |
| `bottom-nav.tsx`      | Client | Mobile floating navigation         |
| `theme-toggle.tsx`    | Client | Dark/light mode toggle             |
| `locale-switcher.tsx` | Client | Language switcher (JA/EN)          |
| `toc.tsx`             | Client | Table of contents (auto-generated) |
| `json-ld.tsx`         | Server | SEO structured data                |

## License

MIT
