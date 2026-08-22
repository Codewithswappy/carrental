"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

const STEPS = [
  {
    stepNumber: "01",
    title: "Choose your car",
    description: "Browse our verified fleet of Hatchbacks, Sedans, SUVs, Luxury & EVs. Filter by transmission, fuel type, and daily price.",
    tag: "Selection",
  },
  {
    stepNumber: "02",
    title: "Pick your dates",
    description: "Select your pickup location, start date, and rental duration in days or hours for self-drive or chauffeur service.",
    tag: "Schedule",
  },
  {
    stepNumber: "03",
    title: "Drive away",
    description: "Confirm your booking instantly via WhatsApp, present your Driving License, and receive doorstep vehicle delivery.",
    tag: "Delivery",
  },
];

// Google Maps Style Blue Pin Vector SVG Component
function BlueGoogleMapPin() {
  return (
    <div className="animate-bounce pointer-events-none drop-shadow-md">
      <svg
        className="w-8 h-10"
        viewBox="0 0 24 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Pin Teardrop Body */}
        <path
          d="M12 0C5.37 0 0 5.37 0 12C0 21 12 34 12 34C12 34 24 21 24 12C24 5.37 18.63 0 12 0Z"
          fill="#2563EB"
          stroke="#1D4ED8"
          strokeWidth="0.8"
        />
        {/* Inner Dark Blue Center Dot */}
        <circle cx="12" cy="11" r="4.5" fill="#1E3A8A" />
      </svg>
    </div>
  );
}

