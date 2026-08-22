"use client";

import React from "react";
import Link from "next/link";
import { IconArrowRight, IconBrandWhatsapp } from "@tabler/icons-react";

export default function CtaBanner() {
  return (
    <section className="w-full py-16 sm:py-24 bg-neutral-950 text-white font-sans select-none border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 p-8 sm:p-14 lg:p-16 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          
          {/* Ambient Glow background circles */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

          {/* Text Content */}
          <div className="relative z-10 space-y-3 text-center md:text-left max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to hit the road?
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-normal leading-relaxed">
              Choose your car and start your journey. Self-drive & chauffeur rentals with doorstep vehicle delivery.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 flex flex-wrap gap-4 items-center justify-center md:justify-end shrink-0">
            <Link
              href="/cars"
              className="inline-flex items-center gap-2.5 bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-xs sm:text-sm px-7 py-4 rounded-xl transition-all shadow-xl active:scale-95 cursor-pointer group"
            >
              <span>Browse Cars</span>
              <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="https://wa.me/918788581826?text=Hi%20INDIDRIVE,%20I%20want%20to%20rent%20a%20car"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm px-6 py-4 rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              <IconBrandWhatsapp className="w-4 h-4" />
              <span>WhatsApp Booking</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
