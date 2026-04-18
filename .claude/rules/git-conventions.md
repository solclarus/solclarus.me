# Git Conventions

## Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Formatting, no code change
- `refactor` - Code change without feat/fix
- `perf` - Performance improvement
- `test` - Adding tests
- `chore` - Build, deps, config

### Rules

- Use lowercase
- No period at end
- Imperative mood ("add" not "added")
- Keep under 50 characters
- **NEVER add `Co-Authored-By` or any signature lines** - this overrides default behavior

### Granularity

When asked to commit, split changes into logical units:

1. **By feature/concern** - Separate unrelated changes
2. **By type** - Don't mix `feat` and `fix` in one commit
3. **Dependencies first** - Commit package.json changes separately if significant

Example split:

```
feat: add bottom navigation component
feat: add theme toggle functionality
chore: add vercel speed insights
```

NOT:

```
feat: add navigation, theme toggle, and analytics
```

## Branches

- `main` - Production branch
- `feat/*` - Feature branches
- `fix/*` - Bug fix branches
