# Tech Stack

## Core Technologies

- **Build Tool**: Vite 5.4+ with SWC plugin for fast React compilation
- **Framework**: React 18.3+ with TypeScript 5.8+
- **Styling**: Tailwind CSS 3.4+ with custom design tokens
- **UI Components**: shadcn-ui (Radix UI primitives)
- **Routing**: React Router DOM 6.30+
- **State Management**: TanStack Query 5.83+ for server state
- **Animations**: Framer Motion 12.23+
- **Icons**: Lucide React, Tabler Icons, React Icons

## Key Libraries

- **Forms**: React Hook Form with Zod validation
- **i18n**: Custom LanguageContext with translations for PT/EN/ES
- **Theming**: next-themes for dark mode support
- **Notifications**: Sonner for toast notifications
- **Date Handling**: date-fns

## Development Tools

- **Linting**: ESLint 9+ with TypeScript ESLint
- **Package Manager**: npm (primary), with pnpm/bun lockfiles present
- **Dev Server**: Vite dev server on port 8080

## Common Commands

```bash
# Development
npm run dev              # Start dev server on localhost:8080

# Build
npm run build            # Production build
npm run build:dev        # Development build

# Quality
npm run lint             # Run ESLint
npm run preview          # Preview production build
```

## Path Aliases

- `@/*` maps to `./src/*` for clean imports

## TypeScript Configuration

- `noImplicitAny: false` - Allows implicit any types
- `noUnusedParameters: false` - Doesn't enforce unused parameter checks
- `strictNullChecks: false` - Relaxed null checking
- `skipLibCheck: true` - Skips type checking of declaration files
