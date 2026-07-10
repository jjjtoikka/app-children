import { cva, type RecipeVariantProps } from "styled-system/css";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

const cardVariants = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    bg: "gray.100",
    borderRadius: "xl",
    boxShadow: "lg",
    overflow: "hidden",
    transition: "all 0.2s ease-in-out",
    _hover: { boxShadow: "xl", transform: "translateY(-2px)" },
  },
  variants: {
    variant: {
      default: {
        bg: "gray.100",
      },
      outlined: {
        bg: "white",
        border: "2px solid",
        borderColor: "gray.200",
      },
      elevated: {
        bg: "white",
        boxShadow: "xl",
      },
    },
    size: {
      sm: { p: "4", gap: "2" },
      md: { p: "6", gap: "3" },
      lg: { p: "8", gap: "4" },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export type CardProps = ComponentPropsWithoutRef<"div"> &
  RecipeVariantProps<typeof cardVariants>;

export function Card({ className, variant, size, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, size }), className)}
      {...props}
    />
  );
}
