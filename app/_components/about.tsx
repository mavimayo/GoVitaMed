'use client';

import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

export default function AboutSection() {
  return (
    <section className="lg:text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Heading */}

      <Typography variant="h1" as="h1" className="leading-tight text-center">
        <Typography as="span" color="custom1" weight="bold">
          About
        </Typography>
        {' '}
        <Typography as="span" color="secondary">
          Us
        </Typography>
      </Typography>

      {/* Paragraph */}
      <Typography variant="p" size="xl" className="mt-6 leading-[1.1]">
        <Typography variant="spanParagraph" as="span" color="secondary">
          Dorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
          Nunc Vulputate Libero Et Velit Interdum, Ac Aliquet Odio Mattis.
          Class Aptent Taciti Sociosqu Ad Litora
        </Typography>
        {' '}
        <Typography variant="spanParagraph" as="span" color="tertiary">
          Torquent Per Conubia Nostra, Per Inceptos Himenaeos. Curabitur Tempus
          Urna At Turpis Condimentum Lobortis. Ut Commodo Efficitur Neque.
        </Typography>
      </Typography>

      {/* Button */}
      <div className="mt-8 flex justify-center">
        <Button className="font-medium rounded-md flex items-center gap-2 text-sm sm:text-base">
          Learn More About Us
          <ArrowUpRight size={14} />
        </Button>
      </div>
    </section>
  );
}
