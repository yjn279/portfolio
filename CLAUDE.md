# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
pnpm dev

# Type checking
pnpm typecheck

# Production build
pnpm build

# Deploy to Cloudflare Workers
pnpm deploy

# Add shadcn/ui components
pnpm dlx shadcn@latest add [component-name]
```

## Architecture Overview

This is a **Flight YJN279 Portfolio** - a modern portfolio site built with React Router v7 and deployed to Cloudflare Workers.

### Core Stack
- **Framework**: React Router v7 with SSR enabled
- **Runtime**: Cloudflare Workers (edge deployment)
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Build**: Vite + TypeScript
- **Package Manager**: pnpm (managed by Volta)

### Key Architecture Patterns

1. **File-based Routing**: Routes defined in `app/routes.ts` with components in `app/routes/`
   - Index route: `home.tsx`
   - Static routes: `projects.tsx`, `articles.tsx`, `profile.tsx`

2. **Component Organization**:
   - UI components: `app/components/ui/` (shadcn/ui based)
   - Page components: `app/routes/`
   - Utilities: `app/lib/utils.ts`

3. **Styling System**:
   - Global styles in `app/app.css`
   - Custom CSS variables for theme colors
   - Radix UI primitives for accessibility
   - Tailwind utility classes throughout

4. **Deployment Architecture**:
   - Entry point: `workers/app.ts`
   - Cloudflare Workers configuration in `wrangler.jsonc`
   - SSR with React Router v7's Cloudflare adapter

### Import Aliases
- Use `@/*` to import from the app directory
- Example: `import { Button } from "@/components/ui/button"`

## Development Workflow

- Use pnpm exclusively (Volta manages Node.js v24.1.0)
- Conventional commit format preferred
- TypeScript strict mode enabled
- Error boundaries implemented in `root.tsx`
- Font: Inter via Google Fonts preconnect

## Cloudflare Integration

- Workers runtime with environment variables in `wrangler.jsonc`
- Type generation via `pnpm cf-typegen`
- SSR enabled through React Router v7's Cloudflare adapter
- Future flag: `unstable_viteEnvironmentApi: true`
