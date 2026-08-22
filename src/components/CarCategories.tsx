"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

const CATEGORIES = [
  {
    id: "Economy",
    title: "Economy",
    subtitle: "Affordable city driving",
    description: "Compact hatchbacks & sedans designed for easy parking, high mileage, and smooth city navigation.",
    image: "/images/categories/economy.jpg",
    startingPrice: "₹1,200",
    badge: "Popular City Choice",
  },
  {
    id: "SUV",
    title: "SUV",
    subtitle: "More space for trips",
    description: "Rugged and spacious 5 & 7 seater SUVs ideal for family vacations, hill stations, and long highways.",
    image: "/images/categories/suv.jpg",
    startingPrice: "₹2,400",
    badge: "Roadtrip Favorite",
  },
  {
    id: "Luxury",
    title: "Luxury",
    subtitle: "Premium driving experience",
    description: "Executive luxury sedans & premium SUVs for weddings, VIP travel, and high-end corporate comfort.",
    image: "/images/categories/luxury-mercedes.jpg",
    startingPrice: "₹4,500",
    badge: "VIP Class",
  },
  {
    id: "Electric",
    title: "Electric",
    subtitle: "Clean & efficient",
    description: "Zero-emission electric vehicles with quiet cabins, fast-charging support, and instant torque.",
    image: "/images/categories/electric.jpg",
    startingPrice: "₹1,800",
    badge: "Eco-Friendly EV",
  },
];

export default function CarCategories() {
  return (
    <section id="fleet" className="w-full py-16 sm:py-24 bg-white text-neutral-900 font-sans border-t border-neutral-200 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase block mb-2">
              Fleet Categories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 leading-tight">
              Vehicle options for every journey
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-md leading-relaxed">
            Choose from economical hatchbacks to 4x4 SUVs and luxury sedans. Every car is deep-cleaned and 100% verified.
          </p>
        </div>

        {/* 2 CATEGORIES PER ROW — ALTERNATING 35% FADE MIRROR LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {CATEGORIES.map((cat, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <Link
                key={cat.id}
                href={`/cars?category=${cat.id}`}
                className={`group relative h-[240px] sm:h-[260px] rounded-3xl overflow-hidden bg-neutral-50 border border-neutral-200/90 shadow-2xs transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex items-center p-6 sm:p-8 ${
                  isEven ? "justify-start" : "justify-end"
                }`}
              >
                {/* Background Car Photo with Alternating 35% Soft Fade */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    priority
                    className={`object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.98] ${
                      isEven ? "object-[85%_center]" : "object-[15%_center]"
                    }`}
                  />
                  
                  {/* Alternating 35% Gradient Fade */}
                  <div
                    className={`absolute inset-0 ${
                      isEven
                        ? "bg-gradient-to-r from-neutral-50 via-neutral-50/95 via-35% to-transparent"
                        : "bg-gradient-to-l from-neutral-50 via-neutral-50/95 via-35% to-transparent"
                    }`}
                  />
                </div>

                {/* Text Content (Left aligned on even, Right aligned on odd) */}
                <div
                  className={`relative z-10 space-y-3 max-w-xs sm:max-w-[260px] ${
                    isEven ? "text-left" : "text-right"
                  }`}
                >
                  <div className={`flex items-center gap-2 ${isEven ? "justify-start" : "justify-end"}`}>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-neutral-900 text-white px-3 py-1 rounded-full shadow-2xs">
                      {cat.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-600 mt-0.5">
                      — {cat.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>

                  {/* Starting Price */}
                  <div className={`pt-1 flex items-center gap-4 ${isEven ? "justify-start" : "justify-end"}`}>
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 font-semibold tracking-wider block">Starting from</span>
                      <span className="text-base sm:text-lg font-extrabold text-neutral-900 tracking-tight">
                        {cat.startingPrice}<span className="text-xs text-neutral-500 font-normal">/day</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* ARROW BUTTON — APPEARS ON HOVER ONLY (Bottom Right on Even, Bottom Left on Odd) */}
                <div
                  className={`absolute bottom-6 z-20 w-11 h-11 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-lg border border-neutral-800 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 pointer-events-none ${
                    isEven ? "right-6" : "left-6"
                  }`}
                >
                  <IconArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
