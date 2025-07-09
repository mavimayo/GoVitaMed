import type { FieldValues } from 'react-hook-form';
import type { FormFieldProps } from './field-wrapper';
import React from 'react';

import { Input } from '@/components/ui/input';
import { FormFieldWrapper } from './field-wrapper';

/**
 * Props for the `InputFormField` component.
 *
 * Combines all standard input attributes (except `form`)
 * with form field metadata like label, description, and control.
 *
 * @template T - A form values type extending `FieldValues`
 */
export type InputFormFieldProps<T extends FieldValues> =
  Omit<React.ComponentProps<'input'>, 'form' | 'onChange' | 'value'> &
  Omit<FormFieldProps<T>, 'children'>;

/**
 * `InputFormField` renders a reusable and validated input field using
 * `react-hook-form` and `FormFieldWrapper`.
 *
 * It supports label, description, and error messaging out of the box.
 *
 * @template T - A form values type extending `FieldValues`
 */
export default function InputFormField<T extends FieldValues>({
  control,
  name,
  formItemClassName,
  label,
  description,
  labelClassName,
  descriptionClassName,
  ...props
}: InputFormFieldProps<T>) {
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
      {field => <Input {...props} {...field} />}
    </FormFieldWrapper>
  );
}
