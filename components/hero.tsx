'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Typography } from './ui/typography';

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 pt-36 sm:py-12 lg:pt-32  grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 items-center gap-8 lg:gap-12">

        {/* Right Image */}
        <div className="relative flex justify-center order-1 lg:order-2 md:order-2 md:pt-28">
          <Image
            src="/images/FAQ.png"
            alt="GoVitaMed Capsule"
            width={250}
            height={250}
            className="sm:w-64 sm:h-64 md:w-96 md:h-96 lg:w-full lg:h-[500px] object-contain opacity-20"
            priority
          />
          <Image
            src="/images/hero-section.png"
            alt="Doctors"
            width={600}
            height={600}
            className="absolute bottom-0 sm:w-64 sm:h-64 md:w-full md:h-[300px] lg:w-full lg:h-[500px] object-contain"
            priority
          />
        </div>

        {/* Left Content */}
        <div className="text-left order-1 lg:order-1 lg:pb-12 ">
          <Typography variant="h3"> Welcome To GoVitaMed</Typography>
          <Typography variant="h1" as="h1" className="font-bold leading-tight">
            Your
            {' '}
            <Typography as="span" color="custom1">
              Journey
            </Typography>
            {' '}
            to
            {' '}
            <Typography as="span" color="custom2">
              Wellness
            </Typography>
            {' '}
            Begins Here.
          </Typography>
          <p className="text-[var(--primary)] font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] mb-6 max-w-lg">
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.
          </p>

          {/* Search Bar */}
          <div className="flex items-center rounded-md border border-gray-300 overflow-hidden mb-6 w-full max-w-md">
            <input
              type="text"
              placeholder="Search Services, doctors..."
              className="flex-1 px-3 sm:px-4 py-2 focus:outline-none text-gray-700 text-sm sm:text-base"
            />
            <Button variant="primary" className="p-2 sm:p-3">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button variant="primary" className="hover:bg-green-700 w-full sm:w-auto">
              Book Appointment
            </Button>
            <Button className="w-full sm:w-auto lg:mb-16 sm:mb-0">
              View Services
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Image */}
      <div className="absolute lg:bottom-26 xl:bottom-4 md:bottom-12  left-0 w-full ">
        <Image
          src="/images/Vector.png"
          alt="Heartbeat Line"
          width={1600}
          height={50}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </section>
  );
}
