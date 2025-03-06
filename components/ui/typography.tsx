import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    // Tag-specific base styles
    variant: {
      h1: "text-4xl font-bold leading-tight",
      h2: "text-3xl font-semibold leading-snug",
      h3: "text-2xl font-medium leading-snug",
      h4: "text-xl font-normal leading-relaxed",
      h5: "text-lg font-normal leading-relaxed",
      h6: "text-base font-normal leading-relaxed",
      p: "text-base leading-relaxed",
      span: "text-sm",
    },
    // Additional styling variants
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      muted: "text-gray-500",
      danger: "text-red-600",
    },
  },
  defaultVariants: {
    variant: "p",
    color: "primary",
  },
});

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof typographyVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  asChild?: boolean;
}

const Typography = ({
  as,
  asChild = false,
  className,
  variant,
  color,
  ...props
}: TypographyProps) => {
  const Component = asChild ? Slot : as || "p";
  const stylingVariant = variant || (as as TypographyProps["variant"]) || "p";

  return (
    <Component
      className={cn(
        typographyVariants({
          variant: stylingVariant,
          color,
          className,
        })
      )}
      {...props}
    />
  );
};

Typography.displayName = "Typography";

export { Typography, typographyVariants };
