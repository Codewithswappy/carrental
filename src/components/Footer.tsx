"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconPhone,
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandLinkedin,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-neutral-900 font-sans border-t border-neutral-200 select-none pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* TOP SECTION: BRAND LOGO & LINKS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-neutral-200">
          
          {/* Column 1: Custom Logo & Short Description (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="INDIDRIVE Car Rental Logo"
                width={150}
                height={45}
                priority
                className="h-9 w-auto object-contain"
              />
            </Link>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-sm font-normal">
              India's premier self-drive and chauffeur vehicle rental platform. Experience doorstep delivery, zero security deposit waivers, and 24/7 roadside assistance across 50+ cities.
            </p>

            {/* Direct Phone & WhatsApp Pill Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="tel:+918788581826"
                className="inline-flex items-center gap-2 text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <IconPhone className="w-4 h-4 text-white" />
                <span>+91 87885 81826</span>
              </a>

              <a
                href="https://wa.me/918788581826?text=Hi%20INDIDRIVE,%20I%20want%20to%20rent%20a%20car"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <IconBrandWhatsapp className="w-4 h-4 text-white" />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Column 2: Fleet */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
              Fleet Categories
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 font-normal">
              <li><Link href="/cars?category=Economy" className="hover:text-neutral-900 transition-colors">Economy Hatchbacks</Link></li>
              <li><Link href="/cars?category=SUV" className="hover:text-neutral-900 transition-colors">SUVs & 4x4 Offroaders</Link></li>
              <li><Link href="/cars?category=Sedan" className="hover:text-neutral-900 transition-colors">Executive Sedans</Link></li>
              <li><Link href="/cars?category=Luxury" className="hover:text-neutral-900 transition-colors">Luxury VIP Sedans</Link></li>
              <li><Link href="/cars?category=Electric" className="hover:text-neutral-900 transition-colors">Electric EVs</Link></li>
            </ul>
          </div>

          {/* Column 3: Top Cities / Locations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
              Top Locations
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 font-normal">
              <li><Link href="/cars" className="hover:text-neutral-900 transition-colors">Mumbai & Airport</Link></li>
              <li><Link href="/cars" className="hover:text-neutral-900 transition-colors">Pune City & Baner</Link></li>
              <li><Link href="/cars" className="hover:text-neutral-900 transition-colors">Goa Airport & Panjim</Link></li>
              <li><Link href="/cars" className="hover:text-neutral-900 transition-colors">Delhi NCR & Gurgaon</Link></li>
              <li><Link href="/cars" className="hover:text-neutral-900 transition-colors">Bangalore & Indiranagar</Link></li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
              Company & Help
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 font-normal">
              <li><Link href="/#how-it-works" className="hover:text-neutral-900 transition-colors">How It Works</Link></li>
              <li><Link href="/#why-choose-us" className="hover:text-neutral-900 transition-colors">Why Choose Us</Link></li>
              <li><Link href="/#faq" className="hover:text-neutral-900 transition-colors">FAQ & Support</Link></li>
              <li><Link href="/cars" className="hover:text-neutral-900 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/cars" className="hover:text-neutral-900 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM SECTION: COPYRIGHT & SOCIAL LINKS */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-normal">
          <div>
            © {new Date().getFullYear()} Horizon Rental Services. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-neutral-600">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors">
              <IconBrandInstagram className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors">
              <IconBrandFacebook className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors">
              <IconBrandTwitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors">
              <IconBrandLinkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
