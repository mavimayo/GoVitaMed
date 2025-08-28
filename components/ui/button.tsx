/* eslint-disable react-refresh/only-export-components */
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { Slot as SlotPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 [&_svg]:shrink-0 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--btn-primary)] text-primary-foreground px-6 py-3 rounded-md text-sm font-normal shadow-xs transition-colors duration-200 hover:bg-[#0d5f96]',
        primary:
          'bg-[var(--btn-secondary)] text-primary-foreground px-6 py-3 rounded-md text-sm font-normal shadow-xs transition-colors duration-200 hover:bg-[#0d5f96]',
        destructive:
          'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary:
          'w-fit bg-[#F5F5F5] text-black border-2 border-gray-400 hover:bg-[#F5F5F5]',
        tertiary:
          'w-fit bg-[#FAFAFA] text-black  hover:bg-[#FAFAFA]',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'>
  & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? SlotPrimitive.Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
