# solclarus.me

🌐 https://solclarus.me

Personal site and blog, built with Next.js 16.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** / **TypeScript**
- **Tailwind CSS v4** + [shadcn](https://ui.shadcn.com) (base-ui)
- **next-intl** — i18n routing for `ja` / `en`
- **MDX** — blog posts under `content/posts/<locale>/*.mdx`
- **oxlint** / **oxfmt** — lint & format
- **lefthook** — git hooks (format + lint on commit, commitlint on commit message, typecheck + build on push)
- **vitest** — unit tests

## Development

```bash
pnpm install
pnpm dev
```

### Environment Variables

```bash
# .env.local
GITHUB_TOKEN=   # read:user — for the GitHub contributions heatmap on the home page
```

## Commands

```bash
pnpm dev          # dev server
pnpm build        # production build
pnpm analyze      # production build with bundle analyzer (ANALYZE=true)
pnpm lint         # oxlint
pnpm format       # oxfmt --write
pnpm typecheck    # tsc --noEmit
pnpm test         # vitest run
pnpm test:e2e     # playwright (navigation + axe-core a11y checks)
pnpm lhci         # Lighthouse CI against a production build
```

## Structure

- `src/app/[locale]/` — i18n-routed pages (home, posts, works)
- `src/app/(lab)/` — standalone experiment pages, outside i18n routing. Each project colocates its own components under `_components/`
- `src/config/` — site config, nav, and the `WORKS` list (portfolio + lab entries)
- `content/posts/<locale>/` — MDX blog posts

## Branching & commits

`main` is protected by a GitHub ruleset (no direct pushes, no force-push/delete, required PR, required
`check`/`e2e` status checks) that nobody — including the repo owner — can bypass. All changes go
through a branch + PR.

Branch names follow `<type>/<short-description>`, matching the commit types below (e.g. `feat/add-comment-form`).

Commits follow [Conventional Commits](https://www.conventionalcommits.org/) and are checked by
commitlint (via lefthook's `commit-msg` hook locally, and again in CI).

## License

MIT
