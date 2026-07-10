# Park UI + Panda CSS Agent Guide

## Project Stack

- **Framework**: React Router v8 (SSR)
- **Styling**: Panda CSS with Park UI preset
- **UI Components**: Park UI (built on Ark UI primitives)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Manager**: Bun

---

## Core Rules

1. **NEVER use plain HTML elements with inline `style` objects**
2. **NEVER use raw CSS classes or Tailwind utilities**
3. **ALWAYS use Park UI components from `~/components/ui`**
4. **ALWAYS use Panda CSS recipes, patterns, and `styled()` for styling**
5. **ALWAYS use `css()` for one-off atomic styles**

---

## Imports Cheat Sheet

```tsx
// Atomic styles → className
import { css } from "styled-system/css";

// Styled components
import { styled } from "styled-system/jsx";

// Layout patterns
import { flex, vstack, hstack, stack, circle, grid } from "styled-system/patterns";

// Recipes (Park UI components)
import { button, card, badge } from "styled-system/recipes";

// Ark UI headless primitives
import { ark } from "@ark-ui/react/factory";

// Park UI components
import { Button, Badge } from "~/components/ui";

// Framer Motion (wrap styled components)
import { motion } from "framer-motion";
```

---

## 1. `css()` — Atomic Styles

Use for one-off inline styles that don't need reusability.

```tsx
// CORRECT
<div className={css({ fontSize: "sm", color: "gray.500", mt: "0.5" })}>
  Hello
</div>

// INCORRECT — never do this
<div style={{ fontSize: "14px", color: "#6b7280", marginTop: "2px" }}>Hello</div>
```

### Advanced `css()` usage:

```tsx
// Responsive styles
className={css({
  fontSize: ["sm", "md", "lg"],       // mobile, tablet, desktop
  p: ["4", "6", "8"],
  gridTemplateColumns: ["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"],
})}

// Pseudo-selectors
className={css({
  _hover: { bg: "primary.100" },
  _disabled: { opacity: 0.5 },
  _focus: { ring: "2px", ringColor: "primary.500" },
})}

// Arbitrary selectors
className={css({
  '&[data-active="true"]': { bg: "primary.500" },
  '& > *': { margin: "2" },
})}

// Media queries
className={css({
  '@media (min-width: 768px)': { color: "red.300" },
})}
```

---

## 2. `styled()` — Reusable Styled Components

Use when you need a reusable component with base styles.

### Pattern A: Style an intrinsic element

```tsx
const Header = styled("header", {
  base: {
    bg: "white",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderColor: "gray.200",
    px: "6",
    py: "4",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
});

// Usage: <Header>content</Header>
```

### Pattern B: Wrap an existing component (including React Router Link)

```tsx
const IconButton = styled(Link, {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "full",
    bg: "gray.100",
    color: "gray.500",
    _hover: { bg: "gray.200" },
  },
});

// Usage: <IconButton to="/admin"><Settings /></IconButton>
```

### Pattern C: Wrap Framer Motion components

```tsx
const CurrentActivityBanner = styled(motion.div, {
  base: {
    borderRadius: "xl",
    px: "6",
    py: "4",
    textAlign: "center",
  },
});

// Usage with Framer Motion props:
// <CurrentActivityBanner initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
```

### Pattern D: Supercharged JSX elements (quick inline)

```tsx
import { styled } from "styled-system/jsx";

<styled.button bg="blue.500" color="white" py="2" px="4" rounded="md">
  Click me
</styled.button>
```

---

## 3. Patterns — Layout Shorthand

### `flex()` — Flexbox layout

```tsx
import { flex } from "styled-system/patterns";

// Page layout (full height column)
className={flex({ direction: "column", minH: "100vh", bg: "gray.50", gap: 0 })}

// Centered content
className={flex({ align: "center", justify: "center", p: "12", textAlign: "center" })}

// Activity list
className={flex({ direction: "column", gap: "3", align: "stretch" })}
```

