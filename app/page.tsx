'use client';

import FAQSection from '@/app/_components/bg-green';
import Portals from '@/app/_components/portals';
import Testimonials from '@/app/_components/rating';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import AboutSection from './_components/about';
import Appointment from './_components/appointment';
import Hero from './_components/hero';
import HowItWorks from './_components/how-it-works';
import ServicesSection from './_components/service-section';
import Specialists from './_components/specialist';

// import ServicesSection from '@/components/service-section';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ServicesSection />
      <AboutSection />
      <Appointment />
      <HowItWorks />
      <Specialists />
      <Portals />
      <Testimonials />
      <FAQSection />

      <Footer />

    </main>
  );
}
