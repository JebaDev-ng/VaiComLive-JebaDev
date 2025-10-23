# Project Structure

## Directory Organization

```
src/
├── components/          # React components
│   ├── ui/             # shadcn-ui components (50+ components)
│   ├── Hero.tsx        # Landing hero section
│   ├── Navbar.tsx      # Navigation with language selector
│   ├── Footer.tsx      # Site footer
│   ├── Objetivos.tsx   # Goals section
│   ├── Veiculos.tsx    # Platforms section
│   ├── Transmissoes.tsx # Streams section
│   ├── Dados.tsx       # Data/metrics section
│   ├── Parcerias.tsx   # Partnerships section
│   ├── Contato.tsx     # Contact section
│   └── PageLoader.tsx  # Loading component
├── pages/              # Route pages
│   ├── Index.tsx       # Main landing page
│   ├── NotFound.tsx    # 404 page
│   └── BgTest.tsx      # Background testing page
├── i18n/               # Internationalization
│   ├── LanguageContext.tsx  # Language provider
│   ├── translations.ts      # All translations (PT/EN/ES)
│   └── README.md           # i18n documentation
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── App.tsx             # Root app component
├── main.tsx            # Entry point
└── index.css           # Global styles & design tokens

public/
├── Assets/             # Static assets organized by section
│   ├── Assets-hero/    # Hero section assets
│   ├── LOGO/          # Brand logos
│   └── ...            # Other section assets
└── fonts/             # Custom fonts (ThunderhousePro, NTailub)

docs/                   # Project documentation
```

## Component Patterns

### Section Components

- Each major section is a standalone component (Hero, Objetivos, etc.)
- Sections use `min-h-screen` for full viewport height
- Responsive flex layouts: two-column desktop, stacked mobile
- Background images applied via SVG assets

### UI Components

- Located in `src/components/ui/`
- Based on shadcn-ui patterns (Radix UI + Tailwind)
- Reusable, accessible, and themeable
- Import from `@/components/ui/[component-name]`

### Internationalization

- Use `useLanguage()` hook from `@/i18n/LanguageContext`
- Access translations via `t.section.key` pattern
- All text content must be translatable (PT/EN/ES)
- Language persists in localStorage

## Styling Conventions

### Design Tokens

- Colors defined as HSL CSS variables in `src/index.css`
- Custom fonts registered via `@font-face`
- Tailwind extended with custom animations and utilities
- Use semantic color names: `primary`, `secondary`, `accent`, etc.

### Custom Fonts

- `font-hero-display`: ThunderhousePro for titles
- `font-hero-body`: NTailub for body text
- Always use `font-display: swap` for performance

### Layout Rules

- No gaps between sections (continuous backgrounds)
- Generous padding: `px-4 sm:px-6 md:px-10 lg:px-16`
- Max content width: ~1200px
- Responsive breakpoints follow Tailwind defaults

## Routing

- Client-side routing with React Router DOM
- Routes defined in `App.tsx`
- Custom routes must be added ABOVE the catch-all `*` route
- 404 handled by `NotFound` component

## Asset Management

- Assets organized by section in `public/Assets/`
- SVG preferred for logos and graphics
- Use descriptive alt text for accessibility
- Lazy load images when appropriate

## State Management

- Server state: TanStack Query
- UI state: React hooks (useState, useReducer)
- Global state: Context API (LanguageContext)
- Form state: React Hook Form

## Animation Patterns

- Framer Motion for complex animations
- Custom Tailwind animations for simple effects
- Scroll-based parallax using `useScroll` and `useTransform`
- Stagger animations for list items
