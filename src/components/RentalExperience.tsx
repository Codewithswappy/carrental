"use client";

import React from "react";
import Image from "next/image";

export default function RentalExperience() {
  return (
    <section className="w-full relative h-[420px] sm:h-[500px] md:h-[560px] flex items-end justify-center select-none overflow-hidden bg-neutral-950">
      
      {/* Background Image with Soft Top & Bottom Fades */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/expirence-image-section.jpg"
          alt="Freedom to move"
          fill
          priority
          className="object-cover object-center brightness-95"
        />
        
        {/* Soft Top Fade (Blends seamlessly with white section above) */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white via-white/50 to-transparent" />
        
        {/* Soft Bottom Fade (Blends seamlessly with dark section below) */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
      </div>

      {/* ONE LINE PURE WHITE TEXT AT BOTTOM CENTER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-8 sm:pb-12 text-center">
        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-2xl">
          More than a rental. It's your freedom to move.
        </h2>
      </div>

    </section>
  );
}
