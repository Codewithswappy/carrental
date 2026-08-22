"use client";

import React from "react";
import {
  IconTag,
  IconShieldCheck,
  IconCalendarCheck,
  IconHeadset,
  IconRefresh,
  IconCircleCheck,
} from "@tabler/icons-react";

const FEATURES = [
  {
    icon: IconTag,
    title: "Transparent pricing",
    description: "Clear upfront rates with no hidden fees or unexpected surge charges.",
  },
  {
    icon: IconShieldCheck,
    title: "Well-maintained cars",
    description: "Regularly deep-cleaned, sanitized, and performance-tested vehicles.",
  },
  {
    icon: IconCalendarCheck,
    title: "Flexible booking",
    description: "Rent by the hour or day with customizable pickup schedules.",
  },
  {
    icon: IconHeadset,
    title: "24/7 support",
    description: "Round-the-clock customer assistance and emergency roadside help.",
  },
  {
    icon: IconRefresh,
    title: "Easy cancellation",
    description: "Hassle-free cancellation policies with fast refund processing.",
  },
  {
    icon: IconCircleCheck,
    title: "Verified vehicles",
    description: "100% compliant documents, commercial insurance, and verified fleet.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="services" className="w-full py-16 sm:py-24 bg-white text-neutral-900 font-sans border-t border-neutral-200 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-xl mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase block mb-2">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
            Designed for a seamless rental experience
          </h2>
        </div>

        {/* Features Grid (6 Compact Neutral Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-neutral-100 border border-neutral-200/80 rounded-2xl p-6 transition-all duration-200 hover:border-neutral-400 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center mb-4 text-neutral-900 group-hover:scale-105 transition-transform shadow-2xs">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>

                <h3 className="text-base font-semibold text-neutral-900 mb-1.5">
                  {feat.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
