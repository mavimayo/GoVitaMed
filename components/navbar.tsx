/* eslint-disable perfectionist/sort-named-imports */

'use client';

import { Menu, X, Search, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll for background change
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        id="site-header"
        className={`flex items-center justify-between px-4 md:px-7 lg:px-12 py-2 fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          !isScrolled ? 'bg-transparent backdrop-blur-md' : 'bg-white shadow-md'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link href="#">
            <Image
              src="/images/GoVitaMed-logo.png"
              alt="Neopharma Logo"
              width={200}
              height={20}
              className="w-[160px] h-[50px]"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex gap-6 items-center">
            <li>
              <Link href="#" className="text-sm font-medium text-gray-700 hover:text-green-700">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-sm font-medium text-gray-700 hover:text-green-700"
              >
                Services
              </Link>
            </li>

            <li>
              <Link href="#" className="text-sm font-medium text-gray-700 hover:text-green-700">
                Doctors
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm font-medium text-gray-700 hover:text-green-700">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-green-700">
                <Search size={16} className="mr-1" />
                Search
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop Buttons (only Sign In + Start Trial now) */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="primary">Login</Button>
          <Button>
            Join Now
            <ArrowUpRight className="ml-1 h-6 w-6s" />
          </Button>

        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="lg:hidden text-gray-700 ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-[56px] left-0 w-full flex flex-col gap-4 px-6 pb-4 pt-6 z-40 bg-white shadow-md ">
          <ul className="flex flex-col gap-3">
            <li>
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-gray-700 hover:text-green-700">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-green-700"
              >
                Services
              </Link>

            </li>
            <li>
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-gray-700 hover:text-green-700">
                Doctors
              </Link>
            </li>
            <li>
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-gray-700 hover:text-green-700">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center text-sm font-medium text-gray-700 hover:text-green-700">
                <Search size={16} className="mr-1" />
                Search
              </Link>
            </li>
          </ul>

          {/* Mobile Buttons */}
          <div className="flex gap-2 mt-2">
            <Button className="flex-1">Sign In</Button>
            <Button className="flex-1">Start Trial</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
