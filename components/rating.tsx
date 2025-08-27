'use client';

import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
    <section className="py-16 px-6 lg:px-16">
      {/* Heading */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="max-w-full md:max-w-2xl text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900">
            Listen to
            {' '}
            <span className="font-bold text-[var(--btn-primary)]">
              what they say
            </span>
            {' '}
            about us
          </h2>
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-3">
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
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {review.name}
                  </h3>
                  <div className="flex text-green-600 mt-1">
                    {[...Array.from({ length: 5 })].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-green-600" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {review.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
