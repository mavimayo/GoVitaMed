'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

export default function Appointment() {
  return (
    <section className="relative bg-[#F5F5F5] mx-4 sm:mx-6 lg:mx-16 rounded-2xl  lg:mt-20 mt-12  ">
      <div className="px-4 sm:px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 sm:gap-16 lg:gap-24">

        {/* Left Image */}

        <div className="relative flex items-end lg:justify-start order-1 lg:order-1 h-64 sm:h-80 lg:h-[550px] md:mt-8">
          <Image
            src="/images/appointment.png"
            alt="Doctors"
            fill
            className="object-bottom object-contain"
            priority
          />
        </div>

        {/* Right Content */}
        <div className=" lg:text-left order-2 mt-2 lg:mt-2">
          <Typography variant="h1" as="h1" weight="bold">
            Get
            {' '}
            <Typography as="span" color="custom1">
              Appointment
            </Typography>
            {' '}
            For Your
            {' '}
            <Typography as="span" color="custom2">
              Child
            </Typography>
          </Typography>
          <Typography variant="p" color="secondary">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
          </Typography>
          {/* <p className="text-[var(--primary)] mb-6 max-w-lg text-sm sm:text-base mx-auto lg:mx-0">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
          </p> */}

          <Button
            className="hover:bg-green-700 w-full sm:w-auto mt-6 mb-4 md:mb-4 mx-auto md:mx-auto lg:mx-0 flex justify-center"
          >
            Get Appointment
          </Button>

        </div>
      </div>
    </section>
  );
}
