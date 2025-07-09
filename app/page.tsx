'use client';
import * as z from 'zod';
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
        warnOnUnsavedChanges={true}
        unsavedChangesMessage="You have unsaved form data. Are you sure you want to leave this page?"
      >
        {({ components }) => (
          <>
            <components.Input
              name="name"
              label="Name"
              placeholder="Enter your name"
            />
            <components.Textarea
              name="description"
              label="Description"
              placeholder="Enter a description"
              className="h-32"
            />
            <components.DatePicker
              name="dob"
              label="Date of Birth"

              className="w-full"
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
