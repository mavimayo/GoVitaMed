import type { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';

/**
 * Props for the `FormFieldWrapper` component.
 *
 * @template T - Form data type extending `FieldValues`
 */
export type FormFieldProps<T extends FieldValues> = {
  /**
   * Optional label text to display above the input.
   */
  label?: string;

  /**
   * React Hook Form control object.
   */
  control: Control<T>;

  /**
   * Name of the field, must match the form schema.
   */
  name: Path<T>;

  /**
   * Optional class name for the `FormItem` wrapper.
   */
  formItemClassName?: string;

  /**
   * Field component(s) to render inside `FormControl`.
   * Can be a React node or a render function receiving the `field` object.
   */
  children: React.ReactNode | ((field: FieldValues) => React.ReactNode);

  /**
   * Optional description shown below the input.
   */
  description?: string;

  /**
   * Optional class name for the label element.
   */
  labelClassName?: string;

  /**
   * Optional class name for the description element.
   */
  descriptionClassName?: string;
};

/**
 * `FormFieldWrapper` is a reusable abstraction for rendering a form field
 * using `react-hook-form` and Shadcn's form components.
 *
 * It handles the label, input, validation message, and optional description in a consistent layout.
 *
 * @template T - A form values type extending `FieldValues`
 */
export function FormFieldWrapper<T extends FieldValues>({
  label,
  control,
  name,
  formItemClassName,
  children,
  description,
  descriptionClassName,
  labelClassName,
}: FormFieldProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn(formItemClassName)}>
          {label && (
            <FormLabel className={cn('text-muted-foreground', labelClassName)}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            {typeof children === 'function' ? children(field) : children}
          </FormControl>
          {description && (
            <FormDescription className={cn('text-muted-foreground', descriptionClassName)}>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
