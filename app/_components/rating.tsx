/* eslint-disable react/no-array-index-key */
'use client';

import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '../../components/ui/typography';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Markus alina',
      text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut etma mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
    },
    {
      name: 'Markus alina',
      text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut etma mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
    },
    {
      name: 'Markus alina',
      text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut etma mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..',
    },
  ];

  return (
    <section className="py-16 px-6 lg:px-16 flex flex-col">
      {/* Heading */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="max-w-full md:max-w-2xl text-center md:text-left">
          <Typography variant="h1" as="h1" weight="normal">
            Listen to
            {' '}
            <Typography as="span" weight="bold" color="custom1">
              what
              {' '}
              <br />
              {' '}
              they say
            </Typography>
            {' '}
            about us
          </Typography>
        </div>

        {/* Arrows - desktop only */}
        <div className="hidden md:flex gap-6">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 border-gray-300"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 border-gray-300"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, idx) => (
          <Card
            key={idx}
            className="rounded-2xl border border-gray-200 shadow-sm flex flex-col"
          >
            <CardContent className="p-6 flex flex-col h-full">
              {/* Profile */}
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded bg-gray-200 flex-shrink-0" />
                <div>
                  <Typography variant="h3" as="h3" weight="semibold" size="sm">
                    {review.name}
                  </Typography>

                  <div className="flex text-[var(--btn-secondary)] mt-1">
                    {[...Array.from({ length: 5 })].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[var(--btn-secondary)]" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <Typography variant="p" size="sm" color="secondary" weight="normal">
                {review.text}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Arrows - mobile only */}
      <div className="flex md:hidden justify-center gap-12 mt-8">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10 border-gray-300"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10 border-gray-300"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}
