import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '../../components/ui/typography';

export default function Portals() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-13 ">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12 px-2 sm:px-0">
        <Typography variant="h1" as="h1">
          Our
          {' '}
          <Typography as="span" color="custom1" weight="bold">
            Portals
          </Typography>
        </Typography>
        <Typography variant="p" size="sm" color="secondary" weight="normal">Stay one step ahead with our web portals & get advance features.</Typography>
      </div>

      {/* Portals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-4">
        <Card className="bg-[#94A9E080] rounded-2xl shadow-md p-4 sm:p-6">
          <CardContent className="space-y-2">
            <Typography variant="h3">Patient Portal</Typography>
            <Typography variant="p" size="sm" color="secondary"> Secure access to your appointments, prescriptions, and health records — all in one place.</Typography>

            <div className="rounded-lg overflow-hidden border  w-52 sm:w-64 md:w-70 mx-auto">
              <Image
                src="/images/portal.png"
                alt="Patient Portal"
                width={400}
                height={240}
                className="object-cover w-full h-auto"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--bg-secondary)] rounded-2xl shadow-md p-4 sm:p-6">
          <CardContent className="space-y-2">

            <Typography variant="h3">Therapist Portal</Typography>
            <Typography variant="p" size="sm" color="secondary"> Manage bookings, prescriptions, and patient care with one simple, secure platform.</Typography>

            <div className="rounded-lg overflow-hidden border w-56 sm:w-64 md:w-70 mx-auto">
              <Image
                src="/images/portal.png"
                alt="Therapist Portal"
                width={400}
                height={240}
                className="object-cover w-full h-auto"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
