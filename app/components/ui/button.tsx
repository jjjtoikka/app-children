import { cva, type RecipeVariantProps } from "styled-system/css";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

const buttonVariants = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
    fontFamily: "sans",
    fontWeight: "semibold",
    whiteSpace: "nowrap",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  variants: {
    variant: {
      solid: {
        bg: "primary.500",
        color: "white",
        _hover: { bg: "primary.600", boxShadow: "color" },
        _active: { bg: "primary.700" },
      },
      outline: {
        bg: "transparent",
        color: "primary.500",
        border: "2px solid",
        borderColor: "primary.500",
        _hover: { bg: "primary.50", boxShadow: "md" },
        _active: { bg: "primary.100" },
      },
      ghost: {
        bg: "transparent",
        color: "primary.500",
        _hover: { bg: "primary.50" },
        _active: { bg: "primary.100" },
      },
      subtle: {
        bg: "primary.100",
        color: "primary.700",
        _hover: { bg: "primary.200", boxShadow: "sm" },
        _active: { bg: "primary.300" },
      },
    },
    size: {
      sm: { h: "8", px: "3", fontSize: "sm", borderRadius: "md" },
      md: { h: "10", px: "4", fontSize: "md", borderRadius: "lg" },
      lg: { h: "12", px: "6", fontSize: "lg", borderRadius: "xl" },
      xl: { h: "14", px: "8", fontSize: "xl", borderRadius: "xl" },
    },
    shape: {
      default: {},
      pill: { borderRadius: "full" },
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
    shape: "default",
  },
});

export type ButtonProps = ComponentPropsWithoutRef<"button"> &
  RecipeVariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  shape,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size, shape }),
        className,
      )}
      {...props}
    />
  );
}
