/* eslint-disable react/no-array-index-key */
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

const services = [
  'Support Group Therapy',
  'Mind Fullness & Stress Reduction',
  'Mental Health Therapy',
  'Life Coaching Therapy Services',
  'Medication Management',
  'Trauma Inform Therapy',
  'Speech Therapy',
  'Psychologist',
  'Chiropractor',
  'Music Therapist',
  'Exercise Physiologist',
  'Osteopath',
];

export default function ServicesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-16 lg:text-center">
      <Typography variant="h1" weight="normal" color="secondary" as="h1">
        Services
        {' '}
        <Typography as="span" weight="bold" color="primary">
          Providing
        </Typography>
        {' '}
        By
        {' '}
        <Typography as="span" weight="bold" color="custom1">
          GoVita
        </Typography>
        <Typography as="span" weight="bold" color="custom2">
          Med.
        </Typography>
      </Typography>
      <Typography variant="p" color="secondary" size="md" className="max-w-4xl mx-auto mt-4">
        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
        mattis ligula consectetur, ultrices mauris.
      </Typography>

      {/* <p className="mt-4 text-[18px] font-semibold text-[var(--secondary)] max-w-4xl mx-auto">
        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
        mattis ligula consectetur, ultrices mauris.
      </p> */}

      {/* Services Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4  mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-center justify-between border rounded-lg px-4 py-3 text-[var(--secondary)] text-[16px]  shadow-sm hover:shadow-md transition"
          >
            <span>{service}</span>
            <ArrowRight className="w-4 h-4 text-[var(--secondary)]" />
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-10 md:align-center flex justify-center">
        <Button>
          View All Services
          <ArrowUpRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}
