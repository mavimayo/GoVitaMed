'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import DatePicker from '@/components/zag/date-picker';

// Zod schema for form validation
const dateFormSchema = z.object({
  birthDate: z.array(z.date()).min(1, 'Birth date is required'),
  futureEventDate: z.array(z.date()).min(1, 'Event date is required'),
  appointmentDate: z.array(z.date()).min(1, 'Appointment date is required'),
});

type DateFormValues = z.infer<typeof dateFormSchema>;

export default function DatePickerTestPage() {
  const [basicDate, setBasicDate] = useState<Date[]>([]);
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [submittedData, setSubmittedData] = useState<DateFormValues | null>(null);

  // Get current date for validation
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Calculate date 100 years ago for birth date validation
  const hundredYearsAgo = new Date(today);
  hundredYearsAgo.setFullYear(hundredYearsAgo.getFullYear() - 100);

  // React Hook Form setup
  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DateFormValues>({
    resolver: zodResolver(dateFormSchema),
    defaultValues: {
      birthDate: [],
      futureEventDate: [],
      appointmentDate: [],
    },
  });

  const watchedValues = watch();

  const onSubmit = (data: DateFormValues) => {
    setSubmittedData(data);
  };

  const handleReset = () => {
    reset();
    setSubmittedData(null);
    setBasicDate([]);
    setSingleDate(null);
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Date Picker Examples</h1>
          <p className="text-muted-foreground">
            Enhanced date picker with input masking, validation, and various constraints
          </p>
        </div>

        <Separator />

        {/* API Comparison Example */}
        <Card>
          <CardHeader>
            <CardTitle>API Comparison: Single vs Array</CardTitle>
            <CardDescription>
              Choose between a simple single date API or the flexible array-based API
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="single-date">Single Date API (Recommended for single dates)</Label>
                <DatePicker
                  singleValue={singleDate}
                  onSingleValueChange={setSingleDate}
                  placeholder="MM/DD/YYYY"
                  className="w-full mt-2"
                />
                {singleDate && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md mt-2">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Selected:</strong>
                      {' '}
                      {singleDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                )}
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                  <p className="text-xs text-blue-800 dark:text-blue-200 font-mono">
                    singleValue: Date | null
                    <br />
                    onSingleValueChange: (date: Date | null) =&gt; void
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                    ✓ No array indexing needed
                    <br />
                    ✓ Simpler TypeScript types
                    <br />
                    ✓ Direct date handling
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="array-date">Array API (Original Zag.js API)</Label>
                <DatePicker
                  value={basicDate}
                  onValueChange={details => setBasicDate(details.value)}
                  placeholder="MM/DD/YYYY"
                  className="w-full mt-2"
                />
                {basicDate.length > 0 && (
                  <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-md mt-2">
                    <p className="text-sm text-orange-800 dark:text-orange-200">
                      <strong>Selected:</strong>
                      {' '}
                      {basicDate[0]?.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-300 mt-1">
                      Note: Requires array[0] indexing
                    </p>
                  </div>
                )}
                <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900/20 rounded-md">
                  <p className="text-xs text-gray-800 dark:text-gray-200 font-mono">
                    value: Date[]
                    <br />
                    onValueChange: (details) =&gt; void
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    ✓ Supports multiple dates
                    <br />
                    ⚠ Requires array[0] for single dates
                    <br />
                    ⚠ More complex for simple use cases
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Comparison Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600">🔄 API Comparison: Single vs Array</CardTitle>
            <CardDescription>
              Side-by-side comparison of our enhanced single date API vs the original array-based API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Single Date API */}
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Single Date API (Recommended)</h4>
                  <div className="space-y-2">
                    <Label>Select Event Date:</Label>
                    <DatePicker
                      singleValue={singleDate}
                      onSingleValueChange={setSingleDate}
                      placeholder="MM/DD/YYYY"
                      min={tomorrow} // Future dates only
                    />
                  </div>

                  <div className="mt-3 p-3 bg-white rounded border">
                    <p className="text-sm font-mono mb-2">Code:</p>
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                      {`<DatePicker
  singleValue={date}
  onSingleValueChange={setDate}
  placeholder="MM/DD/YYYY"
/>`}
                    </pre>
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-xs text-green-700">
                        ✅ Direct date handling
                        <br />
                        ✅ No array indexing
                        <br />
                        ✅ TypeScript-friendly
                        <br />
                        ✅ Simpler state management
                      </p>
                    </div>
                    {singleDate && (
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-xs">
                          <strong>Value:</strong>
                          {' '}
                          {singleDate.toLocaleDateString()}
                        </p>
                        <p className="text-xs">
                          <strong>Type:</strong>
                          {' '}
                          Date | null
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Array API */}
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">⚠️ Array API (Original Zag.js)</h4>
                  <div className="space-y-2">
                    <Label>Select Basic Date:</Label>
                    <DatePicker
                      value={basicDate}
                      onValueChange={details => setBasicDate(details.value)}
                      placeholder="MM/DD/YYYY"
                      min={tomorrow} // Future dates only
                    />
                  </div>

                  <div className="mt-3 p-3 bg-white rounded border">
                    <p className="text-sm font-mono mb-2">Code:</p>
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                      {`<DatePicker
  value={dates}
  onValueChange={(details) =>
    setDates(details.value)
  }
  placeholder="MM/DD/YYYY"
/>`}
                    </pre>
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-xs text-orange-700">
                        ⚠️ Requires dates[0] access
                        <br />
                        ⚠️ Array handling complexity
                        <br />
                        ✅ Supports multiple dates
                        <br />
                        ✅ Original Zag.js compatibility
                      </p>
                    </div>
                    {basicDate.length > 0 && (
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-xs">
                          <strong>Value:</strong>
                          {' '}
                          {basicDate[0]?.toLocaleDateString()}
                        </p>
                        <p className="text-xs">
                          <strong>Type:</strong>
                          {' '}
                          Date[]
                        </p>
                        <p className="text-xs">
                          <strong>Access:</strong>
                          {' '}
                          dates[0]
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Comparison */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium mb-3">Quick Comparison:</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Feature</th>
                      <th className="text-left py-2 text-green-700">Single API</th>
                      <th className="text-left py-2 text-orange-700">Array API</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr className="border-b">
                      <td className="py-2 font-medium">Type Safety</td>
                      <td className="py-2 text-green-600">Date | null</td>
                      <td className="py-2 text-orange-600">Date[]</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Access Pattern</td>
                      <td className="py-2 text-green-600">date</td>
                      <td className="py-2 text-orange-600">dates[0]</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Null Handling</td>
                      <td className="py-2 text-green-600">Built-in</td>
                      <td className="py-2 text-orange-600">Manual length check</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Multiple Dates</td>
                      <td className="py-2 text-red-600">Not supported</td>
                      <td className="py-2 text-green-600">Fully supported</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Best For</td>
                      <td className="py-2 text-green-600">Single date selection</td>
                      <td className="py-2 text-orange-600">Range & multi-selection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Examples with Validation */}
        <Card>
          <CardHeader>
            <CardTitle>Form with Validation Examples</CardTitle>
            <CardDescription>
              React Hook Form + Zod validation with different date constraints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Past Date Only - Birth Date */}
              <div className="space-y-2">
                <Label htmlFor="birth-date">
                  Birth Date
                  {' '}
                  <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">
                  Only past dates allowed (up to 100 years ago)
                </p>
                <DatePicker
                  value={watchedValues.birthDate}
                  onValueChange={details => setValue('birthDate', details.value)}
                  placeholder="MM/DD/YYYY"
                  max={today} // Disable future dates
                  min={hundredYearsAgo} // Disable dates older than 100 years
                  className="w-full"
                />
                {errors.birthDate && (
                  <p className="text-sm text-destructive">{errors.birthDate.message}</p>
                )}
                {watchedValues.birthDate.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Selected:
                    {' '}
                    {watchedValues.birthDate[0]?.toLocaleDateString()}
                  </p>
                )}
              </div>

              <Separator />

              {/* Future Date Only - Event Date */}
              <div className="space-y-2">
                <Label htmlFor="future-date">
                  Future Event Date
                  {' '}
                  <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">
                  Only future dates allowed (starting from tomorrow)
                </p>
                <DatePicker
                  value={watchedValues.futureEventDate}
                  onValueChange={details => setValue('futureEventDate', details.value)}
                  placeholder="MM/DD/YYYY"
                  min={tomorrow} // Disable past and today
                  className="w-full"
                />
                {errors.futureEventDate && (
                  <p className="text-sm text-destructive">{errors.futureEventDate.message}</p>
                )}
                {watchedValues.futureEventDate.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Selected:
                    {' '}
                    {watchedValues.futureEventDate[0]?.toLocaleDateString()}
                  </p>
                )}
              </div>

              <Separator />

              {/* Limited Range - Appointment Date */}
              <div className="space-y-2">
                <Label htmlFor="appointment-date">
                  Appointment Date
                  {' '}
                  <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">
                  Available dates: Next 30 days only
                </p>
                <DatePicker
                  value={watchedValues.appointmentDate}
                  onValueChange={details => setValue('appointmentDate', details.value)}
                  placeholder="MM/DD/YYYY"
                  min={tomorrow}
                  max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 days from now
                  className="w-full"
                />
                {errors.appointmentDate && (
                  <p className="text-sm text-destructive">{errors.appointmentDate.message}</p>
                )}
                {watchedValues.appointmentDate.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Selected:
                    {' '}
                    {watchedValues.appointmentDate[0]?.toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit">Submit Form</Button>
                <Button type="button" variant="outline" onClick={handleReset}>
                  Reset All
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Submitted Data Display */}
        {submittedData && (
          <Card>
            <CardHeader>
              <CardTitle>Submitted Data</CardTitle>
              <CardDescription>
                Form validation passed! Here's the submitted data:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <h4 className="font-medium text-green-800 dark:text-green-200">Birth Date</h4>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      {submittedData.birthDate[0]?.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">Event Date</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      {submittedData.futureEventDate[0]?.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-md">
                    <h4 className="font-medium text-purple-800 dark:text-purple-200">Appointment</h4>
                    <p className="text-sm text-purple-600 dark:text-purple-300">
                      {submittedData.appointmentDate[0]?.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Documentation */}
        <Card>
          <CardHeader>
            <CardTitle>🚀 Features Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">📝 Input Masking</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Type numbers for automatic MM/DD/YYYY formatting</li>
                  <li>• Auto-adds slashes after month and day</li>
                  <li>• Smart backspace handling</li>
                  <li>• Maximum 10 character limit</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">📅 Date Constraints</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Min/Max date validation</li>
                  <li>• Past dates only (birth dates)</li>
                  <li>• Future dates only (events)</li>
                  <li>• Custom date ranges</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">🔗 Form Integration</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• React Hook Form integration</li>
                  <li>• Zod schema validation</li>
                  <li>• Real-time error display</li>
                  <li>• TypeScript support</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">🎨 UI/UX Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Click calendar icon to open (no focus-to-open)</li>
                  <li>• Keyboard navigation support</li>
                  <li>• Disabled date styling</li>
                  <li>• Responsive design & dark mode</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Masking Demonstration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">✨ Input Masking Demo</CardTitle>
            <CardDescription>
              Try typing numbers like "01252025" and watch it automatically format to "01/25/2025"
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mask-demo">Type numbers and see magic happen:</Label>
                <DatePicker
                  singleValue={singleDate}
                  onSingleValueChange={setSingleDate}
                  placeholder="Type: 01252025"
                  className="mt-2"
                />
                <div className="mt-2 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm font-medium text-blue-800">Try these examples:</p>
                  <ul className="text-xs text-blue-600 mt-1 space-y-1">
                    <li>• Type "01252025" → "01/25/2025"</li>
                    <li>• Type "123" → "12/3"</li>
                    <li>• Type "12312024" → "12/31/2024"</li>
                    <li>• Use backspace on "/" to delete previous digit</li>
                  </ul>
                </div>
              </div>

              <div>
                <Label>Current State:</Label>
                <div className="mt-2 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm">
                    <strong>Selected Date:</strong>
                    {' '}
                    {singleDate ? singleDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }) : 'None'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Raw Date Object:
                    {' '}
                    {singleDate ? singleDate.toISOString() : 'null'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Date Range Type Validation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">📅 Date Range Validation & Input Validation</CardTitle>
            <CardDescription>
              New allowedDateRange prop for automatic future/past date restrictions with real-time input validation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Future Dates Only */}
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">🔮 Future Dates Only</h4>
                  <div className="space-y-2">
                    <Label>Event Date:</Label>
                    <DatePicker
                      singleValue={singleDate}
                      onSingleValueChange={setSingleDate}
                      allowedDateRange="future"
                      placeholder="MM/DD/YYYY"
                    />
                  </div>

                  <div className="mt-3 p-3 bg-white rounded border">
                    <p className="text-sm font-mono mb-2">Code:</p>
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                      {`<DatePicker
  allowedDateRange="future"
  singleValue={date}
  onSingleValueChange={setDate}
/>`}
                    </pre>
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-xs text-blue-700">
                        ✅ Only tomorrow and beyond
                        <br />
                        ✅ Automatically sets min date
                        <br />
                        ✅ Perfect for events/appointments
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Past Dates Only */}
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-2">📜 Past Dates Only</h4>
                  <div className="space-y-2">
                    <Label>Birth Date:</Label>
                    <DatePicker
                      singleValue={basicDate[0] || null}
                      onSingleValueChange={date => setBasicDate(date ? [date] : [])}
                      allowedDateRange="past"
                      placeholder="MM/DD/YYYY"
                    />
                  </div>

                  <div className="mt-3 p-3 bg-white rounded border">
                    <p className="text-sm font-mono mb-2">Code:</p>
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                      {`<DatePicker
  allowedDateRange="past"
  singleValue={date}
  onSingleValueChange={setDate}
/>`}
                    </pre>
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-xs text-amber-700">
                        ✅ Only today and before
                        <br />
                        ✅ Automatically sets max date
                        <br />
                        ✅ Perfect for birth dates/history
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* All Dates (Default) */}
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">🗓️ All Dates (Default)</h4>
                  <div className="space-y-2">
                    <Label>Any Date:</Label>
                    <DatePicker
                      value={basicDate}
                      onValueChange={details => setBasicDate(details.value)}
                      allowedDateRange="all"
                      placeholder="MM/DD/YYYY"
                    />
                  </div>

                  <div className="mt-3 p-3 bg-white rounded border">
                    <p className="text-sm font-mono mb-2">Code:</p>
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                      {`<DatePicker
  allowedDateRange="all"
  value={dates}
  onValueChange={setDates}
/>`}
                    </pre>
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-xs text-gray-700">
                        ✅ No date restrictions
                        <br />
                        ✅ Default behavior
                        <br />
                        ✅ Full calendar access
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Validation Demo */}
            <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-3">🚨 Real-time Input Validation Demo</h4>
              <p className="text-sm text-red-700 mb-3">
                Try typing invalid values to see the validation in action:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Try typing "50" for month:</Label>
                  <DatePicker
                    singleValue={null}
                    onSingleValueChange={() => {}}
                    placeholder="MM/DD/YYYY"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Try typing "99" for day:</Label>
                  <DatePicker
                    singleValue={null}
                    onSingleValueChange={() => {}}
                    placeholder="MM/DD/YYYY"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="mt-3 p-3 bg-white rounded border">
                <p className="text-xs text-red-700">
                  ✅ Month validation: 01-12 only
                  <br />
                  ✅ Day validation: 01-31 only
                  <br />
                  ✅ Numbers turn red when invalid
                  <br />
                  ✅ Error message displayed below
                </p>
              </div>
            </div>

            {/* Feature Summary */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
              <h5 className="font-medium mb-3 text-blue-900">✨ New Features Summary:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h6 className="font-medium text-blue-800 mb-2">allowedDateRange Prop:</h6>
                  <ul className="text-xs space-y-1 text-blue-700">
                    <li>
                      •
                      <code>"future"</code>
                      {' '}
                      - Only tomorrow and beyond
                    </li>
                    <li>
                      •
                      <code>"past"</code>
                      {' '}
                      - Only today and before
                    </li>
                    <li>
                      •
                      <code>"all"</code>
                      {' '}
                      - No restrictions (default)
                    </li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-purple-800 mb-2">Input Validation:</h6>
                  <ul className="text-xs space-y-1 text-purple-700">
                    <li>• Real-time month validation (01-12)</li>
                    <li>• Real-time day validation (01-31)</li>
                    <li>• Numbers turn red when invalid</li>
                    <li>• Error message displayed below</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Comparison Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600">🔄 API Comparison: Single vs Array</CardTitle>
            <CardDescription>
              Side-by-side comparison of our enhanced single date API vs the original array-based API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Single Date API */}
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Single Date API (Recommended)</h4>
                  <div className="space-y-2">
                    <Label>Select Event Date:</Label>
                    <DatePicker
                      singleValue={singleDate}
                      onSingleValueChange={setSingleDate}
                      placeholder="MM/DD/YYYY"
                      min={tomorrow} // Future dates only
                    />
                  </div>

                  <div className="mt-3 p-3 bg-white rounded border">
                    <p className="text-sm font-mono mb-2">Code:</p>
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                      {`<DatePicker
  singleValue={date}
  onSingleValueChange={setDate}
  placeholder="MM/DD/YYYY"
/>`}
                    </pre>
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-xs text-green-700">
                        ✅ Direct date handling
                        <br />
                        ✅ No array indexing
                        <br />
                        ✅ TypeScript-friendly
                        <br />
                        ✅ Simpler state management
                      </p>
                    </div>
                    {singleDate && (
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-xs">
                          <strong>Value:</strong>
                          {' '}
                          {singleDate.toLocaleDateString()}
                        </p>
                        <p className="text-xs">
                          <strong>Type:</strong>
                          {' '}
                          Date | null
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Array API */}
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">⚠️ Array API (Original Zag.js)</h4>
                  <div className="space-y-2">
                    <Label>Select Basic Date:</Label>
                    <DatePicker
                      value={basicDate}
                      onValueChange={details => setBasicDate(details.value)}
                      placeholder="MM/DD/YYYY"
                      min={tomorrow} // Future dates only
                    />
                  </div>

                  <div className="mt-3 p-3 bg-white rounded border">
                    <p className="text-sm font-mono mb-2">Code:</p>
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                      {`<DatePicker
  value={dates}
  onValueChange={(details) =>
    setDates(details.value)
  }
  placeholder="MM/DD/YYYY"
/>`}
                    </pre>
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-xs text-orange-700">
                        ⚠️ Requires dates[0] access
                        <br />
                        ⚠️ Array handling complexity
                        <br />
                        ✅ Supports multiple dates
                        <br />
                        ✅ Original Zag.js compatibility
                      </p>
                    </div>
                    {basicDate.length > 0 && (
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-xs">
                          <strong>Value:</strong>
                          {' '}
                          {basicDate[0]?.toLocaleDateString()}
                        </p>
                        <p className="text-xs">
                          <strong>Type:</strong>
                          {' '}
                          Date[]
                        </p>
                        <p className="text-xs">
                          <strong>Access:</strong>
                          {' '}
                          dates[0]
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Comparison */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium mb-3">Quick Comparison:</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Feature</th>
                      <th className="text-left py-2 text-green-700">Single API</th>
                      <th className="text-left py-2 text-orange-700">Array API</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr className="border-b">
                      <td className="py-2 font-medium">Type Safety</td>
                      <td className="py-2 text-green-600">Date | null</td>
                      <td className="py-2 text-orange-600">Date[]</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Access Pattern</td>
                      <td className="py-2 text-green-600">date</td>
                      <td className="py-2 text-orange-600">dates[0]</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Null Handling</td>
                      <td className="py-2 text-green-600">Built-in</td>
                      <td className="py-2 text-orange-600">Manual length check</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Multiple Dates</td>
                      <td className="py-2 text-red-600">Not supported</td>
                      <td className="py-2 text-green-600">Fully supported</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Best For</td>
                      <td className="py-2 text-green-600">Single date selection</td>
                      <td className="py-2 text-orange-600">Range & multi-selection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Examples with Validation */}
        <Card>
          <CardHeader>
            <CardTitle>Form with Validation Examples</CardTitle>
            <CardDescription>
              React Hook Form + Zod validation with different date constraints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Past Date Only - Birth Date */}
              <div className="space-y-2">
                <Label htmlFor="birth-date">
                  Birth Date
                  {' '}
                  <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">
                  Only past dates allowed (up to 100 years ago)
                </p>
                <DatePicker
                  value={watchedValues.birthDate}
                  onValueChange={details => setValue('birthDate', details.value)}
                  placeholder="MM/DD/YYYY"
                  max={today} // Disable future dates
                  min={hundredYearsAgo} // Disable dates older than 100 years
                  className="w-full"
                />
                {errors.birthDate && (
                  <p className="text-sm text-destructive">{errors.birthDate.message}</p>
                )}
                {watchedValues.birthDate.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Selected:
                    {' '}
                    {watchedValues.birthDate[0]?.toLocaleDateString()}
                  </p>
                )}
              </div>

              <Separator />

              {/* Future Date Only - Event Date */}
              <div className="space-y-2">
                <Label htmlFor="future-date">
                  Future Event Date
                  {' '}
                  <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">
                  Only future dates allowed (starting from tomorrow)
                </p>
                <DatePicker
                  value={watchedValues.futureEventDate}
                  onValueChange={details => setValue('futureEventDate', details.value)}
                  placeholder="MM/DD/YYYY"
                  min={tomorrow} // Disable past and today
                  className="w-full"
                />
                {errors.futureEventDate && (
                  <p className="text-sm text-destructive">{errors.futureEventDate.message}</p>
                )}
                {watchedValues.futureEventDate.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Selected:
                    {' '}
                    {watchedValues.futureEventDate[0]?.toLocaleDateString()}
                  </p>
                )}
              </div>

              <Separator />

              {/* Limited Range - Appointment Date */}
              <div className="space-y-2">
                <Label htmlFor="appointment-date">
                  Appointment Date
                  {' '}
                  <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">
                  Available dates: Next 30 days only
                </p>
                <DatePicker
                  value={watchedValues.appointmentDate}
                  onValueChange={details => setValue('appointmentDate', details.value)}
                  placeholder="MM/DD/YYYY"
                  min={tomorrow}
                  max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 days from now
                  className="w-full"
                />
                {errors.appointmentDate && (
                  <p className="text-sm text-destructive">{errors.appointmentDate.message}</p>
                )}
                {watchedValues.appointmentDate.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Selected:
                    {' '}
                    {watchedValues.appointmentDate[0]?.toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit">Submit Form</Button>
                <Button type="button" variant="outline" onClick={handleReset}>
                  Reset All
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Submitted Data Display */}
        {submittedData && (
          <Card>
            <CardHeader>
              <CardTitle>Submitted Data</CardTitle>
              <CardDescription>
                Form validation passed! Here's the submitted data:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <h4 className="font-medium text-green-800 dark:text-green-200">Birth Date</h4>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      {submittedData.birthDate[0]?.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">Event Date</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      {submittedData.futureEventDate[0]?.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-md">
                    <h4 className="font-medium text-purple-800 dark:text-purple-200">Appointment</h4>
                    <p className="text-sm text-purple-600 dark:text-purple-300">
                      {submittedData.appointmentDate[0]?.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Documentation */}
        <Card>
          <CardHeader>
            <CardTitle>🚀 Features Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">📝 Input Masking</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Type numbers for automatic MM/DD/YYYY formatting</li>
                  <li>• Auto-adds slashes after month and day</li>
                  <li>• Smart backspace handling</li>
                  <li>• Maximum 10 character limit</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">📅 Date Constraints</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Min/Max date validation</li>
                  <li>• Past dates only (birth dates)</li>
                  <li>• Future dates only (events)</li>
                  <li>• Custom date ranges</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">🔗 Form Integration</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• React Hook Form integration</li>
                  <li>• Zod schema validation</li>
                  <li>• Real-time error display</li>
                  <li>• TypeScript support</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">🎨 UI/UX Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Click calendar icon to open (no focus-to-open)</li>
                  <li>• Keyboard navigation support</li>
                  <li>• Disabled date styling</li>
                  <li>• Responsive design & dark mode</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Masking Demonstration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">✨ Input Masking Demo</CardTitle>
            <CardDescription>
              Try typing numbers like "01252025" and watch it automatically format to "01/25/2025"
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mask-demo">Type numbers and see magic happen:</Label>
                <DatePicker
                  singleValue={singleDate}
                  onSingleValueChange={setSingleDate}
                  placeholder="Type: 01252025"
                  className="mt-2"
                />
                <div className="mt-2 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm font-medium text-blue-800">Try these examples:</p>
                  <ul className="text-xs text-blue-600 mt-1 space-y-1">
                    <li>• Type "01252025" → "01/25/2025"</li>
                    <li>• Type "123" → "12/3"</li>
                    <li>• Type "12312024" → "12/31/2024"</li>
                    <li>• Use backspace on "/" to delete previous digit</li>
                  </ul>
                </div>
              </div>

              <div>
                <Label>Current State:</Label>
                <div className="mt-2 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm">
                    <strong>Selected Date:</strong>
                    {' '}
                    {singleDate ? singleDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }) : 'None'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Raw Date Object:
                    {' '}
                    {singleDate ? singleDate.toISOString() : 'null'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
