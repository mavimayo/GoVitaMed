'use client';

import Image from 'next/image';
import { Typography } from '@/components/ui/typography';

export default function Section() {
  return (
    <section className="relative w-full rounded-2xl overflow-hidden">
      <div className="mx-auto px-6 sm:px-10 lg:px-12">
        {/* Background Image */}
        <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
          <Image
            src="/images/muscle-therapy.png"
            alt="Healthcare"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay Text */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-6 sm:px-10 lg:px-32">
          <Typography variant="h1" as="h2" className="font-bold text-white leading-tight text-4xl sm:text-5xl lg:text-6xl">
            <span className="text-[var(--btn-primary)]">GoVita</span>
            {' '}
            <span className="text-[var(--btn-secondary)]">Med</span>
            {' '}
            Services
          </Typography>

          <Typography variant="p" className="mt-4 text-white/90 max-w-lg text-lg sm:text-xl">
            Your trusted partner for wellness and medical solutions, ensuring your health journey is supported every step of the way.
          </Typography>
        </div>
      </div>
    </section>
  );
}
