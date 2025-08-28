'use client';

import { ArrowUpRight, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Typography } from '../../components/ui/typography';

export default function FAQSection() {
  return (
    <>
      <section className="bg-[#99E8A080] rounded-2xl pt-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mx-4 sm:mx-6 md:mx-12 lg:mx-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left ">
            <Typography variant="h1" as="h1" color="secondary">
              Most Common
              {' '}
              <Typography as="span" color="custom1" weight="bold">
                Questions
              </Typography>
              {' '}
              Asked by People.
            </Typography>

            <Typography
              variant="p"
              color="secondary"
            >
              Find the answers to frequently asked questions here.
            </Typography>

            <div className="mt-6 flex items-center gap-3 justify-center md:justify-start">
              <HelpCircle size={20} />
              <span className="text-gray-800 font-medium text-sm sm:text-base">
                Need Further Support?
              </span>
            </div>

            <div className="mt-4 flex justify-center md:justify-start">
              <Button>
                Contact Us Now
                {' '}
                <ArrowUpRight size={16} />
              </Button>
            </div>

            <div className="mt-auto flex justify-center md:justify-start lg:relative top-11 left-12">
              <Image
                src="/images/FAQ.png"
                alt="GoVitaMed Capsule"
                width={250}
                height={250}
                className="sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px] object-contain"
              />
            </div>
          </div>

          {/* Right Side (Accordion) */}
          <div className="space-y-4 w-full mb-6">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-white rounded-xl shadow-sm px-4 h-20 data-[state=open]:h-auto transition-all duration-300 flex flex-col justify-center"
              >
                <AccordionTrigger className="text-sm font-semibold">
                  How To I Register For GoVitaMed Patient Account?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm pb-4 flex items-center">
                  It’s quick and simple to register for GoVitaMed account.
                  <br />
                  Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut et massa
                  mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
                  mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-white rounded-xl shadow-sm px-4 h-20 data-[state=open]:h-auto transition-all duration-300 flex flex-col justify-center"
              >
                <AccordionTrigger className="text-sm font-semibold">
                  How To I Register For GoVitaMed Patient/Theripist Account?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm pb-4 flex items-center">
                  Registration process is similar for both patient and therapist accounts.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-white rounded-xl shadow-sm px-4 h-20 data-[state=open]:h-auto transition-all duration-300 flex flex-col justify-center"
              >
                <AccordionTrigger className="text-sm font-semibold">
                  How Can I Book Session For Therapist?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm pb-4 flex items-center">
                  You can easily book therapist sessions directly through your account dashboard.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-white rounded-xl shadow-sm px-4 h-20 data-[state=open]:h-auto transition-all duration-300 flex flex-col justify-center"
              >
                <AccordionTrigger className="text-sm font-semibold">
                  Is Our Payment Refundable?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm pb-4 flex items-center">
                  Yes, payments are refundable based on our refund policy.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Heartbeat line outside the container */}
      <div className="w-full mt-4 sm:mt-6 md:mt-10">
        <Image
          src="/images/Vector-green.png"
          alt="Heartbeat Line"
          width={1600}
          height={50}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </>
  );
}
