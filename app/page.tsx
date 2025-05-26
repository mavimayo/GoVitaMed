'use client';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import DatePicker from '@/components/zag/date-picker';
import { useTypedFetch, useTypedInvalidation } from '@/lib/query';

export default function Home() {
  const query = useTypedFetch('all', {
    params: {
      id: 1,
    },
    searchParams: {
      searchParams: 'test',
    },

  });
  console.log(query);
  const { invalidateQuery } = useTypedInvalidation();

  return (
    <div className="grid w-full  grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <Typography as="h1">Hello</Typography>
      <Button onClick={() => {
        invalidateQuery('all', {
          id: 1,
        });
      }}
      >
        Button
      </Button>
      <DatePicker />
    </div>
  );
}
