'use client';
import * as z from 'zod';
import { DatepickerFormField, InputFormField } from '@/components/form';
import FormModified from '@/components/form/form-modified';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  dob: z.date(),
});

export default function Home() {
  const handleSubmit = (data: z.infer<typeof schema>) => {
    console.log('Form submitted:', data);
    // Handle form submission here
  };

  return (
    <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Typography as="h1">Hello</Typography>

      <FormModified
        schema={schema}
        onSubmit={handleSubmit}
        defaultValues={{
          description: '',
        }}
      >
        {form => (
          <>
            <InputFormField
              name="name"
              label="Name"
              placeholder="Enter your name"
              control={form.control}
            />
            <InputFormField
              name="description"
              label="Description"
              placeholder="Enter a description"
              control={form.control}
            />
            <DatepickerFormField
              name="dob"
              label="Date of Birth"
              control={form.control}
            />
            <Button type="submit">
              Submit
            </Button>
          </>
        )}
      </FormModified>
    </div>
  );
}
