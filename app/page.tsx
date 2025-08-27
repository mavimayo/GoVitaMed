'use client';

import AboutSection from '@/components/about';
import Appointment from '@/components/appointment';
import FAQSection from '@/components/bg-green';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import HowItWorks from '@/components/how-it-works';
import Navbar from '@/components/navbar';
import Portals from '@/components/portals';
import Testimonials from '@/components/rating';
import ServicesSection from '@/components/service-section';
import Specialists from '@/components/specialist';

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
