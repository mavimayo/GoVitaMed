'use client';

import type { ReactNode } from 'react';
import type {
  Control,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import type { infer as ZodInfer, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { memo, useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Input } from './input';
import { Textarea } from './textarea';

/* ----------------------------------------------------------------------------
 * Shared Types
 * -------------------------------------------------------------------------- */

type FormFieldLayoutProps = {
  label?: string;
  description?: string;
  formItemClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
};

type WrappedFieldProps<T extends FieldValues> = {
  name: Path<T>;
} & FormFieldLayoutProps;

export type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  children: React.ReactNode | ((field: FieldValues) => React.ReactNode);
} & FormFieldLayoutProps;

/* ----------------------------------------------------------------------------
 * Wrapper Component
 * -------------------------------------------------------------------------- */

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
            <FormDescription
              className={cn('text-muted-foreground', descriptionClassName)}
            >
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/* ----------------------------------------------------------------------------
 * Component Factory
 * -------------------------------------------------------------------------- */

type FormComponents<T extends FieldValues> = {
  Input: (
    props: WrappedFieldProps<T> & Omit<React.ComponentProps<'input'>, 'name' | 'onChange' | 'onBlur'>
  ) => ReactNode;
  Textarea: (
    props: WrappedFieldProps<T>
      & Omit<React.ComponentProps<'textarea'>, 'name' | 'onChange' | 'onBlur'>
  ) => ReactNode;
  Field: React.ComponentType<Omit<FormFieldProps<T>, 'control'>>;
};

function createFormComponents<T extends FieldValues>(
  control: UseFormReturn<T>['control'],
): FormComponents<T> {
  return {
    Input: ({
      name,
      label,
      description,
      formItemClassName,
      labelClassName,
      descriptionClassName,
      ...rest
    }) => (
      <FormFieldWrapper
        control={control}
        name={name}
        label={label}
        description={description}
        formItemClassName={formItemClassName}
        labelClassName={labelClassName}
        descriptionClassName={descriptionClassName}
      >
        {field => <Input {...field} {...rest} />}
      </FormFieldWrapper>
    ),

    Textarea: ({
      name,
      label,
      description,
      formItemClassName,
      labelClassName,
      descriptionClassName,
      ...rest
    }) => (
      <FormFieldWrapper
        control={control}
        name={name}
        label={label}
        description={description}
        formItemClassName={formItemClassName}
        labelClassName={labelClassName}
        descriptionClassName={descriptionClassName}
      >
        {field => <Textarea {...field} {...rest} />}
      </FormFieldWrapper>
    ),

    Field: props => <FormFieldWrapper control={control} {...props} />,
  };
}

/* ----------------------------------------------------------------------------
 * Form Component
 * -------------------------------------------------------------------------- */

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
  fieldsetProps?: Omit<
    React.ComponentProps<'fieldset'>,
    'disabled' | 'children'
  >;
  useFieldset?: boolean;
  formKey?: string | number;
  warnOnUnsavedChanges?: boolean;
  unsavedChangesMessage?: string;
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
  warnOnUnsavedChanges = false,
  unsavedChangesMessage = 'You have unsaved changes. Are you sure you want to leave?',
}: FormProps<Schema>) {
  const previousKey = useRef(formKey);

  const methods = useForm<ZodInfer<Schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { formState } = methods;
  const hasUnsavedChanges = formState.isDirty && !formState.isSubmitSuccessful;

  useEffect(() => {
    if (formKey !== undefined && formKey !== previousKey.current) {
      previousKey.current = formKey;
      methods.reset(defaultValues);
    }
  }, [formKey, defaultValues, methods]);

  useEffect(() => {
    if (!warnOnUnsavedChanges) {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = unsavedChangesMessage;
        return unsavedChangesMessage;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [warnOnUnsavedChanges, hasUnsavedChanges, unsavedChangesMessage]);

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
