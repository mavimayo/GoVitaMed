/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Typography } from './ui/typography';

export default function Footer() {
  return (
    <footer className="">
      {/* Main Footer */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-700 mb-12">

        {/* Logo + Contact */}
        <div>
          <div className="flex items-center gap-2 s">
            <img src="/images/GoVitaMed-logo.png" alt="GoVitaMed" className="w-32 sm:w-40 h-auto" />
          </div>
          <Typography variant="p" size="sm" color="secondary" weight="normal" className="py-2">enquiries@govitamed.com </Typography>
          <Typography variant="p" size="sm" color="secondary" weight="normal">Call Us at: +123456789 </Typography>
          {/* <p className="mt-4 break-words">enquiries@govitamed.com</p> */}
          {/* <p className="mt-1">Call Us at: +123456789</p> */}

          <div className="flex gap-4 mt-4 text-black">
            <Link href="#"><Facebook size={18} /></Link>
            <Link href="#"><Instagram size={18} /></Link>
            <Link href="#"><Youtube size={18} /></Link>
            <Link href="#"><Linkedin size={18} /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <Typography variant="p" size="sm" weight="bold">
            Quick Links
          </Typography>
          {/* <h3 className="font-bold mb-4">Quick Links</h3> */}
          <ul className="space-y-3 pt-2 ">
            <li><Link href="#">About</Link></li>
            <li><Link href="#">Services</Link></li>
            <li><Link href="#">File a Complaint</Link></li>
            <li><Link href="#">Therapist</Link></li>
          </ul>
        </div>

        {/* Our Policies */}
        <div>
          <Typography variant="p" size="sm" weight="bold">
            Our Policies
          </Typography>
          {/* <h3 className="font-bold mb-4">Our Policies</h3> */}
          <ul className="space-y-3 pt-2">
            <li><Link href="#">Terms of Services</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Refund Policy</Link></li>
          </ul>
        </div>

        {/* Mailing List */}
        <div>
          <Typography variant="p" size="sm" weight="bold">
            Join Our Mailing List.
          </Typography>

          <form className="flex flex-col sm:flex-row sm:items-center gap-3">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 border-b p-1 text-sm"
            />
          </form>
          <Button className="rounded-md w-fit flex items-center mt-6">
            Subscribe
            <ArrowUpRight className="ml-1 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full bg-[var(--btn-primary)] text-white py-3 px-2 text-[10px] sm:text-xs leading-snug text-center">
        Copyrights © 2025 Tritmint, All Rights Reserved
      </div>

    </footer>
  );
}
