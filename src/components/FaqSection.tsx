"use client";

import React, { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What documents do I need to rent a car?",
    answer: "You need a valid Original Indian Driving License (minimum 1 year old) and an official Government ID proof (Aadhaar Card or Passport). For NRI/international travelers, an International Driving Permit (IDP) along with your passport is required.",
  },
  {
    question: "Is a security deposit required?",
    answer: "We offer Zero Security Deposit options on most verified vehicles! For certain luxury category vehicles, a refundable security deposit of ₹2,000–₹5,000 is processed at pickup and refunded within 2 hours of vehicle return.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer: "Yes! Free cancellation is available up to 24 hours prior to your scheduled pickup time. Modifications for pickup date or duration can be done instantly via WhatsApp support.",
  },
  {
    question: "Is insurance included in the rental price?",
    answer: "Yes, all our vehicles come with comprehensive commercial third-party insurance. You can also opt for our Total Protection Package at checkout for complete zero-liability coverage.",
  },
  {
    question: "Can I extend my rental duration during the trip?",
    answer: "Absolutely! You can extend your rental seamlessly through WhatsApp or phone call at least 3 hours before your scheduled return time, subject to vehicle availability.",
  },
  {
    question: "Do you offer airport pickup and doorstep delivery?",
    answer: "Yes! We offer doorstep vehicle delivery and pickup directly at airport terminals, railway stations, hotels, and residential addresses across 50+ cities in India.",
  },
  {
    question: "What happens if the car breaks down during my trip?",
    answer: "We provide 24/7 emergency roadside assistance. In case of mechanical issues, our support team immediately dispatches a service technician or sends a replacement vehicle to your location.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-16 sm:py-24 bg-white text-neutral-900 font-sans border-t border-neutral-200 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* 2-COLUMN LAYOUT: LEFT SIDE TEXT CONTENT, RIGHT SIDE CLEAN BORDERLESS FAQ LIST */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE TEXT CONTENT */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
              Got questions? <br />
              <span className="text-neutral-500 font-normal">We've got answers.</span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md font-normal">
              Everything you need to know about required documents, zero deposit waivers, commercial insurance coverage, and 24/7 doorstep vehicle delivery.
            </p>
          </div>

          {/* RIGHT SIDE BORDERLESS & BACKGROUND-FREE EXPANDABLE FAQ LIST */}
          <div className="lg:col-span-7 divide-y divide-neutral-200/80">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={faq.question}
                  className="py-4 sm:py-5 transition-all duration-300"
                >
                  {/* Question Trigger */}
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none group py-1"
                  >
                    <span className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
                      isOpen ? "text-neutral-900" : "text-neutral-700 group-hover:text-neutral-950"
                    }`}>
                      {faq.question}
                    </span>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? "text-neutral-900 rotate-180"
                          : "text-neutral-400 group-hover:text-neutral-700"
                      }`}
                    >
                      <IconChevronDown className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  </button>

                  {/* Answer Content (Smooth Transition) */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-60 opacity-100 pt-2.5 pb-1" : "max-h-0 opacity-0 py-0"
                    }`}
                  >
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
