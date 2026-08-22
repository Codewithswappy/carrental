"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  IconMapPin,
  IconCalendarEvent,
  IconArrowRight,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconCheck,
  IconClock,
} from "@tabler/icons-react";

export interface SearchQueryParams {
  departureCity: string;
  returnCity: string;
  isRoundTrip: boolean;
  driverType: "without_driver" | "with_driver";
  pickUpDate: string;
  pickUpTime: string;
  returnDate: string;
  returnTime: string;
}

interface SearchWidgetProps {
  onSearch: (params: SearchQueryParams) => void;
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

// MONTH NAMES & DAYS OF WEEK
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function SearchWidget({ onSearch }: SearchWidgetProps) {
  const [driverType, setDriverType] = useState<"without_driver" | "with_driver">("without_driver");
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [departureCity, setDepartureCity] = useState("Mumbai (BOM Airport)");
  const [returnCity, setReturnCity] = useState("Mumbai (BOM Airport)");

  // Dates (YYYY-MM-DD)
  const [pickUpDate, setPickUpDate] = useState("2026-08-25");
  const [returnDate, setReturnDate] = useState("2026-08-28");

  // Times
  const [pickUpTime, setPickUpTime] = useState("10:30 AM");
  const [returnTime, setReturnTime] = useState("04:30 PM");

  // Dropdown States
  const [depDropdownOpen, setDepDropdownOpen] = useState(false);
  const [retDropdownOpen, setRetDropdownOpen] = useState(false);
  const [pickCalendarOpen, setPickCalendarOpen] = useState(false);
  const [retCalendarOpen, setRetCalendarOpen] = useState(false);
  const [pickTimeOpen, setPickTimeOpen] = useState(false);
  const [retTimeOpen, setRetTimeOpen] = useState(false);

  // Calendar View State (Month/Year)
  const [calMonth, setCalMonth] = useState(7); // August (0-indexed)
  const [calYear, setCalYear] = useState(2026);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDepDropdownOpen(false);
        setRetDropdownOpen(false);
        setPickCalendarOpen(false);
        setRetCalendarOpen(false);
        setPickTimeOpen(false);
        setRetTimeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAllPopovers = () => {
    setDepDropdownOpen(false);
    setRetDropdownOpen(false);
    setPickCalendarOpen(false);
    setRetCalendarOpen(false);
    setPickTimeOpen(false);
    setRetTimeOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeAllPopovers();
    onSearch({
      departureCity,
      returnCity: isRoundTrip ? returnCity : departureCity,
      isRoundTrip,
      driverType,
      pickUpDate,
      pickUpTime,
      returnDate,
      returnTime,
    });
  };

  // Helper to format date for display: "25 Aug 2026"
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "Select date";
    const [y, m, d] = dateStr.split("-").map(Number);
    if (!y || !m || !d) return dateStr;
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Calendar Days Generator
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfWeek = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDaySelect = (day: number, target: "pickup" | "return") => {
    const formattedMonth = String(calMonth + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const dateString = `${calYear}-${formattedMonth}-${formattedDay}`;

    if (target === "pickup") {
      setPickUpDate(dateString);
      setPickCalendarOpen(false);
    } else {
      setReturnDate(dateString);
      setRetCalendarOpen(false);
    }
  };

  const renderModernCalendar = (target: "pickup" | "return") => {
    const daysInMonth = getDaysInMonth(calYear, calMonth);
    const firstDay = getFirstDayOfWeek(calYear, calMonth);
    const selectedDateStr = target === "pickup" ? pickUpDate : returnDate;

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const formattedMonth = String(calMonth + 1).padStart(2, "0");
      const formattedDay = String(d).padStart(2, "0");
      const dateStr = `${calYear}-${formattedMonth}-${formattedDay}`;
      const isSelected = dateStr === selectedDateStr;

      days.push(
        <button
          key={d}
          type="button"
          onClick={() => handleDaySelect(d, target)}
          className={`h-8 w-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
            isSelected
              ? "bg-neutral-900 text-white shadow-xs scale-105"
              : "text-neutral-800 hover:bg-neutral-100 hover:text-neutral-950"
          }`}
        >
          {d}
        </button>
      );
    }

    return (
      <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-neutral-200 rounded-2xl shadow-2xl z-50 p-4 animate-in fade-in slide-in-from-top-3 duration-200 ease-out font-sans">
        {/* Calendar Month Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-neutral-100">
          <span className="text-xs font-bold text-neutral-900">
            {MONTH_NAMES[calMonth]} {calYear}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                if (calMonth === 0) {
                  setCalMonth(11);
                  setCalYear((prev) => prev - 1);
                } else {
                  setCalMonth((prev) => prev - 1);
                }
              }}
              className="p-1 rounded-md text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 cursor-pointer"
            >
              <IconChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                if (calMonth === 11) {
                  setCalMonth(0);
                  setCalYear((prev) => prev + 1);
                } else {
                  setCalMonth((prev) => prev + 1);
                }
              }}
              className="p-1 rounded-md text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 cursor-pointer"
            >
              <IconChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {DAYS_OF_WEEK.map((dw) => (
            <span key={dw} className="text-[11px] font-semibold text-neutral-400">
              {dw}
            </span>
          ))}
        </div>

        {/* Grid Days */}
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative z-50 w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 shadow-2xl border border-white/60 text-neutral-900 transition-all font-sans"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        {/* Top Input Row (4 Horizontal Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1. Departure Location */}
          <div className="relative flex flex-col gap-1.5 z-40">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-600">
                Departure
              </label>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-medium text-neutral-500">
                  Round-trip?
                </span>
                <button
                  type="button"
                  onClick={() => setIsRoundTrip(!isRoundTrip)}
                  className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
                    isRoundTrip ? "bg-neutral-950" : "bg-neutral-300"
                  }`}
                  role="switch"
                  aria-checked={isRoundTrip}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      isRoundTrip ? "translate-x-3.5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  closeAllPopovers();
                  setDepDropdownOpen(!depDropdownOpen);
                }}
                className="w-full flex items-center justify-between bg-neutral-100 hover:bg-neutral-100/80 rounded-xl px-3.5 py-3 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <IconMapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span className="text-xs font-medium text-neutral-900 truncate">
                    {departureCity}
                  </span>
                </div>
                <IconChevronDown className="w-4 h-4 text-neutral-400 shrink-0 ml-1" />
              </button>

              {depDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-2xl shadow-2xl z-50 max-h-56 overflow-y-auto no-scrollbar py-1.5 animate-in fade-in slide-in-from-top-3 duration-200 ease-out">
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setDepartureCity(city);
                        if (!isRoundTrip) setReturnCity(city);
                        setDepDropdownOpen(false);
                      }}
                      className="w-full px-3.5 py-2.5 text-left text-xs hover:bg-neutral-100 flex items-center justify-between font-medium text-neutral-800 cursor-pointer"
                    >
                      <span>{city}</span>
                      {departureCity === city && (
                        <IconCheck className="w-3.5 h-3.5 text-neutral-950" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 2. Return Location */}
          <div className="relative flex flex-col gap-1.5 z-40">
            <label className="text-xs font-semibold text-neutral-600">
              Return Location
            </label>
            <div className="relative">
              <button
                type="button"
                disabled={!isRoundTrip}
                onClick={() => {
                  closeAllPopovers();
                  setRetDropdownOpen(!retDropdownOpen);
                }}
                className={`w-full flex items-center justify-between bg-neutral-100 rounded-xl px-3.5 py-3 text-left transition-colors cursor-pointer ${
                  !isRoundTrip ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-100/80"
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <IconMapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span className="text-xs font-medium text-neutral-900 truncate">
                    {isRoundTrip ? returnCity : "Same location"}
                  </span>
                </div>
                <IconChevronDown className="w-4 h-4 text-neutral-400 shrink-0 ml-1" />
              </button>

              {retDropdownOpen && isRoundTrip && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-2xl shadow-2xl z-50 max-h-56 overflow-y-auto no-scrollbar py-1.5 animate-in fade-in slide-in-from-top-3 duration-200 ease-out">
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setReturnCity(city);
                        setRetDropdownOpen(false);
                      }}
                      className="w-full px-3.5 py-2.5 text-left text-xs hover:bg-neutral-100 flex items-center justify-between font-medium text-neutral-800 cursor-pointer"
                    >
                      <span>{city}</span>
                      {returnCity === city && (
                        <IconCheck className="w-3.5 h-3.5 text-neutral-950" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3. Pick Up Date & Time (Modern Custom Calendar) */}
          <div className="relative flex flex-col gap-1.5 z-40">
            <label className="text-xs font-semibold text-neutral-600">
              Pick Up Date & Time
            </label>
            <div className="flex items-center justify-between bg-neutral-100 rounded-xl px-3 py-2">
              
              {/* Modern Calendar Trigger */}
              <button
                type="button"
                onClick={() => {
                  closeAllPopovers();
                  setPickCalendarOpen(!pickCalendarOpen);
                }}
                className="flex items-center gap-2 flex-1 min-w-0 text-xs font-medium text-neutral-900 hover:text-neutral-950 cursor-pointer"
              >
                <IconCalendarEvent className="w-4 h-4 text-neutral-400 shrink-0" />
                <span className="truncate">{formatDateDisplay(pickUpDate)}</span>
              </button>

              {pickCalendarOpen && renderModernCalendar("pickup")}

              <span className="text-neutral-300 mx-1.5">|</span>

              {/* Time Dropdown */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    closeAllPopovers();
                    setPickTimeOpen(!pickTimeOpen);
                  }}
                  className="flex items-center gap-1 text-xs font-medium text-neutral-800 hover:text-neutral-950 cursor-pointer"
                >
                  <IconClock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{pickUpTime}</span>
                  <IconChevronDown className="w-3 h-3 text-neutral-400" />
                </button>

                {pickTimeOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-neutral-200 rounded-2xl shadow-2xl z-50 py-1.5 w-32 max-h-56 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-top-3 duration-200 ease-out">
                    {TIMES.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => {
                          setPickUpTime(time);
                          setPickTimeOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-xs hover:bg-neutral-100 font-medium text-neutral-800 cursor-pointer flex items-center justify-between"
                      >
                        <span>{time}</span>
                        {pickUpTime === time && (
                          <IconCheck className="w-3 h-3 text-neutral-950" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* 4. Return Date & Time (Modern Custom Calendar) */}
          <div className="relative flex flex-col gap-1.5 z-40">
            <label className="text-xs font-semibold text-neutral-600">
              Return Date & Time
            </label>
            <div className="flex items-center justify-between bg-neutral-100 rounded-xl px-3 py-2">
              
              {/* Modern Calendar Trigger */}
              <button
                type="button"
                onClick={() => {
                  closeAllPopovers();
                  setRetCalendarOpen(!retCalendarOpen);
                }}
                className="flex items-center gap-2 flex-1 min-w-0 text-xs font-medium text-neutral-900 hover:text-neutral-950 cursor-pointer"
              >
                <IconCalendarEvent className="w-4 h-4 text-neutral-400 shrink-0" />
                <span className="truncate">{formatDateDisplay(returnDate)}</span>
              </button>

              {retCalendarOpen && renderModernCalendar("return")}

              <span className="text-neutral-300 mx-1.5">|</span>

              {/* Time Dropdown */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    closeAllPopovers();
                    setRetTimeOpen(!retTimeOpen);
                  }}
                  className="flex items-center gap-1 text-xs font-medium text-neutral-800 hover:text-neutral-950 cursor-pointer"
                >
                  <IconClock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{returnTime}</span>
                  <IconChevronDown className="w-3 h-3 text-neutral-400" />
                </button>

                {retTimeOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-neutral-200 rounded-2xl shadow-2xl z-50 py-1.5 w-32 max-h-56 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-top-3 duration-200 ease-out">
                    {TIMES.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => {
                          setReturnTime(time);
                          setRetTimeOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-xs hover:bg-neutral-100 font-medium text-neutral-800 cursor-pointer flex items-center justify-between"
                      >
                        <span>{time}</span>
                        {returnTime === time && (
                          <IconCheck className="w-3 h-3 text-neutral-950" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Row: Filter Pills (Left) & Search Button (Right) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
          
          {/* Driver Filter Toggle Pills */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-neutral-500 mr-1">
              Filter:
            </span>
            <button
              type="button"
              onClick={() => setDriverType("without_driver")}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                driverType === "without_driver"
                  ? "bg-neutral-950 text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              Without Driver
            </button>
            <button
              type="button"
              onClick={() => setDriverType("with_driver")}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                driverType === "with_driver"
                  ? "bg-neutral-950 text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              With Driver
            </button>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-xs md:text-sm px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>Search</span>
            <IconArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
}
