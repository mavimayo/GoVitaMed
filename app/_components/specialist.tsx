/* eslint-disable react/no-array-index-key */
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

const specialists = [
  {
    name: 'Dr. Annie',
    role: 'Psychologist',
    image: '/images/dr-annie.png',
  },
  {
    name: 'Dr. Joe',
    role: 'Dermatologist',
    image: '/images/joe.png',
  },
  {
    name: 'Dr. Devid',
    role: 'Physiotherapist',
    image: '/images/devid.png',
  },
  {
    name: 'Dr. Meledy',
    role: 'Gynecologist',
    image: '/images/meledy.png',
  },
];

export default function Specialists() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-16">
      {/* Heading */}
      <div className="lg:text-center max-w-5xl mx-auto mb-12">
        <Typography variant="h1" as="h1" className="text-center">
          Our
          {' '}
          <Typography as="span" color="custom1" weight="bold">
            Specialists
          </Typography>
        </Typography>

        <Typography variant="p" color="secondary" size="sm" weight="normal">
          Lorem ipsum dolor sit amet consectetur adipiscing elit ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.
        </Typography>

      </div>

      {/* Specialists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {specialists.map((doc, index) => (
          <Card key={index} className="rounded-2xl shadow-md overflow-hidden border border-gray-100">
            <div className="relative w-full h-80 sm:h-80 md:h-96 lg:h-[350px]">
              <Image
                src={doc.image}
                alt={doc.name}
                fill
                className="object-cover"
              />

              {/* Overlay for Name & Role */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 bg-[var(--bg-secondary)] bg-opacity-50 p-3 sm:p-4 rounded-lg">
                <h3 className="font-semibold text-base sm:text-lg">{doc.name}</h3>
                <p className="text-xs sm:text-sm">{doc.role}</p>
              </div>

            </div>
          </Card>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center ">
        <Button className="w-40">
          View All
          <ArrowUpRight size={14} />
        </Button>
      </div>
    </section>
  );
}
