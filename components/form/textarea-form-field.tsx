import type { FieldValues } from 'react-hook-form';
import type { FormFieldProps } from '@/components/form/field-wrapper';

import { FormFieldWrapper } from '@/components/form/field-wrapper';
import { Textarea } from '@/components/ui/textarea';

/**
 * Props for the `TextareaFormField` component.
 *
 * Combines all standard textarea attributes (except `form`)
 * with form field metadata like label, description, and control.
 *
 * @template T - A form values type extending `FieldValues`
 */
export type TextareaFormFieldProps<T extends FieldValues> =
  Omit<React.ComponentProps<'textarea'>, 'form'> &
  Omit<FormFieldProps<T>, 'children'>;

/**
 * `TextareaFormField` renders a validated textarea input using
 * `react-hook-form` and a styled wrapper with label, message, and description.
 *
 * Ideal for larger input blocks like comments, messages, or descriptions.
 *
 * @template T - A form values type extending `FieldValues`
 */
export default function TextareaFormField<T extends FieldValues>({
  control,
  name,
  formItemClassName,
  label,
  description,
  labelClassName,
  descriptionClassName,
  ...props
}: TextareaFormFieldProps<T>) {
  return (
    <FormFieldWrapper
      control={control}
      name={name}
      formItemClassName={formItemClassName}
      label={label}
      description={description}
      labelClassName={labelClassName}
      descriptionClassName={descriptionClassName}
    >
      {field => <Textarea {...props} {...field} />}
    </FormFieldWrapper>
  );
}
