import type { ReactNode } from 'react';
import type {
  DefaultValues,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import type { infer as ZodInfer, ZodType } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form'; // Replace with <div> if not using shadcn
import { cn } from '@/lib/utils';

/**
 * Props for the `FormModified` component.
 *
 * @template Schema - A Zod schema used to infer form shape and validation.
 */
type FormProps<Schema extends ZodType<any, any, any>> = {
  /**
   * Zod schema for validating the form data.
   */
  schema: Schema;

  /**
   * Submit handler that receives the parsed form values.
   */
  onSubmit: SubmitHandler<ZodInfer<Schema>>;

  /**
   * Render function that receives the `react-hook-form` methods.
   * Typically used to render fields.
   */
  children: (form: UseFormReturn<ZodInfer<Schema>>) => ReactNode;

  /**
   * Optional default values for the form fields.
   */
  defaultValues?: DefaultValues<ZodInfer<Schema>>;

  /**
   * If true, disables all inputs inside the fieldset.
   */
  disabled?: boolean;

  /**
   * Props forwarded to the native `<form>` element.
   * `onSubmit`, `children`, and `disabled` are omitted.
   */
  formProps: Omit<React.ComponentProps<'form'>, 'onSubmit' | 'children' | 'disabled'>;
} & Omit<React.ComponentProps<'fieldset'>, 'children' | 'disabled'>;

/**
 * A strongly-typed, reusable form wrapper built with `react-hook-form`, `zod`, and optionally `shadcn/ui`.
 *
 * Features:
 * - Schema-based validation with Zod
 * - Flexible styling via `formProps` and fieldset props
 * - Clean and composable field rendering via render function
 *
 * @template Schema - Zod schema that defines the form shape
 */
export default function FormModified<Schema extends ZodType<any, any, any>>({
  schema,
  onSubmit,
  children,
  defaultValues,
  disabled,
  formProps,
  ...props
}: FormProps<Schema>) {
  const methods = useForm<ZodInfer<Schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        {...formProps}
        className={cn('w-full', formProps.className)}
      >
        <fieldset {...props} disabled={disabled}>
          {children(methods)}
        </fieldset>
      </form>
    </Form>
  );
}
