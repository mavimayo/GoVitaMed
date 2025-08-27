/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className="">
      {/* Main Footer */}
      <div className=" px-6 py-2 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-700 mb-12 mx-12">

        {/* Logo + Contact */}
        <div>
          <div className="flex items-center gap-2">
            <img src="/images/GoVitaMed-logo.png" alt="GoVitaMed" className="w-40 h-15" />
          </div>

          <p className="mt-4">enquiries@govitamed.com</p>
          <p className="mt-1">Call Us at: +123456789</p>

          <div className="flex gap-4 mt-4 text-black">
            <Link href="#"><Facebook size={18} /></Link>
            <Link href="#"><Instagram size={18} /></Link>
            <Link href="#"><Youtube size={18} /></Link>
            <Link href="#"><Linkedin size={18} /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-blue-700">About</Link></li>
            <li><Link href="#" className="hover:text-blue-700">Services</Link></li>
            <li><Link href="#" className="hover:text-blue-700">File a Complaint</Link></li>
            <li><Link href="#" className="hover:text-blue-700">Therapist</Link></li>
          </ul>
        </div>

        {/* Our Policies */}
        <div>
          <h3 className="font-bold mb-4">Our Policies</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-blue-700">Terms of Services</Link></li>
            <li><Link href="#" className="hover:text-blue-700">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-blue-700">Refund Policy</Link></li>
          </ul>
        </div>

        {/* Mailing List */}
        <div>
          {/* <Typography variant="h3">Join Our Mailing List.</Typography> */}
          <h3 className="font-bold mb-4">Join Our Mailing List.</h3>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email address"
              className="border-b border-gray-400 focus:outline-none focus:border-blue-700 p-1 text-sm"
            />
            <Button
              className=" rounded-md w-fit flex items-center"
            >
              Subscribe
              <ArrowUpRight className="ml-1 h-6 w-6s" />
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[var(--btn-primary)] text-white text-center py-3 text-xs">
        Copyrights © 2025 Tritmint, All Rights Reserved
      </div>
    </footer>
  );
}
