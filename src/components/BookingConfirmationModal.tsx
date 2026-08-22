"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  IconX,
  IconCheck,
  IconCar,
  IconBrandWhatsapp,
  IconMinus,
  IconPlus,
  IconClock,
  IconCalendar,
  IconId,
  IconLock,
  IconGasStation,
  IconSteeringWheel,
  IconUsers,
} from "@tabler/icons-react";
import { CarItem } from "./VehicleModal";
import { SearchQueryParams } from "./SearchWidget";

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: CarItem | null;
  searchParams: SearchQueryParams | null;
}

export default function BookingConfirmationModal({
  isOpen,
  onClose,
  car,
  searchParams,
}: BookingConfirmationModalProps) {
  // Duration state (user chooses days or hours)
  const [durationMode, setDurationMode] = useState<"days" | "hours">("days");
  const [durationValue, setDurationValue] = useState<number>(1);

  // Customer form state
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [dlNumber, setDlNumber] = useState("");
  const [pickupCity, setPickupCity] = useState(
    searchParams?.departureCity || "Mumbai (BOM Airport)"
  );
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const activeCar = car || {
    id: "hatchback-swift",
    name: "Maruti Suzuki Swift ZXi",
    category: "Hatchback",
    image: "/images/hatchback-studio.jpg",
    pricePerDay: 1499,
    seats: 5,
    transmission: "Manual",
    fuel: "Petrol",
    mileage: "22 km/l",
    rating: 4.65,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  };

  // Dynamic Price Calculation
  const hourlyRate = Math.round(activeCar.pricePerDay / 10);
  const basePrice =
    durationMode === "days"
      ? activeCar.pricePerDay * durationValue
      : hourlyRate * durationValue;

  const taxAmount = Math.round(basePrice * 0.12);
  const totalAmount = basePrice + taxAmount;

  // WhatsApp Message Generator (Owner Number: 8788581826)
  const generateWhatsAppUrl = () => {
    const text = `🚗 *NEW CAR RENTAL BOOKING INQUIRY*
---------------------------------------
*Vehicle:* ${activeCar.name} (${activeCar.category})
*Specs:* ${activeCar.transmission} | ${activeCar.fuel} | ${activeCar.seats} Seats | ${activeCar.mileage || 'Clean'}
*Duration:* ${durationValue} ${durationMode === "days" ? (durationValue === 1 ? "Day" : "Days") : (durationValue === 1 ? "Hour" : "Hours")}
*Pickup City:* ${pickupCity}
---------------------------------------
*Customer Name:* ${customerName || "Not specified"}
*Phone:* ${customerPhone || "Not specified"}
*DL Number:* ${dlNumber || "Will present at pickup"}
---------------------------------------
*Est. Total Amount:* ₹${totalAmount.toLocaleString("en-IN")} (incl. GST)
---------------------------------------
Please confirm vehicle availability for these dates. Thank you!`;

    return `https://wa.me/918788581826?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waUrl = generateWhatsAppUrl();
    window.open(waUrl, "_blank");
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150 font-sans">
      
      {/* Compact & Small Modal (max-w-md) */}
      <div className="relative w-full max-w-md bg-white text-neutral-900 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh] border border-neutral-200">
        
        {/* Compact Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2">
            <IconCar className="w-4 h-4 text-neutral-900 shrink-0" />
            <h3 className="text-sm font-semibold text-neutral-900 truncate">
              Book {activeCar.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <IconX className="w-4 h-4" />
          </button>
        </div>

        {!confirmed ? (
          <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto text-xs">
            
            {/* Vehicle Mini Card with Fuel & Specs Details */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-100 border border-neutral-200">
              <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-neutral-200 shrink-0">
                <Image src={activeCar.image} alt={activeCar.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-neutral-900 truncate text-xs">{activeCar.name}</h4>
                <div className="text-[11px] text-neutral-600 font-medium truncate flex items-center gap-1 mt-0.5">
                  <span>{activeCar.transmission}</span> •{" "}
                  <span className="text-neutral-800 font-semibold">{activeCar.fuel}</span> •{" "}
                  <span>{activeCar.seats} Seats</span>
                  {activeCar.mileage && <span className="text-neutral-500">• {activeCar.mileage}</span>}
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="font-bold text-neutral-900 text-xs">
                  ₹{activeCar.pricePerDay.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-neutral-500 block">/ day</span>
              </div>
            </div>

            {/* DURATION SELECTION (Days vs Hours) */}
            <div className="space-y-2 p-3 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-800 text-xs">
                  Select Rental Duration
                </span>

                {/* Duration Mode Switch: Days vs Hours */}
                <div className="flex items-center bg-neutral-200 p-0.5 rounded-lg text-[11px] font-medium">
                  <button
                    type="button"
                    onClick={() => {
                      setDurationMode("days");
                      setDurationValue(1);
                    }}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      durationMode === "days"
                        ? "bg-neutral-900 text-white shadow-xs"
                        : "text-neutral-700 hover:text-neutral-900"
                    }`}
                  >
                    Days
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDurationMode("hours");
                      setDurationValue(4);
                    }}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      durationMode === "hours"
                        ? "bg-neutral-900 text-white shadow-xs"
                        : "text-neutral-700 hover:text-neutral-900"
                    }`}
                  >
                    Hours
                  </button>
                </div>
              </div>

              {/* Stepper Controls */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-neutral-500 text-xs">
                  How many {durationMode}?
                </span>

                <div className="flex items-center gap-3 bg-white border border-neutral-200 rounded-lg px-2 py-1">
                  <button
                    type="button"
                    onClick={() =>
                      setDurationValue((prev) => Math.max(1, prev - 1))
                    }
                    className="p-1 text-neutral-600 hover:text-neutral-900 disabled:opacity-30 cursor-pointer"
                    disabled={durationValue <= 1}
                  >
                    <IconMinus className="w-3.5 h-3.5" />
                  </button>

                  <span className="font-bold text-neutral-900 min-w-[36px] text-center text-xs">
                    {durationValue} {durationMode === "days" ? (durationValue === 1 ? "Day" : "Days") : (durationValue === 1 ? "Hour" : "Hours")}
                  </span>

                  <button
                    type="button"
                    onClick={() => setDurationValue((prev) => prev + 1)}
                    className="p-1 text-neutral-600 hover:text-neutral-900 cursor-pointer"
                  >
                    <IconPlus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* MANDATORY REQUIREMENTS */}
            <div className="p-2.5 rounded-xl bg-neutral-100/80 border border-neutral-200 space-y-1">
              <span className="font-semibold text-neutral-800 text-[11px] block">
                Handover Requirements:
              </span>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-neutral-600">
                <span>✓ Original Driving License</span>
                <span>✓ Aadhaar / Govt ID</span>
                <span>✓ Min. 21+ Age</span>
                <span>✓ ₹0 Deposit Option</span>
              </div>
            </div>

            {/* CUSTOMER DETAILS FORM */}
            <div className="space-y-2.5">
              <div>
                <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                    Driving License No.
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MH-01-2023..."
                    value={dlNumber}
                    onChange={(e) => setDlNumber(e.target.value)}
                    className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>
            </div>

            {/* DYNAMIC PRICE SUMMARY */}
            <div className="p-3 rounded-xl bg-neutral-100 border border-neutral-200 space-y-1 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>
                  Rate ({durationValue} {durationMode} x ₹
                  {durationMode === "days"
                    ? activeCar.pricePerDay.toLocaleString("en-IN")
                    : hourlyRate.toLocaleString("en-IN")}
                  )
                </span>
                <span className="font-semibold text-neutral-900">
                  ₹{basePrice.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span>GST & Taxes (12%)</span>
                <span className="font-semibold text-neutral-900">
                  ₹{taxAmount.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="pt-1.5 border-t border-neutral-200 flex justify-between items-center font-bold text-neutral-900 text-sm">
                <span>Total Amount</span>
                <span className="text-base text-neutral-900">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* WHATSAPP CONFIRMATION BUTTON */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <IconBrandWhatsapp className="w-4 h-4 stroke-[2.5]" />
              <span>Confirm & Send via WhatsApp</span>
            </button>
          </form>
        ) : (
          /* Confirmation Success Box */
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <IconCheck className="w-6 h-6 stroke-[3]" />
            </div>

            <div>
              <h3 className="text-base font-semibold text-neutral-900">
                Booking Request Sent!
              </h3>
              <p className="text-xs text-neutral-600 mt-1 max-w-xs mx-auto leading-relaxed">
                Your rental inquiry for <span className="font-semibold text-neutral-900">{activeCar.name}</span> for <span className="font-semibold text-neutral-900">{durationValue} {durationMode}</span> has been sent directly to the owner on WhatsApp (+91 8788581826).
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <IconBrandWhatsapp className="w-4 h-4" />
                <span>Re-open WhatsApp Chat</span>
              </a>

              <button
                onClick={() => {
                  setConfirmed(false);
                  onClose();
                }}
                className="w-full py-2 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
