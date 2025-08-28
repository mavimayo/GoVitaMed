import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

export default function HowItWorks() {
  return (
    <section className="py-16 px-6 lg:px-16 lg:mt-20">
      {/* Heading */}
      <div className="lg:text-center max-w-6xl mx-auto mb-12">
        <Typography variant="h1" as="h1" weight="normal">
          Find How Do
          {' '}
          <Typography as="span" color="custom1" weight="bold">
            GoVita
          </Typography>
          {' '}
          <Typography as="span" color="custom2" weight="bold">
            Med
          </Typography>
          {' '}
          Works?
        </Typography>
        <Typography variant="p" color="secondary">
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
          tellus.
        </Typography>

      </div>

      {/* Cards + Image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        <div className="flex justify-center items-center order-1 lg:order-4 col-span-1 sm:col-span-2 lg:col-span-1">
          <Image
            src="/images/work.png"
            alt="Doctor consultation"
            width={700}
            height={700}
            className="rounded-2xl shadow-md object-cover h-full w-full md:max-w-[400px]"
          />
        </div>

        {/* Card 1 */}
        <Card className="shadow-md rounded-2xl bg-[#F5F5F5] order-2 lg:order-1 col-span-1 h-full">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            {/* Top content */}
            <div className="space-y-4">
              <Typography variant="h3" as="h3">Sign Up and Get Started</Typography>

              <Typography
                variant="p"
                color="secondary"
                size="sm"
                weight="normal"
                className="pt-6"
              >
                Easy and FREE Registration: Begin by signing up with just a few
                clicks. Create your account and set up your profile with basic
                information about your health and preferences. Your information is
                securely stored and HIPPA protected, ensuring your privacy.
              </Typography>
            </div>
            <div className="mt-4">
              <Button variant="secondary">
                Create Your Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="shadow-md rounded-2xl bg-[#F5F5F5] order-3 lg:order-2 col-span-1 h-full">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            {/* Top content */}
            <div className="space-y-4">
              <Typography variant="h3" as="h3">Find our Healthcare Services</Typography>
              <Typography
                variant="p"
                color="secondary"
                size="sm"
                weight="normal"
                className="pt-6"
              >
                Choose how you want to connect with the provider—through platform
                messaging, or a scheduled video or phone call. Opt for local or
                home medication delivery, schedule home lab services, and
                customize your health care experience to fit your lifestyle.
              </Typography>
            </div>
            <div className="mt-4">
              <Button variant="secondary">
                Choose a Service
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="shadow-md rounded-2xl bg-[#F5F5F5] order-4 lg:order-3 col-span-1 h-full">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            {/* Top content */}
            <div className="space-y-4">
              <Typography variant="h3" as="h3">One Medical Record</Typography>
              <Typography
                variant="p"
                color="secondary"
                size="sm"
                weight="normal"
                className="pt-6"
              >
                Choose how you want to connect with the provider—through platform
                messaging, or a scheduled video or phone call. Opt for local or
                home medication delivery, schedule home lab services, and
                customize your health care experience to fit your lifestyle.
              </Typography>
            </div>
            <div className="mt-4">
              <Button variant="secondary">
                Book Appointment
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </section>
  );
}

// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';

// export default function HowItWorks() {
//   return (
//     <section className="py-16 px-6 lg:px-20 bg-white">
//       {/* Heading */}
//       <div className="text-center max-w-4xl mx-auto mb-12">
//         <h2 className="mb-4 font-normal text-[40px]">
//           Find How Do
//           {' '}
//           <span className="text-[var(--btn-primary)] font-bold">GoVita</span>
//           <span className="text-[var(--btn-secondary)] font-bold">Med</span>
//           {' '}
//           Works?
//         </h2>
//         <p className="text-[var(--secondary)] text-[16px]">
//           Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
//           Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
//           mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
//           tellus.
//         </p>
//       </div>

//       {/* Cards + Image in one row */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
//         {/* Card 1 */}
//         <Card className="shadow-md rounded-2xl bg-[#F5F5F5] lg:col-span-2">
//           <CardContent className="p-6 flex flex-col space-y-4">
//             <h3 className="text-[24px] font-bold pb-6">Sign Up and Get Started</h3>
//             <p className="text-gray-600 text-sm leading-relaxed">
//               Easy and FREE Registration: Begin by signing up with just a few
//               clicks. Create your account and set up your profile with basic
//               information about your health and preferences. Your information is
//               securely stored and HIPPA protected, ensuring your privacy.
//             </p>
//             <Button className="w-fit bg-[#F5F5F5] text-black border-2 border-gray-400 hover:bg-[#F5F5F5] hover:text-black hover:border-black">
//               Create Your Account
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Card 2 */}
//         <Card className="shadow-md rounded-2xl bg-[#F5F5F5] lg:col-span-2">
//           <CardContent className="p-6 flex flex-col space-y-4">
//             <h3 className="text-[24px] font-bold pb-6">Find our Healthcare Services</h3>
//             <p className="text-gray-600 text-sm leading-relaxed">
//               Choose how you want to connect with the provider—through platform
//               messaging, or a scheduled video or phone call. Opt for local or
//               home medication delivery, schedule home lab services, and
//               customize your health care experience to fit your lifestyle.
//             </p>
//             <Button className="w-fit bg-[#F5F5F5] text-black border-2 border-gray-400 hover:bg-[#F5F5F5] hover:text-black hover:border-black">
//               Choose a Service
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Card 3 */}
//         <Card className="shadow-md rounded-2xl bg-[#F5F5F5] lg:col-span-2">
//           <CardContent className="p-6 flex flex-col space-y-4">
//             <h3 className="text-[24px] font-bold pb-6">One Medical Record</h3>
//             <p className="text-gray-600 text-sm leading-relaxed">
//               Choose how you want to connect with the provider—through platform
//               messaging, or a scheduled video or phone call. Opt for local or
//               home medication delivery, schedule home lab services, and
//               customize your health care experience to fit your lifestyle.
//             </p>
//             <Button className="w-fit bg-[#F5F5F5] text-black border-2 border-gray-400 hover:bg-[#F5F5F5] hover:text-black hover:border-black">
//               Book Appointment
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Image */}
//         <div className="flex justify-center items-center lg:col-span-6">
//           <Image
//             src="/images/work.png"
//             alt="Doctor consultation"
//             width={800}
//             height={800}
//             className="rounded-2xl shadow-md object-cover h-full w-full"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }
