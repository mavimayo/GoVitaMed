'use client';

import * as datepicker from '@zag-js/date-picker';
import { normalizeProps, useMachine } from '@zag-js/react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useId, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type DateRangeType = 'future' | 'past' | 'all';

type DatePickerProps = {
  value?: Date[];
  defaultValue?: Date[];
  onValueChange?: (details: { value: Date[]; valueAsString: string[] }) => void;
  // Single date mode props
  singleValue?: Date | null;
  onSingleValueChange?: (date: Date | null) => void;
  open?: boolean;
  onOpenChange?: (details: { open: boolean }) => void;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  name?: string;
  min?: Date;
  max?: Date;
  closeOnSelect?: boolean;
  className?: string;
  // Date range type for automatic min/max setting
  allowedDateRange?: DateRangeType;
};

export default function DatePicker({
  value,
  defaultValue,
  onValueChange,
  open,
  onOpenChange,
  disabled = false,
  readOnly = false,
  placeholder = 'MM/DD/YYYY',
  name,
  min,
  max,
  closeOnSelect = true,
  className,
  singleValue,
  onSingleValueChange,
  allowedDateRange = 'all',
}: DatePickerProps) {
  // State for input validation
  const [inputError, setInputError] = useState<string>('');

  // Handle date range type for automatic min/max setting
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let computedMin = min;
  let computedMax = max;

  if (allowedDateRange === 'future') {
    computedMin = min || tomorrow;
  } else if (allowedDateRange === 'past') {
    computedMax = max || today;
  }

  // Handle single date mode conversion
  const actualValue = singleValue ? [singleValue] : value;
  const actualDefaultValue = singleValue ? (singleValue ? [singleValue] : undefined) : defaultValue;

  const service = useMachine(datepicker.machine, {
    id: useId(),
    value: actualValue?.map(date => datepicker.parse(date.toISOString().split('T')[0])),
    defaultValue: actualDefaultValue?.map(date => datepicker.parse(date.toISOString().split('T')[0])),
    onValueChange: (details) => {
      const dates = details.value.map(dateValue => new Date(dateValue.toString()));

      // Handle single date mode callback
      if (onSingleValueChange) {
        onSingleValueChange(dates.length > 0 ? dates[0] : null);
      }

      // Handle array mode callback
      if (onValueChange) {
        onValueChange({ value: dates, valueAsString: details.valueAsString });
      }
    },
    open,
    onOpenChange,
    disabled,
    readOnly,
    placeholder,
    name,
    min: computedMin ? datepicker.parse(computedMin.toISOString().split('T')[0]) : undefined,
    max: computedMax ? datepicker.parse(computedMax.toISOString().split('T')[0]) : undefined,
    closeOnSelect,
  });

  const api = datepicker.connect(service, normalizeProps);

  // Validate date parts (MM/DD/YYYY)
  const validateDateInput = (value: string) => {
    // Extract the current parts being typed
    const parts = value.split('/');
    let error = '';

    if (parts[0] && parts[0].length >= 2) {
      const month = Number.parseInt(parts[0], 10);
      if (month < 1 || month > 12) {
        error = 'Month must be between 01-12';
      }
    }

    if (parts[1] && parts[1].length >= 2) {
      const day = Number.parseInt(parts[1], 10);
      if (day < 1 || day > 31) {
        error = error || 'Day must be between 01-31';
      }
    }

    setInputError(error);
    return error === '';
  };

  // Handle input with proper masking and validation
  const handleInputEvent = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const value = input.value;
    const cursorPosition = input.selectionStart || 0;

    // Remove all non-digits and apply mask
    const digits = value.replace(/\D/g, '');
    let formattedValue = '';

    if (digits.length > 0) {
      formattedValue += digits.substring(0, 2);
      if (digits.length >= 3) {
        formattedValue += `/${digits.substring(2, 4)}`;
        if (digits.length >= 5) {
          formattedValue += `/${digits.substring(4, 8)}`;
        }
      }
    }

    // Validate the input as user types
    validateDateInput(formattedValue);

    // Only update if the formatted value is different
    if (formattedValue !== value) {
      input.value = formattedValue;

      // Adjust cursor position
      let newCursorPosition = cursorPosition;

      // If we just added a slash, move cursor past it
      if (formattedValue.length > value.length
        && (formattedValue[cursorPosition] === '/' || formattedValue[cursorPosition - 1] === '/')) {
        newCursorPosition = cursorPosition + 1;
      }

      // Set cursor position
      setTimeout(() => {
        input.setSelectionRange(newCursorPosition, newCursorPosition);
      }, 0);
    }
  };

  // Handle key down for backspace behavior
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const cursorPosition = input.selectionStart || 0;

    // Handle backspace on slash characters
    if (e.key === 'Backspace' && cursorPosition > 0) {
      const prevChar = input.value[cursorPosition - 1];
      if (prevChar === '/') {
        e.preventDefault();
        const newValue = `${input.value.slice(0, cursorPosition - 2)}${input.value.slice(cursorPosition)}`;
        input.value = newValue;
        input.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
        return;
      }
    }

    // Call original keydown handler
    const inputProps = api.getInputProps();
    if (inputProps.onKeyDown) {
      inputProps.onKeyDown(e);
    }
  };

  // Handle input focus (removed auto-open functionality)
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Call the original focus handler if it exists
    const inputProps = api.getInputProps();
    if (inputProps.onFocus) {
      inputProps.onFocus(e);
    }
  };

  const inputProps = api.getInputProps();

  return (
    <div className={cn('relative', className)}>
      <div {...api.getControlProps()} className="relative">
        <Input
          {...inputProps}
          onInput={handleInputEvent}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          className={cn(
            'pr-10',
            disabled && 'opacity-50 cursor-not-allowed',
            readOnly && 'cursor-default',
          )}
          style={{
            color: inputError ? '#ef4444' : undefined, // red-500 when there's an error
          }}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          maxLength={10} // MM/DD/YYYY format
        />
        <Button
          {...api.getTriggerProps()}
          variant="ghost"
          size="icon"
          type="button"
          disabled={disabled}
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        >
          <Calendar className="h-4 w-4" />
        </Button>
      </div>

      {/* Error message */}
      {inputError && (
        <p className="text-xs text-red-500 mt-1">{inputError}</p>
      )}

      {api.open && (
        <div {...api.getPositionerProps()} className="absolute z-50 mt-1">
          <div
            {...api.getContentProps()}
            className="rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            {/* Day View */}
            <div hidden={api.view !== 'day'}>
              <div {...api.getViewControlProps({ view: 'year' })} className="flex items-center justify-between mb-4">
                <Button
                  {...api.getPrevTriggerProps()}
                  variant="ghost"
                  size="icon"
                  type="button"

                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  {...api.getViewTriggerProps()}
                  variant="ghost"
                  type="button"

                  className="text-primary font-medium hover:text-primary/80"
                >
                  {api.visibleRangeText.start}
                </Button>
                <Button
                  {...api.getNextTriggerProps()}
                  variant="ghost"
                  type="button"

                  size="icon"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <table {...api.getTableProps({ view: 'day' })} className="w-full border-collapse">
                <thead {...api.getTableHeaderProps({ view: 'day' })}>
                  <tr {...api.getTableRowProps({ view: 'day' })}>
                    {api.weekDays.map(day => (
                      <th key={`weekday-${day.long}`} scope="col" aria-label={day.long} className="text-center text-sm font-medium text-muted-foreground p-2">
                        {day.narrow}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody {...api.getTableBodyProps({ view: 'day' })}>
                  {api.weeks.map(week => (
                    <tr key={`week-${week.map(d => `${d.day}-${d.month}-${d.year}`).join('-')}`} {...api.getTableRowProps({ view: 'day' })}>
                      {week.map(value => (
                        <td key={`day-${value.day}-${value.month}-${value.year}`} {...api.getDayTableCellProps({ value })} className="text-center p-0">
                          <Button
                            {...api.getDayTableCellTriggerProps({ value })}
                            variant="ghost"
                            size="icon"
                            type="button"

                            className={cn(
                              'h-9 w-9 p-0 font-normal text-primary',
                              '[&[data-selected]]:bg-primary [&[data-selected]]:text-primary-foreground',
                              '[&[data-today]]:bg-accent [&[data-today]]:text-accent-foreground',
                              '[&[data-outside-range]]:text-muted-foreground [&[data-outside-range]]:opacity-50',
                              '[&[data-disabled]]:text-muted-foreground [&[data-disabled]]:opacity-50',
                              '[&[data-unavailable]]:text-muted-foreground [&[data-unavailable]]:opacity-50',
                            )}
                          >
                            {value.day}
                          </Button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Month View */}
            <div hidden={api.view !== 'month'}>
              <div {...api.getViewControlProps({ view: 'month' })} className="flex items-center justify-between mb-4">
                <Button
                  {...api.getPrevTriggerProps({ view: 'month' })}
                  variant="ghost"
                  size="icon"
                  type="button"

                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  {...api.getViewTriggerProps({ view: 'month' })}
                  variant="ghost"
                  type="button"

                  className="text-primary font-medium hover:text-primary/80"
                >
                  {api.visibleRange.start.year}
                </Button>
                <Button
                  type="button"

                  {...api.getNextTriggerProps({ view: 'month' })}
                  variant="ghost"
                  size="icon"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <table {...api.getTableProps({ view: 'month', columns: 4 })} className="w-full border-collapse">
                <tbody {...api.getTableBodyProps({ view: 'month' })}>
                  {api.getMonthsGrid({ columns: 4, format: 'short' }).map(months => (
                    <tr key={`month-row-${months.map(m => m.value).join('-')}`} {...api.getTableRowProps()}>
                      {months.map(month => (
                        <td
                          key={`month-${month.value}`}
                          {...api.getMonthTableCellProps({
                            ...month,
                            columns: 4,
                          })}
                          className="text-center p-1"
                        >
                          <Button
                            {...api.getMonthTableCellTriggerProps({
                              ...month,
                              columns: 4,
                            })}
                            type="button"

                            variant="ghost"
                            className={cn(
                              'h-9 w-16 p-0 font-normal text-primary',
                              '[&[data-selected]]:bg-primary [&[data-selected]]:text-primary-foreground',
                            )}
                          >
                            {month.label}
                          </Button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Year View */}
            <div hidden={api.view !== 'year'}>
              <div {...api.getViewControlProps({ view: 'year' })} className="flex items-center justify-between mb-4">
                <Button
                  {...api.getPrevTriggerProps({ view: 'year' })}
                  variant="ghost"
                  size="icon"
                  type="button"

                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-primary font-medium">
                  {api.getDecade().start}
                  {' '}
                  -
                  {api.getDecade().end}
                </span>
                <Button
                  {...api.getNextTriggerProps({ view: 'year' })}
                  variant="ghost"
                  size="icon"
                  type="button"

                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <table {...api.getTableProps({ view: 'year', columns: 4 })} className="w-full border-collapse">
                <tbody {...api.getTableBodyProps()}>
                  {api.getYearsGrid({ columns: 4 }).map(years => (
                    <tr key={`year-row-${years.map(y => y.value).join('-')}`} {...api.getTableRowProps({ view: 'year' })}>
                      {years.map(year => (
                        <td
                          key={`year-${year.value}`}
                          {...api.getYearTableCellProps({
                            ...year,
                            columns: 4,
                          })}
                          className="text-center p-1"
                        >
                          <Button
                            {...api.getYearTableCellTriggerProps({
                              ...year,
                              columns: 4,
                            })}
                            type="button"

                            variant="ghost"
                            className={cn(
                              'h-9 w-16 p-0 font-normal text-primary',
                              '[&[data-selected]]:bg-primary [&[data-selected]]:text-primary-foreground',
                            )}
                          >
                            {year.label}
                          </Button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
