'use client';

import * as datepicker from '@zag-js/date-picker';
import { normalizeProps, useMachine } from '@zag-js/react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useId } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type DatePickerProps = {
  value?: Date[];
  defaultValue?: Date[];
  onValueChange?: (details: { value: Date[]; valueAsString: string[] }) => void;
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
};

export default function DatePicker({
  value,
  defaultValue,
  onValueChange,
  open,
  onOpenChange,
  disabled = false,
  readOnly = false,
  placeholder = 'Select date...',
  name,
  min,
  max,
  closeOnSelect = true,
  className,
}: DatePickerProps) {
  const service = useMachine(datepicker.machine, {
    id: useId(),
    value: value?.map(date => datepicker.parse(date.toISOString().split('T')[0])),
    defaultValue: defaultValue?.map(date => datepicker.parse(date.toISOString().split('T')[0])),
    onValueChange: onValueChange ? (details) => {
      const dates = details.value.map(dateValue => new Date(dateValue.toString()));
      onValueChange({ value: dates, valueAsString: details.valueAsString });
    } : undefined,
    open,
    onOpenChange,
    disabled,
    readOnly,
    placeholder,
    name,
    min: min ? datepicker.parse(min.toISOString().split('T')[0]) : undefined,
    max: max ? datepicker.parse(max.toISOString().split('T')[0]) : undefined,
    closeOnSelect,
  });

  const api = datepicker.connect(service, normalizeProps);

  return (
    <div className={cn('relative', className)}>
      <div {...api.getControlProps()} className="relative">
        <Input
          {...api.getInputProps()}
          className={cn(
            'pr-10',
            disabled && 'opacity-50 cursor-not-allowed',
            readOnly && 'cursor-default',
          )}
          disabled={disabled}
          readOnly={readOnly}
        />
        <Button
          {...api.getTriggerProps()}
          variant="ghost"
          size="icon"
          disabled={disabled}
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        >
          <Calendar className="h-4 w-4" />
        </Button>
      </div>

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
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  {...api.getViewTriggerProps()}
                  variant="ghost"
                  className="text-primary font-medium hover:text-primary/80"
                >
                  {api.visibleRangeText.start}
                </Button>
                <Button
                  {...api.getNextTriggerProps()}
                  variant="ghost"
                  size="icon"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <table {...api.getTableProps({ view: 'day' })} className="w-full border-collapse">
                <thead {...api.getTableHeaderProps({ view: 'day' })}>
                  <tr {...api.getTableRowProps({ view: 'day' })}>
                    {api.weekDays.map((day, i) => (
                      <th key={i} scope="col" aria-label={day.long} className="text-center text-sm font-medium text-muted-foreground p-2">
                        {day.narrow}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody {...api.getTableBodyProps({ view: 'day' })}>
                  {api.weeks.map((week, i) => (
                    <tr key={i} {...api.getTableRowProps({ view: 'day' })}>
                      {week.map((value, i) => (
                        <td key={i} {...api.getDayTableCellProps({ value })} className="text-center p-0">
                          <Button
                            {...api.getDayTableCellTriggerProps({ value })}
                            variant="ghost"
                            size="icon"
                            className={cn(
                              'h-9 w-9 p-0 font-normal text-primary',
                              '[&[data-selected]]:bg-primary [&[data-selected]]:text-primary-foreground',
                              '[&[data-today]]:bg-accent [&[data-today]]:text-accent-foreground',
                              '[&[data-outside-range]]:text-muted-foreground [&[data-outside-range]]:opacity-50',
                              '[&[data-disabled]]:text-muted-foreground [&[data-disabled]]:opacity-50',
                              '[&[data-unavailable]]:text-muted-foreground [&[data-unavailable]]:opacity-50 [&[data-unavailable]]:line-through',
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
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  {...api.getViewTriggerProps({ view: 'month' })}
                  variant="ghost"
                  className="text-primary font-medium hover:text-primary/80"
                >
                  {api.visibleRange.start.year}
                </Button>
                <Button
                  {...api.getNextTriggerProps({ view: 'month' })}
                  variant="ghost"
                  size="icon"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <table {...api.getTableProps({ view: 'month', columns: 4 })} className="w-full border-collapse">
                <tbody {...api.getTableBodyProps({ view: 'month' })}>
                  {api.getMonthsGrid({ columns: 4, format: 'short' }).map((months, row) => (
                    <tr key={row} {...api.getTableRowProps()}>
                      {months.map((month, index) => (
                        <td
                          key={index}
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
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <table {...api.getTableProps({ view: 'year', columns: 4 })} className="w-full border-collapse">
                <tbody {...api.getTableBodyProps()}>
                  {api.getYearsGrid({ columns: 4 }).map((years, row) => (
                    <tr key={row} {...api.getTableRowProps({ view: 'year' })}>
                      {years.map((year, index) => (
                        <td
                          key={index}
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
