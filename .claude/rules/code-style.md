# Code Style

## TypeScript

- Use `type` over `interface` unless extending
- Prefer explicit return types for exported functions
- Use `import type` for type-only imports
- Always use absolute imports with `@/` prefix (e.g., `@/lib/config`)

## React

- Prefer Server Components; use `"use client"` only when necessary
- Destructure props in function parameters
- Use named exports for components

## Tailwind CSS

- Use Tailwind v4 syntax (no tailwind.config.js)
- Dark mode: use `dark:` prefix (system preference)
- Prefer semantic color names from design system

## Formatting

- oxfmt handles formatting (not Prettier)
- oxlint handles linting (not ESLint)
