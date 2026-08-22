"use client";

import React, { useState } from "react";
import { IconChevronDown, IconHelpCircle, IconBrandWhatsapp, IconHeadset } from "@tabler/icons-react";

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
    <section id="faq" className="w-full py-16 sm:py-24 bg-neutral-50 text-neutral-900 font-sans border-t border-neutral-200 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* 2-COLUMN LAYOUT: LEFT SIDE TEXT CONTENT, RIGHT SIDE ACCORDION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE TEXT & HELPDESK CARD */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
           

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
              Got questions? <br />
              <span className="text-neutral-500 font-normal">We've got answers.</span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md">
              Everything you need to know about required documents, zero deposit waivers, insurance coverage, and 24/7 doorstep vehicle delivery.
            </p>

           
          </div>

          {/* RIGHT SIDE EXPANDABLE ACCORDIONS WITH SMOOTH ANIMATION */}
          <div className="lg:col-span-7 space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={faq.question}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white border-neutral-900/40 shadow-md translate-x-1"
                      : "bg-white/80 border-neutral-200 hover:border-neutral-300 hover:bg-white"
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-4.5 px-6 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                  >
                    <span className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
                      isOpen ? "text-neutral-900" : "text-neutral-800"
                    }`}>
                      {faq.question}
                    </span>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? "bg-neutral-900 text-white rotate-180"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      <IconChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Answer Content (Smooth Transition Height & Opacity) */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-60 opacity-100 px-6 pb-5 pt-0" : "max-h-0 opacity-0 px-6 py-0"
                    }`}
                  >
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-2 border-t border-neutral-100 font-normal">
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
