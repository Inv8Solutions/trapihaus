"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footerr() {
  return (
    <footer className="bg-[#1078CF] text-white rounded-t-[40px] relative -mt-20 z-10">
      <div className="max-w-7xl mx-auto px-1 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center flex-none">
              <Image src="/logo.png" alt="TrapiHaus" width={160} height={80} className="h-[80px] w-auto" style={{ width: 'auto' }} />
            </Link>
            <p className="text-blue-100 font-lexend leading-relaxed mb-6 mt-4 text-[20px]">
              Your trusted hyperlocal marketplace for safe, compliant, and affordable stays in Baguio City.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-blue-500 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[20px] font-semibold mb-10 font-lexend mt-10">Quick Links</h4>
            <ul className="space-y-3">
              <li>
          <a href="#" className="text-blue-100 hover:text-white transition-colors font-lexend">
            Browse Stays
          </a>
              </li>
              <li>
          <a href="#" className="text-blue-100 hover:text-white transition-colors font-lexend">
            How It Works
          </a>
              </li>
              <li>
          <a href="#" className="text-blue-100 hover:text-white transition-colors font-lexend">
            About Us
          </a>
              </li>
              <li>
          <a href="#" className="text-blue-100 hover:text-white transition-colors font-lexend">
            List Your Property
          </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[20px] font-semibold mb-10 font-lexend mt-10">Support</h4>
            <ul className="space-y-3">
              <li>
          <a href="#" className="text-blue-100 hover:text-white transition-colors font-lexend">
            Contact Us
          </a>
              </li>
              <li>
          <a href="#" className="text-blue-100 hover:text-white transition-colors font-lexend">
            Help Center
          </a>
              </li>
              <li>
          <a href="#" className="text-blue-100 hover:text-white transition-colors font-lexend">
            Terms Of Service
          </a>
              </li>
              <li>
          <a href="#" className="text-blue-100 hover:text-white transition-colors font-lexend">
            Privacy Policy
          </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[20px] font-semibold mb-10 font-lexend mt-10">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-blue-100">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-lexend">Baguio City, Philippines</span>
              </li>
              <li className="flex items-center gap-3 text-blue-100">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="font-lexend">+63 912 4567 890</span>
              </li>
              <li className="flex items-center gap-3 text-blue-100">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="font-lexend">Trapihaus@Email.Com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-blue-500 mt-12 pt-8 text-center">
          <p className="text-blue-100 font-lexend">
            © 2024 Trapihaus. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
