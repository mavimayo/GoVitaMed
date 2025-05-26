'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import DatePicker from '@/components/zag/date-picker';

export default function DatePickerValidationTest() {
  const [futureDate, setFutureDate] = useState<Date | null>(null);
  const [pastDate, setPastDate] = useState<Date | null>(null);
  const [anyDate, setAnyDate] = useState<Date | null>(null);

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Date Picker Validation Test</h1>
          <p className="text-muted-foreground">
            Test the new allowedDateRange prop and input validation features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Future Dates Only */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Future Dates</CardTitle>
              <CardDescription>
                Only tomorrow and beyond allowed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Event Date:</Label>
                <DatePicker
                  allowedDateRange="future"
                  singleValue={futureDate}
                  onSingleValueChange={setFutureDate}
                  placeholder="MM/DD/YYYY"
                  className="mt-1"
                />
              </div>
              {futureDate && (
                <div className="p-2 bg-blue-50 rounded text-sm">
                  <strong>Selected:</strong>
                  {' '}
                  {futureDate.toLocaleDateString()}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Past Dates Only */}
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-600">Past Dates</CardTitle>
              <CardDescription>
                Only today and before allowed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Birth Date:</Label>
                <DatePicker
                  allowedDateRange="past"
                  singleValue={pastDate}
                  onSingleValueChange={setPastDate}
                  placeholder="MM/DD/YYYY"
                  className="mt-1"
                />
              </div>
              {pastDate && (
                <div className="p-2 bg-amber-50 rounded text-sm">
                  <strong>Selected:</strong>
                  {' '}
                  {pastDate.toLocaleDateString()}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Any Date */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-600">Any Date</CardTitle>
              <CardDescription>
                No restrictions (default)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Any Date:</Label>
                <DatePicker
                  allowedDateRange="all"
                  singleValue={anyDate}
                  onSingleValueChange={setAnyDate}
                  placeholder="MM/DD/YYYY"
                  className="mt-1"
                />
              </div>
              {anyDate && (
                <div className="p-2 bg-gray-50 rounded text-sm">
                  <strong>Selected:</strong>
                  {' '}
                  {anyDate.toLocaleDateString()}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Input Validation Test */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">🧪 Input Validation Test</CardTitle>
            <CardDescription>
              Try typing invalid values to test the validation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">
                  Type "50" for month (should turn red):
                </Label>
                <DatePicker
                  singleValue={null}
                  onSingleValueChange={() => {}}
                  placeholder="MM/DD/YYYY"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">
                  Type "12/99" for invalid day (should turn red):
                </Label>
                <DatePicker
                  singleValue={null}
                  onSingleValueChange={() => {}}
                  placeholder="MM/DD/YYYY"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="mt-4 p-3 bg-white rounded border">
              <h4 className="font-medium mb-2">Expected Behavior:</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Invalid month (13, 50, etc.) → Numbers turn red + error message</li>
                <li>• Invalid day (32, 99, etc.) → Numbers turn red + error message</li>
                <li>• Valid input (12/25/2025) → Normal black text, no error</li>
                <li>• Calendar respects allowedDateRange restrictions</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Quick Test Instructions */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-600">✅ Quick Test Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Date Range Tests:</h4>
                <ul className="space-y-1 text-green-700">
                  <li>□ Future date picker: Try selecting yesterday (should be disabled)</li>
                  <li>□ Past date picker: Try selecting tomorrow (should be disabled)</li>
                  <li>□ Any date picker: All dates should be selectable</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Input Validation Tests:</h4>
                <ul className="space-y-1 text-green-700">
                  <li>□ Type "50" → Red text + month error message</li>
                  <li>□ Type "13/99" → Red text + day error message</li>
                  <li>□ Type "12/25/2025" → Normal text, no error</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
