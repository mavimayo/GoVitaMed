'use client';

import type { ReactNode } from 'react';
import type {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import type { infer as ZodInfer, ZodType } from 'zod';

import type { DatepickerFormFieldProps } from './datepicker-form-field';
import type { FormFieldProps } from './field-wrapper';
import type { InputFormFieldProps } from './input-form-field';
import type { TextareaFormFieldProps } from './textarea-form-field';

import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';

import DatepickerFormField from './datepicker-form-field';
import { FormFieldWrapper } from './field-wrapper';
import InputFormField from './input-form-field';
import TextareaFormField from './textarea-form-field';

/**
 * Component set with control already injected.
 */
type FormComponents<T extends FieldValues> = {
  Input: React.ComponentType<Omit<InputFormFieldProps<T>, 'control'>>;
  Textarea: React.ComponentType<Omit<TextareaFormFieldProps<T>, 'control'>>;
  DatePicker: React.ComponentType<Omit<DatepickerFormFieldProps<T>, 'control'>>;
  Field: React.ComponentType<Omit<FormFieldProps<T>, 'control'>>;
};

/**
 * Create pre-configured form field components using provided control.
 */
function createFormComponents<T extends FieldValues>(
  control: UseFormReturn<T>['control'],
): FormComponents<T> {
  return {
    Input: props => <InputFormField control={control} {...props} />,
    Textarea: props => <TextareaFormField control={control} {...props} />,
    DatePicker: props => <DatepickerFormField control={control} {...props} />,
    Field: props => <FormFieldWrapper control={control} {...props} />,
  };
}

/**
 * Form props accepting Zod schema and configuration.
 */
type FormProps<Schema extends ZodType<any, any, any>> = {
  schema: Schema;
  onSubmit: SubmitHandler<ZodInfer<Schema>>;
  children: (context: {
    methods: UseFormReturn<ZodInfer<Schema>>;
    components: FormComponents<ZodInfer<Schema>>;
  }) => ReactNode;
  defaultValues?: DefaultValues<ZodInfer<Schema>>;
  disabled?: boolean;
  formProps?: Omit<React.ComponentProps<'form'>, 'onSubmit' | 'children'>;
  fieldsetProps?: Omit<React.ComponentProps<'fieldset'>, 'disabled' | 'children'>;
  useFieldset?: boolean;
  formKey?: string | number;
};

function FormModifiedComponent<Schema extends ZodType<any, any, any>>({
  schema,
  onSubmit,
  children,
  defaultValues,
  disabled = false,
  formProps,
  fieldsetProps,
  useFieldset = true,
  formKey,
}: FormProps<Schema>) {
  const previousKey = useRef(formKey);

  const methods = useForm<ZodInfer<Schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // Reset form when formKey changes
  useEffect(() => {
    if (
      formKey !== undefined
      && formKey !== previousKey.current
    ) {
      previousKey.current = formKey;
      methods.reset(defaultValues);
    }
  }, [formKey, defaultValues, methods]);

  const components = useMemo(
    () => createFormComponents(methods.control),
    [methods.control],
  );

  const handleSubmit = methods.handleSubmit(onSubmit);
  const formClass = cn('w-full', formProps?.className);
  const wrapperClass = cn(fieldsetProps?.className);

  return (
    <Form {...methods}>
      <form
        onSubmit={handleSubmit}
        noValidate
        {...formProps}
        className={formClass}
      >
        {useFieldset ? (
          <fieldset
            {...fieldsetProps}
            disabled={disabled}
            className={wrapperClass}
          >
            {children({ methods, components })}
          </fieldset>
        ) : (
          <div className={wrapperClass}>
            {children({ methods, components })}
          </div>
        )}
      </form>
    </Form>
  );
}

const FormModified = memo(FormModifiedComponent) as <
  Schema extends ZodType<any, any, any>,
>(
  props: FormProps<Schema>
) => ReactNode;

export default FormModified;
