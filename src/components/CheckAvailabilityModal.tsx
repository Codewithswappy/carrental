"use client";

import React, { useState } from "react";
import {
  IconX,
  IconMapPin,
  IconCalendar,
  IconClock,
  IconSteeringWheel,
  IconUserCheck,
  IconArrowRight,
  IconMinus,
  IconPlus,
  IconCar,
} from "@tabler/icons-react";

export interface AvailabilityRequirements {
  city: string;
  driverType: "without_driver" | "with_driver";
  category: string;
  durationMode: "days" | "hours";
  durationValue: number;
  pickUpDate: string;
  pickUpTime: string;
}

interface CheckAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRequirements: (reqs: AvailabilityRequirements) => void;
}

const CITIES = [
  "Mumbai (BOM Airport)",
  "Delhi NCR (DEL Airport)",
  "Bengaluru (BLR Airport)",
  "Goa (Mopa / Dabolim)",
  "Jaipur City & Airport",
  "Pune City & Airport",
  "Hyderabad (HYD Airport)",
  "Chandigarh",
];

const CATEGORIES = ["All", "SUV", "Sedan", "Hatchback", "Luxury", "Electric"];

const TIMES = [
  "08:00 AM",
  "09:30 AM",
  "10:30 AM",
  "12:00 PM",
  "02:00 PM",
  "04:30 PM",
  "06:30 PM",
  "08:30 PM",
];

export default function CheckAvailabilityModal({
  isOpen,
  onClose,
  onSubmitRequirements,
}: CheckAvailabilityModalProps) {
  const [city, setCity] = useState("Mumbai (BOM Airport)");
  const [driverType, setDriverType] = useState<"without_driver" | "with_driver">("without_driver");
  const [category, setCategory] = useState("All");
  const [durationMode, setDurationMode] = useState<"days" | "hours">("days");
  const [durationValue, setDurationValue] = useState<number>(1);
  const [pickUpDate, setPickUpDate] = useState("2026-08-25");
  const [pickUpTime, setPickUpTime] = useState("10:30 AM");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitRequirements({
      city,
      driverType,
      category,
      durationMode,
      durationValue,
      pickUpDate,
      pickUpTime,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150 font-sans">
      <div className="relative w-full max-w-md bg-white text-neutral-900 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh] border border-neutral-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2">
            <IconCar className="w-4 h-4 text-neutral-900 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">
                Check Vehicle Availability
              </h3>
              <p className="text-[11px] text-neutral-500">
                Set your custom trip requirements to see available cars
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <IconX className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto text-xs">
          
          {/* 1. Pickup Location */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700">
              Pickup City / Airport *
            </label>
            <div className="relative">
              <IconMapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-neutral-900 font-medium focus:outline-none focus:border-neutral-900 cursor-pointer appearance-none"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. Driver Service Mode (Self-Drive vs Chauffeur) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700">
              Driver Preference *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDriverType("without_driver")}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                  driverType === "without_driver"
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                <IconSteeringWheel className="w-3.5 h-3.5" />
                <span>Self-Drive</span>
              </button>
              <button
                type="button"
                onClick={() => setDriverType("with_driver")}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                  driverType === "with_driver"
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                <IconUserCheck className="w-3.5 h-3.5" />
                <span>With Driver</span>
              </button>
            </div>
          </div>

          {/* 3. Preferred Vehicle Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700">
              Car Category Preference
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    category === cat
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Rental Duration (Days vs Hours) */}
          <div className="space-y-2 p-3 rounded-xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-neutral-800 text-xs">
                Rental Duration
              </span>

              {/* Mode Switch: Days vs Hours */}
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
                Duration quantity:
              </span>

              <div className="flex items-center gap-3 bg-white border border-neutral-200 rounded-lg px-2 py-1">
                <button
                  type="button"
                  onClick={() => setDurationValue((prev) => Math.max(1, prev - 1))}
                  className="p-1 text-neutral-600 hover:text-neutral-900 disabled:opacity-30 cursor-pointer"
                  disabled={durationValue <= 1}
                >
                  <IconMinus className="w-3.5 h-3.5" />
                </button>

                <span className="font-bold text-neutral-900 min-w-[40px] text-center text-xs">
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

          {/* 5. Date & Time Selection */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                Pick-up Date
              </label>
              <input
                type="date"
                value={pickUpDate}
                onChange={(e) => setPickUpDate(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-2.5 py-2 text-xs text-neutral-900 font-medium focus:outline-none focus:border-neutral-900 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                Pick-up Time
              </label>
              <select
                value={pickUpTime}
                onChange={(e) => setPickUpTime(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-2.5 py-2 text-xs text-neutral-900 font-medium focus:outline-none focus:border-neutral-900 cursor-pointer"
              >
                {TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action CTA */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Check Available Cars</span>
            <IconArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
