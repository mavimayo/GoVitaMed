/* eslint-disable react/no-array-index-key */
/* eslint-disable perfectionist/sort-imports */

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

export default function Services() {
  const services = [
    { title: 'Mental Therapy', icon: '/images/icons/brain 1.png' },
    { title: 'Muscle Pull Therapy', icon: '/images/icons/Compression Wrap.png' },
    { title: 'Cognitive Behavioral Therapy', icon: '/images/icons/therapy 1.png' },
    { title: 'Mental Therapy', icon: '/images/icons/brain 1.png' },
    { title: 'Support Group Therapy', icon: '/images/icons/unity 1.png' },
    { title: 'Mind Fullness & Stress Reduction', icon: '/images/icons/brain 3.png' },
    { title: 'Life Coaching Therapy Services', icon: '/images/icons/mentoring 1.png' },
    { title: 'Medication Management', icon: '/images/icons/medicine 1.png' },
    { title: 'Chiropractor', icon: '/images/icons/Chiropractor.png' },
    { title: 'Music Therapist', icon: '/images/icons/music-therapy 1.png' },
    { title: 'Speech Therapy', icon: '/images/icons/king 1.png' },
    { title: 'Psychologist', icon: '/images/icons/psychologist 1.png' },
  ];

  return (
    <section className="py-16 px-6 lg:px-16">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Typography variant="h1" as="h2">
          <Typography as="span" color="custom1" weight="bold">
            GoVita
          </Typography>
          <Typography as="span" color="custom2" weight="bold">
            Med
          </Typography>
          {' '}
          Services
        </Typography>

        <Typography
          variant="p"
          color="secondary"
          weight="normal"
          size="sm"
          className="mt-4"
        >
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices.
        </Typography>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
        {services.map((service, i) => (
          <Card
            key={i}
            className="rounded-2xl border  shadow-sm hover:shadow-md transition flex flex-col bg-[#FAFAFA]"
          >
            <CardContent className="p-6 flex flex-col h-full">
              {/* Icon */}
              <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-[#EBEBEB] mb-4">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <Typography
                variant="h3"
                as="h3"
                size="sm"
                weight="bold"
                className="mb-2"
              >
                {service.title}
              </Typography>

              {/* Description */}
              <Typography
                variant="p"
                size="sm"
                color="tertiary"
                weight="normal"
                className="mb-6"
              >
                Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                sapien fringilla, mattis ligula consectetur, ultrices.
              </Typography>

              {/* CTA Button (aligned right) */}
              <Button
                variant="tertiary"
                className="mt-auto ml-auto px-0 text-sm border-none flex items-center gap-1"
              >
                View Details
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