### Available patterns:

| Pattern | Import | Properties |
|---------|--------|------------|
| `flex()` | `styled-system/patterns` | `direction`, `align`, `justify`, `wrap`, `gap`, `grow`, `shrink` |
| `vstack()` | `styled-system/patterns` | `gap`, `justify` (vertical stack) |
| `hstack()` | `styled-system/patterns` | `gap`, `align` (horizontal stack) |
| `stack()` | `styled-system/patterns` | `direction`, `gap` (generic stack) |
| `grid()` | `styled-system/patterns` | `columns`, `gap`, `minChildWidth` |
| `circle()` | `styled-system/patterns` | `size` (creates perfect circle) |
| `center()` | `styled-system/patterns` | `inline` (absolute center) |

### JSX component forms (from `styled-system/jsx`):

```tsx
import { Flex, VStack, HStack, Stack, Grid, Circle } from "styled-system/jsx";

<Flex direction="column" gap="4">
  <VStack gap="2" align="stretch">
    <HStack gap="4">
      <Circle size="40px" bg="primary.500" />
    </HStack>
  </VStack>
</Flex>
```

---

## 4. Recipes — Multi-Variant Styles

Recipes define components with multiple style variants.

### Using Park UI preset recipes (already generated in `styled-system/recipes`):

```tsx
import { button } from "styled-system/recipes";
import { styled } from "styled-system/jsx";
import { ark } from "@ark-ui/react/factory";

const BaseButton = styled(ark.button, button);
```

### Button variants (from Park UI preset):

| Variant | Use Case |
|---------|----------|
| `solid` (default) | Primary CTAs, high contrast |
| `outline` | Secondary actions |
| `ghost` | Low-emphasis actions |
| `subtle` | Tags, selected states |
| `plain` | Minimal styling |

```tsx
<Button variant="solid" size="lg" colorPalette="orange">
  Primary Action
</Button>

<Button variant="outline" size="md" colorPalette="orange">
  Secondary
</Button>

<Button variant="ghost" size="sm">
  Minimal
</Button>
```

### Button sizes:

| Size | Height | Use Case |
|------|--------|----------|
| `xs` | 32px | Small inline buttons |
| `sm` | 36px | Compact UI |
| `md` (default) | 40px | Standard buttons |
| `lg` | 44px | Prominent actions |
| `xl` | 48px | Touch-friendly |
| `2xl` | 64px | Hero CTAs |

---

## 5. Park UI Components

### Import from `~/components/ui`

```tsx
import { Button } from "~/components/ui";
```

### Current available components:

| Component | File | Description |
|-----------|------|-------------|
| `Button` | `app/components/ui/button.tsx` | Park UI button with solid/outline/ghost/subtle/link variants |

### Adding more Park UI components:

Components are downloaded from the Park UI GitHub repo into `app/components/ui/`.
Each component wraps an Ark UI primitive with a Park UI recipe.

Example structure:
```tsx
// app/components/ui/button.tsx
import { ark } from "@ark-ui/react/factory";
import { forwardRef, type ComponentProps } from "react";
import { styled } from "styled-system/jsx";
import { button } from "styled-system/recipes";

const BaseButton = styled(ark.button, button);

export interface ButtonProps extends ComponentProps<typeof BaseButton> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ children, ...props }, ref) {
    return (
      <BaseButton ref={ref} type="button" {...props}>
        {children}
      </BaseButton>
    );
  },
);
```

---

## 6. `colorPalette` — Dynamic Theming

Park UI uses Panda's `colorPalette` system for themeable colors.

### How it works:

```tsx
// The component references colorPalette tokens:
<Button colorPalette="orange">Orange Button</Button>
<Button colorPalette="blue">Blue Button</Button>
<Button colorPalette="red">Red Button</Button>
```

### Using in your own styled components:

