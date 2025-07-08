import type { LucideIcon } from 'lucide-react';
import type { FieldValues } from 'react-hook-form';
import type { FormFieldProps } from '@/components/form/field-wrapper';
import type { CalendarProps } from '@/components/ui/calendar';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

/**
 * Props for `DatepickerFormField`, a date input field with calendar popover.
 *
 * @template T - A form values type extending `FieldValues`
 */
export type DatepickerFormFieldProps<T extends FieldValues> =
  // Inherit most calendar props, excluding the ones controlled internally
  Omit<CalendarProps, 'onSelect' | 'selected'> &
  // Inherit most form field props, excluding `children`
  Omit<FormFieldProps<T>, 'children'> & {
    /**
     * Optional class name for styling the calendar button trigger.
     */
    triggerClassName?: string;

    /**
     * Optional icon to show on the button (defaults to CalendarIcon).
     */
    Icon?: LucideIcon;
  };

/**
 * `DatepickerFormField` integrates a calendar-based date picker with `react-hook-form`
 * and Shadcn-style form components.
 *
 * It wraps the `Calendar` component inside a `Popover`, managing its open state,
 * field value, label, description, and error message.
 *
 * @template T - Zod-based form values extending `FieldValues`
 */
export default function DatepickerFormField<T extends FieldValues>({
  control,
  name,
  formItemClassName,
  label,
  description,
  labelClassName,
  descriptionClassName,
  triggerClassName,
  Icon = CalendarIcon,
  mode = 'single',
  ...props
}: DatepickerFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(formItemClassName)}>
          {label && <FormLabel className={cn(labelClassName)}>{label}</FormLabel>}

          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    'pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground',
                    triggerClassName,
                  )}
                >
                  {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                  <Icon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent>
              <Calendar
                mode={mode}
                selected={field.value}
                onSelect={field.onChange}
                {...props}
              />
            </PopoverContent>
          </Popover>

          {description && (
            <FormDescription className={cn(descriptionClassName)}>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
