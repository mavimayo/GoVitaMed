/* eslint-disable react-refresh/only-export-components */
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { Slot as SlotPrimitive } from 'radix-ui';
import * as React from 'react';
import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    // Tag-specific base styles
    variant: {
      h1: 'text-[24px] sm:text-[36px] md:text-[30px] lg:text-[48px]',
      h2: 'text-3xl font-semibold leading-snug',
      h3: 'font-semibold text-[20px] sm:text-[22px] lg:text-[22px]',
      h4: 'text-[18px] sm:text-[20px] md:text-[22px] font-bold',
      h5: 'text-lg font-normal leading-relaxed',
      h6: 'text-base font-normal leading-relaxed',
      p: 'text-[14px] sm:text-[15px] md:text-[12px] lg:text-[18px]  font-semibold',
      span: 'text-[24px] sm:text-[40px] md:text-[30px] lg:text-[48px]',
      spanParagraph: 'font-bold text-[20px] sm:text-[20px] lg:text-[32px]',
    },
    // Additional styling variants
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      tertiary: 'text-[#9E9E9E]',
      muted: 'text-gray-500',
      danger: 'text-red-600',
      custom1: 'text-[var(--btn-primary)]',
      custom2: 'text-[var(--btn-secondary)]',
    },
    weight: {
      normal: 'font-normal',
      bold: 'font-bold',
      semibold: 'font-semibold',
    },
    size: {
      sm: 'text-[15px] sm:text-[13px] md:text-[16px] lg:text-[16px]',
      md: 'text-[18px]',
      lg: 'text-[24px]',
      xl: 'text-[32px]',
    },
  },
  defaultVariants: {
    variant: 'p',
    color: 'primary',
  },

});

export type TypographyProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  asChild?: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, 'color'> & VariantProps<typeof typographyVariants>;

const Typography = ({
  as,
  asChild = false,
  className,
  variant,
  color,
  weight,
  size,
  ...props
}: TypographyProps) => {
  const Component = asChild ? SlotPrimitive.Slot : as || 'p';
  const stylingVariant = variant || (as as TypographyProps['variant']) || 'p';

  return (
    <Component
      className={cn(
        typographyVariants({
          variant: stylingVariant,
          color,
          weight,
          size,

          className,
        }),
      )}
      {...props}
    />
  );
};

Typography.displayName = 'Typography';

export { Typography, typographyVariants };