```tsx
const Title = styled("h1", {
  base: {
    fontFamily: "display",
    fontSize: "5xl",
    fontWeight: "bold",
    // References the current colorPalette
    color: "colorPalette.500",
  },
});

// Usage:
<Title colorPalette="orange">Orange Title</Title>
<Title colorPalette="blue">Blue Title</Title>
```

### Available color palettes (from Park UI preset):

`neutral`, `tomato`, `red`, `ruby`, `crimson`, `pink`, `plum`, `purple`, `violet`, `iris`, `indigo`, `blue`, `cyan`, `teal`, `jade`, `green`, `grass`, `bronze`, `gold`, `brown`, `orange`, `amber`, `yellow`, `lime`, `mint`, `sky`

### Using in `css()`:

```tsx
className={css({
  colorPalette: "orange",
  bg: "colorPalette.500",
  color: "white",
  _hover: { bg: "colorPalette.600" },
})}
```

---

## 7. Component Architecture

### File Structure

```
app/
├── components/
│   ├── ui/
│   │   ├── index.ts          # Barrel exports
│   │   └── button.tsx        # Park UI components
│   ├── schedule/
│   │   ├── ScheduleView.tsx  # Feature-specific views
│   │   └── ActivityCard.tsx
│   └── admin/
│       ├── AdminWeeklyView.tsx
│       └── DayEditor.tsx
├── routes/
│   ├── home.tsx              # Thin route wrappers
│   ├── admin.tsx
│   └── admin-day.tsx
├── context/
│   └── AppContext.tsx        # Global state
├── lib/
│   ├── time.ts               # Time utilities
│   └── storage.ts            # LocalStorage persistence
└── types/
│   └── index.ts              # TypeScript types
```

### Route Pattern (thin wrapper)

```tsx
// app/routes/home.tsx
import type { Route } from "./+types/home";
import { ScheduleView } from "~/components/schedule/ScheduleView";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kids App - Daily Schedule" },
    { name: "description", content: "See what is happening today!" },
  ];
}

export default function Home() {
  return <ScheduleView />;
}
```

### Component Pattern (styled + css + patterns)

```tsx
// app/components/schedule/ScheduleView.tsx
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";
import { styled } from "styled-system/jsx";
import { Button } from "~/components/ui";

const Header = styled("header", {
  base: {
    bg: "white",
    borderBottomWidth: "2px",
    borderColor: "gray.200",
    px: "6",
    py: "4",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export function ScheduleView() {
  return (
    <div className={flex({ direction: "column", minH: "100vh", bg: "gray.50" })}>
      <Header>
        <h1 className={css({ fontFamily: "display", fontSize: "2xl", fontWeight: "bold" })}>
          Today
        </h1>
        <Button size="md" colorPalette="orange">
          Start
        </Button>
      </Header>
    </div>
  );
}
```

---

## 8. Framer Motion + Panda CSS

Framer Motion works seamlessly with Panda CSS. Use `styled(motion.div, {...})` or apply `css()` classes to motion components.

```tsx
import { motion } from "framer-motion";
import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";

// Option A: Styled motion component
const AnimatedCard = styled(motion.div, {
  base: {
    bg: "white",
    borderRadius: "xl",
    p: "6",
    boxShadow: "md",
  },
});

// Usage:
<AnimatedCard
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</AnimatedCard>

// Option B: className on motion component
<motion.div
  className={css({ bg: "white", borderRadius: "xl", p: "6" })}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Content
</motion.div>
```

---

## 9. Common Mistakes to Avoid

### ❌ DON'T: Inline style objects
```tsx
// WRONG
<div style={{ padding: "16px", backgroundColor: "white" }}>
```

### ✅ DO: Use css()
```tsx
// CORRECT
<div className={css({ p: "4", bg: "white" })}>
```

---

### ❌ DON'T: Plain HTML elements without styling
```tsx
// WRONG
<div className="flex items-center gap-4">
  <button className="bg-blue-500 text-white px-4 py-2 rounded">
```