// Beautiful 3D Metallic Red Vector SVG Car Component
function ThreeDVectorCar() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-11 h-22 filter drop-shadow-2xl">
        <svg
          viewBox="0 0 100 180"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Red Metallic Body Gradient */}
            <linearGradient id="carBodyGrad" x1="0" y1="0" x2="100" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="40%" stopColor="#dc2626" />
              <stop offset="85%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>

            {/* Gloss Highlight */}
            <linearGradient id="carGlossGrad" x1="0" y1="0" x2="0" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="30%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
            </linearGradient>

            {/* Glass Reflection Gradient */}
            <linearGradient id="glassGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
            </linearGradient>

            {/* Drop Shadow */}
            <filter id="carShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Ground Contact Shadow */}
          <ellipse cx="50" cy="90" rx="40" ry="76" fill="#000000" opacity="0.35" />

          {/* 3D Wheel Tires */}
          <rect x="6" y="24" width="10" height="28" rx="5" fill="#171717" />
          <rect x="84" y="24" width="10" height="28" rx="5" fill="#171717" />
          <rect x="6" y="124" width="10" height="28" rx="5" fill="#171717" />
          <rect x="84" y="124" width="10" height="28" rx="5" fill="#171717" />

          {/* Alloy Rims Details */}
          <rect x="8" y="28" width="6" height="20" rx="3" fill="#a3a3a3" />
          <rect x="86" y="28" width="6" height="20" rx="3" fill="#a3a3a3" />
          <rect x="8" y="128" width="6" height="20" rx="3" fill="#a3a3a3" />
          <rect x="86" y="128" width="6" height="20" rx="3" fill="#a3a3a3" />

          {/* 3D Main Outer Car Body Chassis */}
          <path
            d="M 50 6 C 30 6, 14 18, 14 38 L 14 138 C 14 158, 28 174, 50 174 C 72 174, 86 158, 86 138 L 86 38 C 86 18, 70 6, 50 6 Z"
            fill="url(#carBodyGrad)"
            filter="url(#carShadow)"
          />

          {/* Side Mirror Left & Right */}
          <path d="M 12 44 C 4 44, 2 48, 6 54 L 14 52 Z" fill="#991b1b" />
          <path d="M 88 44 C 96 44, 98 48, 94 54 L 86 52 Z" fill="#991b1b" />

          {/* Front Hood Contours */}
          <path d="M 30 14 Q 50 8, 70 14 Q 78 40, 50 44 Q 22 40, 30 14 Z" fill="url(#carGlossGrad)" opacity="0.3" />

          {/* 3D Front Windshield */}
          <path
            d="M 26 46 C 32 44, 68 44, 74 46 C 78 68, 76 74, 72 74 C 50 72, 50 72, 28 74 C 24 74, 22 68, 26 46 Z"
            fill="url(#glassGrad)"
          />

          {/* Windshield Reflection Streak */}
          <path d="M 34 48 L 56 48 L 44 70 L 30 70 Z" fill="#ffffff" opacity="0.3" />

          {/* Panoramic Roof Glass */}
          <path
            d="M 28 78 C 30 76, 70 76, 72 78 L 74 122 C 74 126, 26 126, 26 122 Z"
            fill="#0f172a"
          />
          <path
            d="M 30 82 C 32 80, 68 80, 70 82 L 72 118 C 72 120, 28 120, 28 118 Z"
            fill="url(#glassGrad)"
            opacity="0.85"
          />

          {/* Rear Glass Window */}
          <path
            d="M 28 128 C 32 126, 68 126, 72 128 C 74 140, 70 146, 50 146 C 30 146, 26 140, 28 128 Z"
            fill="url(#glassGrad)"
          />

          {/* Bright Headlights Strips (Front) */}
          <path d="M 18 18 C 22 14, 34 12, 38 18 C 30 20, 22 22, 18 18 Z" fill="#fef08a" />
          <path d="M 82 18 C 78 14, 66 12, 62 18 C 70 20, 78 22, 82 18 Z" fill="#fef08a" />
          
          {/* Headlight Bulbs */}
          <circle cx="26" cy="16" r="3" fill="#ffffff" />
          <circle cx="74" cy="16" r="3" fill="#ffffff" />

          {/* Rear Tail Light Bars */}
          <path d="M 20 162 C 28 164, 40 164, 44 162 C 38 166, 26 166, 20 162 Z" fill="#ef4444" />
          <path d="M 80 162 C 72 164, 60 164, 56 162 C 62 166, 74 166, 80 162 Z" fill="#ef4444" />
        </svg>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  
  const [activeStep, setActiveStep] = useState(0);
  const [carPos, setCarPos] = useState({ xPercent: 50, yPercent: 5, angle: 180 });

  // Target ratios along SVG road path for Step 01, Step 02, and Step 03
  const STEP_RATIOS = [0.05, 0.48, 0.88];

  // REAL-TIME CONTINUOUS CAR DRIVE SIMULATION ENGINE
  useEffect(() => {
    let animFrameId: number;
    let pauseTimer: NodeJS.Timeout;
    
    let currentRatio = 0.05;
    let targetIndex = 1; // Start driving down to Step 2
    let direction: "DOWN" | "UP" = "DOWN";
    let isPaused = true;

    // Initial 1.5s pause at Step 1 before starting drive
    pauseTimer = setTimeout(() => {
      isPaused = false;
    }, 1500);

    const driveLoop = () => {
      if (!isPaused && pathRef.current) {
        const path = pathRef.current;
        const totalLength = path.getTotalLength();
        const targetRatio = STEP_RATIOS[targetIndex];

        const speed = 0.0022; // Smooth driving speed

        if (direction === "DOWN") {
          currentRatio += speed;
          
          if (currentRatio >= targetRatio) {
            currentRatio = targetRatio;
            isPaused = true;
            setActiveStep(targetIndex);

            if (targetIndex === 2) {
              // Reached Step 3 (End of road) -> Pause 2s -> U-Turn & Drive UP
              pauseTimer = setTimeout(() => {
                direction = "UP";
                targetIndex = 1; // Drive UP to Step 2
                isPaused = false;
              }, 2000);
            } else {
              // Reached Step 2 -> Pause 2s -> Drive to Step 3
              pauseTimer = setTimeout(() => {
                targetIndex = 2; // Drive DOWN to Step 3
                isPaused = false;
              }, 2000);
            }
          }
        } else {
          // Driving UP
          currentRatio -= speed;
          
          if (currentRatio <= targetRatio) {
            currentRatio = targetRatio;
            isPaused = true;
            setActiveStep(targetIndex);

            if (targetIndex === 0) {
              // Reached Step 1 (Top of road) -> Pause 2s -> U-Turn & Drive DOWN
              pauseTimer = setTimeout(() => {
                direction = "DOWN";
                targetIndex = 1; // Drive DOWN to Step 2
                isPaused = false;
              }, 2000);
            } else {
              // Reached Step 2 on return -> Pause 2s -> Drive to Step 1
              pauseTimer = setTimeout(() => {
                targetIndex = 0; // Drive UP to Step 1
                isPaused = false;
              }, 2000);
            }
          }
        }

        // Calculate exact path position & facing angle
        const clamped = Math.max(0, Math.min(1, currentRatio));
        const targetLen = clamped * totalLength;
        const point = path.getPointAtLength(targetLen);

        const delta = direction === "DOWN" ? 3 : -3;
        const aheadLen = Math.max(0, Math.min(totalLength, targetLen + delta));
        const aheadPt = path.getPointAtLength(aheadLen);

        const dx = aheadPt.x - point.x;
        const dy = aheadPt.y - point.y;

        // Angle in degrees (+90 for DOWN direction, -90 for UP direction)
        let angle = (Math.atan2(dy, dx) * 180) / Math.PI + (direction === "DOWN" ? 90 : -90);

        setCarPos({
          xPercent: point.x,
          yPercent: (point.y / 500) * 100,
          angle: angle,
        });
      }

      animFrameId = requestAnimationFrame(driveLoop);
    };

    animFrameId = requestAnimationFrame(driveLoop);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(pauseTimer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="w-full py-16 sm:py-24 bg-neutral-100 text-neutral-900 font-sans border-t border-neutral-200 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE TEXT CONTENT (LUXURY MINIMAL WITH LOW OPACITY WATERMARK) */}
          <div className="lg:col-span-5 relative flex flex-col justify-center space-y-6 py-4">
            
            {/* LOW OPACITY BACKGROUND WATERMARK TEXT */}
            <div className="absolute -top-12 -left-6 select-none pointer-events-none z-0">
              <span className="text-[120px] sm:text-[150px] font-black tracking-tighter text-neutral-900/[0.04] leading-none uppercase block">
                DRIVE
              </span>
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 space-y-6">
             

              {/* ONE BIG BOLD EXPLANATORY HEADLINE */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
                Rent a car for your journey in <span className="text-neutral-500 font-normal">3 simple steps.</span>
              </h2>

              {/* CTA BUTTON */}
              <div className="pt-2">
                <Link
                  href="/cars"
                  className="inline-flex items-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs sm:text-sm px-7 py-4 rounded-2xl transition-all shadow-xl active:scale-95 cursor-pointer group"
                >
                  <span>Browse All Vehicles</span>
                  <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE VERTICAL CURVED ROAD TRACK & TEXT STEPS */}
          <div className="lg:col-span-7 flex gap-6 sm:gap-10 items-stretch">
            
            {/* CURVED DASHED ROAD ROUTE TRACK */}
            <div className="relative w-24 sm:w-28 shrink-0 flex flex-col items-center justify-between py-2 min-h-[480px]">
              
              {/* SVG Curved Dashed S-Path */}
              <svg
                className="absolute inset-0 w-full h-full text-neutral-400 pointer-events-none"
                viewBox="0 0 100 500"
                preserveAspectRatio="none"
                fill="none"
              >
                {/* Curved Dashed Route Path */}
                <path
                  ref={pathRef}
                  d="M 50 25 C 95 150, 95 220, 50 300 C 5 370, 5 440, 50 465"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                />
              </svg>

              {/* BLUE GOOGLE MAPS STYLE LOCATION PIN */}
              <div className="absolute top-[450px] left-[50%] -translate-x-1/2 z-30 flex items-center justify-center pointer-events-none">
                <BlueGoogleMapPin />
              </div>

              {/* MOVING 3D RED VECTOR CAR (DRIVES CONTINUOUSLY ALONG SVG PATH) */}
              <div
                className="absolute z-20 pointer-events-none transition-transform duration-300 ease-out"
                style={{
                  top: `${carPos.yPercent}%`,
                  left: `${carPos.xPercent}%`,
                  transform: `translate(-50%, -50%) rotate(${carPos.angle}deg)`,
                }}
              >
                <ThreeDVectorCar />
              </div>
            </div>

            {/* VERTICAL STEPS (CLEAN TEXT ONLY WITHOUT CARD BOXES, WITH SLIGHT POP WHEN ACTIVE) */}
            <div className="flex-1 flex flex-col justify-between py-2 space-y-6">
              {STEPS.map((step, idx) => {
                const isActive = activeStep === idx;

                return (
                  <div
                    key={step.stepNumber}
                    className={`transition-all duration-500 py-2 ${
                      isActive
                        ? "scale-[1.05] translate-x-2 opacity-100"
                        : "opacity-45 scale-100 translate-x-0"
                    }`}
                  >
                    {/* Step Number & Tag */}
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`text-2xl sm:text-3xl font-extrabold font-mono transition-colors ${
                          isActive ? "text-neutral-900" : "text-neutral-400"
                        }`}
                      >
                        {step.stepNumber}
                      </span>
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-0.5 rounded-full transition-colors ${
                          isActive
                            ? "bg-neutral-900 text-white shadow-xs"
                            : "bg-neutral-200 text-neutral-600"
                        }`}
                      >
                        {step.tag}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3
                      className={`text-lg sm:text-xl font-bold tracking-tight mb-1.5 transition-colors ${
                        isActive ? "text-neutral-900" : "text-neutral-500"
                      }`}
                    >
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p
                      className={`text-xs sm:text-sm leading-relaxed max-w-lg transition-colors ${
                        isActive ? "text-neutral-700 font-medium" : "text-neutral-400"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
