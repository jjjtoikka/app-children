# Children's App - Tech Stack

## Overview

A web-based application designed for children, prioritizing playful interaction, accessibility, and maintainability.

## Core Technologies

- **Framework:** [React Router](https://reactrouter.com/) v8 (SSR)
- **Language:** TypeScript
- **UI Library:** React (^19.2.7)
- **Styling Engine:** [Panda CSS](https://panda-css.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Architecture Decisions

### Why Not React Native?

This is a **web application** targeting browsers (desktop, tablet, mobile web). React Native is only necessary if building a true native iOS/Android app requiring device-specific APIs (camera, accelerometer, native notifications). For a children's web app, React web is the correct choice. Future distribution via app stores can be achieved through a Progressive Web App (PWA) wrapper or tools like Capacitor if needed.

### Why React Router + SSR?

- **Performance:** Server-side rendering delivers fully rendered HTML instantly, crucial for user experience.
- **SEO:** Better indexing for any public-facing content.
- **Zero-Config Styling:** Panda CSS handles style extraction and injection automatically at build time via PostCSS. Unlike traditional CSS-in-JS libraries (e.g., styled-components), **no manual SSR configuration is required**.

### Why Panda CSS?

- **Build-time Atomic CSS:** Generates type-safe, atomic CSS classes with zero runtime overhead.
- **Design Tokens:** Native support for theming, semantic tokens, and design system constraints.
- **Universal Compatibility:** Works seamlessly with React Router, Next.js, Astro, Vite, and any pipeline supporting PostCSS.

### Why Ark UI?

Since the Park UI CLI had interactive prompt issues in this environment, we are using **Ark UI** directly as the headless component foundation, styled with Panda CSS recipes.

- **Headless Foundation:** [Ark UI](https://ark-ui.com/) provides robust, accessible, and unstyled primitives.
- **Full Customizability:** Complete control over styling and behavior with Panda CSS `cva` (class variance authority).
- **SSR Safe:** Standard React components styled with Panda CSS classes, fully compatible with server-side rendering.

## Package Manager

This project uses **Bun** for fast installs and runtime.

```bash
bun install
```

## Development Scripts

```bash
# Start development server
bun run dev

# Create production build
bun run build

# Type check
bun run typecheck

# Start production server
bun run start

# Watch Panda CSS for changes
bun run panda:watch
```

## Project Structure

```
├── app/
│   ├── components/
│   │   └── ui/           # Reusable UI components (Button, Card, etc.)
│   ├── lib/
│   │   └── utils.ts      # Utility functions (cn, clsx)
│   ├── routes/
│   │   └── home.tsx      # Home page route
│   ├── welcome/          # (Template remnants - can be removed)
│   ├── app.css           # Global styles + Panda layers
│   ├── root.tsx          # Root layout component
│   └── routes.ts         # Route configuration
├── design.md             # Design system tokens & guidelines
├── panda.config.ts       # Panda CSS configuration with theme tokens
├── postcss.config.cjs    # PostCSS configuration
├── styled-system/        # Generated Panda CSS output (do not edit)
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Design System

The visual identity is documented in `design.md`. Key design tokens are configured in `panda.config.ts`:

- **Colors:** Primary (orange), Secondary (sky blue), Semantic (success, warning, error, info), Neutral (gray scale)
- **Typography:** Nunito (body), Fredoka (display), Fira Code (monospace)
- **Spacing:** Tailored for large touch targets and generous whitespace
- **Radii:** Large rounded corners (1rem - 2rem) for friendly, approachable feel
- **Shadows:** Soft shadows with primary color glow for interactive elements

## Getting Started

1. Install dependencies:
   ```bash
   bun install
   ```

2. Generate Panda CSS system:
   ```bash
   bun run prepare
   ```

3. Start development server:
   ```bash
   bun run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173)

## Future Considerations

- **PWA:** Wrap the web app for offline use and app-like experience on mobile devices.
- **Native Bridge:** Evaluate Capacitor or React Native only if specific native device features become a hard requirement.
- **Google Stitch:** Design tokens can be updated from Stitch exports by modifying `panda.config.ts`.
