# Children's App - Design System

## Design Strategy

The visual identity and component designs are generated using [Google Stitch](https://stitch.withgoogle.com/), an AI-powered design tool for creating cohesive design systems.

### Why Google Stitch?

- **Rapid Iteration:** Quickly generate and iterate on color palettes, typography scales, and component designs tailored for a playful, child-friendly aesthetic.
- **Design Tokens:** Outputs structured design data that can be directly translated into Panda CSS tokens.
- **Consistency:** Ensures visual harmony across all UI elements before implementation begins.

### Workflow

1. **Generate:** Use Stitch to create the initial design system (colors, typography, spacing, component styles).
2. **Export:** Extract design tokens (colors, font sizes, spacing values) from Stitch.
3. **Translate:** Map exported values into the `panda.config.ts` theme configuration.
4. **Implement:** Build components using Park UI primitives styled with the generated tokens.

## Design Tokens

Design tokens are the single source of truth for the application's visual properties. They are defined in `panda.config.ts` under the `theme` key.

### Colors

A children's app requires a vibrant, accessible, and gender-neutral palette.

#### Primary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--colors-primary-50` | `#fff7ed` | Lightest tint |
| `--colors-primary-100` | `#ffedd5` | Light backgrounds |
| `--colors-primary-200` | `#fed7aa` | Hover states |
| `--colors-primary-300` | `#fdba74` | Borders |
| `--colors-primary-400` | `#fb923c` | Accents |
| `--colors-primary-500` | `#f97316` | Primary actions |
| `--colors-primary-600` | `#ea580c` | Active states |
| `--colors-primary-700` | `#c2410c` | Text on light |
| `--colors-primary-800` | `#9a3412` | Dark text |
| `--colors-primary-900` | `#7c2d12` | Darkest shade |

#### Secondary Palette (Playful Accent)

| Token | Hex | Usage |
|-------|-----|-------|
| `--colors-secondary-50` | `#f0f9ff` | Lightest tint |
| `--colors-secondary-100` | `#e0f2fe` | Light backgrounds |
| `--colors-secondary-500` | `#0ea5e9` | Secondary actions |
| `--colors-secondary-600` | `#0284c7` | Active states |

#### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--colors-success` | `#22c55e` | Success states, positive feedback |
| `--colors-warning` | `#eab308` | Warnings, caution |
| `--colors-error` | `#ef4444` | Errors, destructive actions |
| `--colors-info` | `#3b82f6` | Informational elements |

#### Neutral Scale

| Token | Hex | Usage |
|-------|-----|-------|
| `--colors-gray-50` | `#f9fafb` | Page backgrounds |
| `--colors-gray-100` | `#f3f4f6` | Card backgrounds |
| `--colors-gray-200` | `#e5e7eb` | Borders, dividers |
| `--colors-gray-300` | `#d1d5db` | Disabled states |
| `--colors-gray-400` | `#9ca3af` | Placeholder text |
| `--colors-gray-500` | `#6b7280` | Secondary text |
| `--colors-gray-600` | `#4b5563` | Body text |
| `--colors-gray-700` | `#374151` | Headings |
| `--colors-gray-800` | `#1f2937` | Dark backgrounds |
| `--colors-gray-900` | `#111827` | Darkest elements |

### Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--fonts-sans` | `'Nunito', 'Comic Neue', sans-serif` | Primary UI font (friendly, rounded) |
| `--fonts-display` | `'Fredoka', 'Nunito', sans-serif` | Headlines, titles |
| `--fonts-mono` | `'Fira Code', monospace` | Code, numbers |

| Token | Value | Usage |
|-------|-------|-------|
| `--font-sizes-xs` | `0.75rem` (12px) | Fine print |
| `--font-sizes-sm` | `0.875rem` (14px) | Secondary text |
| `--font-sizes-md` | `1rem` (16px) | Body text |
| `--font-sizes-lg` | `1.125rem` (18px) | Lead text |
| `--font-sizes-xl` | `1.25rem` (20px) | Small headings |
| `--font-sizes-2xl` | `1.5rem` (24px) | H3 |
| `--font-sizes-3xl` | `1.875rem` (30px) | H2 |
| `--font-sizes-4xl` | `2.25rem` (36px) | H1 |
| `--font-sizes-5xl` | `3rem` (48px) | Display text |
| `--font-sizes-6xl` | `3.75rem` (60px) | Hero text |

| Token | Value | Usage |
|-------|-------|-------|
| `--font-weights-normal` | `400` | Body text |
| `--font-weights-medium` | `500` | Emphasis |
| `--font-weights-semibold` | `600` | Buttons, labels |
| `--font-weights-bold` | `700` | Headings |
| `--font-weights-extrabold` | `800` | Display |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-1` | `0.25rem` (4px) | Micro gaps |
| `--spacing-2` | `0.5rem` (8px) | Tight padding |
| `--spacing-3` | `0.75rem` (12px) | Small gaps |
| `--spacing-4` | `1rem` (16px) | Default padding |
| `--spacing-5` | `1.25rem` (20px) | Medium gaps |
| `--spacing-6` | `1.5rem` (24px) | Card padding |
| `--spacing-8` | `2rem` (32px) | Section gaps |
| `--spacing-10` | `2.5rem` (40px) | Large sections |
| `--spacing-12` | `3rem` (48px) | Page padding |
| `--spacing-16` | `4rem` (64px) | Hero spacing |

### Radii (Border Radius)

| Token | Value | Usage |
|-------|-------|-------|
| `--radii-sm` | `0.25rem` (4px) | Small elements |
| `--radii-md` | `0.5rem` (8px) | Buttons, inputs |
| `--radii-lg` | `1rem` (16px) | Cards, panels |
| `--radii-xl` | `1.5rem` (24px) | Large cards |
| `--radii-2xl` | `2rem` (32px) | Hero sections |
| `--radii-full` | `9999px` | Pills, avatars |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadows-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Subtle elevation |
| `--shadows-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1)` | Cards |
| `--shadows-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1)` | Modals |
| `--shadows-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1)` | Dropdowns |
| `--shadows-color` | `0 8px 24px -4px rgb(249 115 22 / 0.3)` | Primary glow |

## Component Design

### Buttons

Buttons should feel tactile and inviting for children.

- **Border Radius:** `--radii-full` (pill-shaped) or `--radii-lg`
- **Shadow:** `--shadows-md` with `--shadows-color` on hover
- **Sizes:** Large touch targets (min 48px height)
- **Variants:**
  - `solid`: Filled background with white text
  - `outline`: Bordered with transparent background
  - `ghost`: Minimal background change on interaction
  - `fun`: Extra bouncy with icon + text

### Cards

- **Border Radius:** `--radii-xl` or `--radii-2xl`
- **Shadow:** `--shadows-lg`
- **Padding:** `--spacing-6`
- **Background:** `--colors-gray-100` or white

### Inputs

- **Border Radius:** `--radii-lg`
- **Border:** `--colors-gray-200` default, `--colors-primary-400` focus
- **Shadow:** `--shadows-sm`, `--shadows-color` on focus
- **Font:** `--fonts-sans`, `--font-sizes-lg` (larger for readability)

## Accessibility Considerations

- **Color Contrast:** All text must meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text).
- **Touch Targets:** Minimum 44x44px for all interactive elements (preferably 48x48px).
- **Animation:** Respect `prefers-reduced-motion`. All animations must be optional.
- **Font Legibility:** Use rounded, friendly fonts but ensure clear letterforms (avoid ambiguous characters like "I" vs "l").
- **Cognitive Load:** Keep UI simple, consistent, and predictable.

## Animation Guidelines

- **Easing:** Use bouncy, playful easings like `cubic-bezier(0.34, 1.56, 0.64, 1)` for enter animations.
- **Durations:** Slightly longer than standard UI (300-500ms) to feel friendly.
- **Feedback:** Always provide visual feedback for interactions (scale on press, color change on hover).
- **Transitions:** Smooth state changes for all interactive elements.

## Token Mapping to Panda CSS

These tokens are implemented in `panda.config.ts`:

```typescript
import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // ... other config
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: {
            50: { value: '#fff7ed' },
            500: { value: '#f97316' },
            // ... etc
          },
          // ... etc
        },
        fonts: {
          sans: { value: "'Nunito', 'Comic Neue', sans-serif" },
          display: { value: "'Fredoka', 'Nunito', sans-serif" },
        },
        // ... etc
      },
    },
  },
})
```

## Notes

- This document should be updated whenever the Stitch design system is regenerated or modified.
- Export tokens from Stitch and update the corresponding values in `panda.config.ts`.
- Maintain consistency between the Stitch design files and the implemented tokens.