### ✅ DO: Use styled components or Park UI
```tsx
// CORRECT
<div className={flex({ align: "center", gap: "4" })}>
  <Button colorPalette="blue" size="md">
```

---

### ❌ DON'T: Custom button with cva when Park UI Button exists
```tsx
// WRONG — reinventing the wheel
const myButton = cva({ base: { /* ... */ }, variants: { /* ... */ } })
<button className={myButton({ variant: "solid" })}>Click</button>
```

### ✅ DO: Use Park UI Button
```tsx
// CORRECT
import { Button } from "~/components/ui";
<Button variant="solid" colorPalette="orange">Click</Button>
```

---

### ❌ DON'T: Manual flexbox CSS
```tsx
// WRONG
<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
```

### ✅ DO: Use patterns
```tsx
// CORRECT
<div className={flex({ direction: "column", align: "center" })}>
```

---

## 10. Panda Config Reference

```tsx
// panda.config.ts
import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import orange from "@park-ui/panda-preset/colors/orange";
import neutral from "@park-ui/panda-preset/colors/neutral";

export default defineConfig({
  preflight: true,
  include: ["./app/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  jsxFramework: "react",
  presets: [
    createPreset({
      accentColor: orange,    // Primary brand color
      grayColor: neutral,     // Neutral gray scale
      radius: "lg",          // Default border radius
    }),
  ],
  plugins: [
    {
      // Remove default Panda colors to use Park UI colors only
      name: "Remove Panda Preset Colors",
      hooks: {
        "preset:resolved": ({ utils, preset, name }) =>
          name === "@pandacss/preset-panda"
            ? utils.omit(preset, [
                "theme.tokens.colors",
                "theme.semanticTokens.colors",
              ])
            : preset,
      },
    },
  ],
  theme: {
    extend: {
      tokens: {
        fonts: {
          sans: { value: "'Nunito', 'Comic Neue', sans-serif" },
          display: { value: "'Fredoka', 'Nunito', sans-serif" },
        },
      },
    },
  },
});
```

---

## 11. Available Tokens

After running `bun panda codegen`, these are auto-generated:

- **`styled-system/css`** — `css()`, `cva()`, `sva()`, `cx()`
- **`styled-system/jsx`** — `styled()`, `Flex`, `VStack`, `HStack`, `Stack`, `Grid`, etc.
- **`styled-system/patterns`** — `flex()`, `vstack()`, `hstack()`, `grid()`, `circle()`, etc.
- **`styled-system/recipes`** — `button`, `card`, `badge`, etc. (from Park UI preset)
- **`styled-system/tokens`** — All design tokens (colors, spacing, fonts, etc.)
- **`styled-system/types`** — TypeScript types

### Regenerating after config changes:
```bash
bun panda codegen
```

---

## 12. Quick Decision Tree

| Situation | Use |
|-----------|-----|
| One-off styles on any element | `css({...})` → `className` |
| Reusable component with base styles | `styled("tag", {base:{...}})` |
| Layout (flexbox grid) | `flex()`, `vstack()`, `grid()` or `<Flex>`, `<VStack>`, `<Grid>` |
| Button, Card, Badge, etc. | Import from `~/components/ui` |
| Component with multiple variants | `cva({base, variants, defaultVariants})` |
| Theme-agnostic color | `colorPalette="orange"` + `colorPalette.500` tokens |
| Animation | `motion.div` + `css({...})` or `styled(motion.div, {...})` |
| Headless primitive | `ark.button`, `ark.div` from `@ark-ui/react/factory` |

---

## 13. External Resources

- **Park UI Docs**: https://park-ui.com/docs/components/button
- **Panda CSS Docs**: https://panda-css.com/docs/concepts/css-fn
- **Ark UI Docs**: https://ark-ui.com/docs/components/accordion
- **GitHub**: https://github.com/chakra-ui/park-ui/tree/main/components/react/src/components/ui
