# Solclarus Personal Site

Next.js 16 App Router + Tailwind CSS v4 + TypeScript

## Commands

```bash
bun run dev      # Start dev server
bun run build    # Production build
bun run lint     # Run oxlint
bun run format   # Run oxfmt
```

## Architecture

- `src/app/[locale]/` - Locale-based routing (ja/en)
- `src/i18n/` - next-intl configuration
- `src/messages/` - Translation JSON files
- `src/lib/` - Utility functions
- `content/blog/[locale]/` - MDX blog posts with frontmatter

## Key Patterns

- Use `Link` from `@/i18n/routing` for internal links (auto locale prefix)
- Use `getTranslations` in async Server Components, `useTranslations` in Client Components
- Blog posts use gray-matter for frontmatter + @mdx-js/mdx for rendering

## Rules

- @.claude/rules/code-style.md
- @.claude/rules/git-conventions.md
