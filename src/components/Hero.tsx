"use client";

import React from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import SearchWidget, { SearchQueryParams } from "./SearchWidget";

interface HeroProps {
  onSearchSubmit: (params: SearchQueryParams) => void;
  onBookClick: () => void;
}

export default function Hero({ onSearchSubmit, onBookClick }: HeroProps) {
  return (
    <div className="relative w-full min-h-[62vh] md:min-h-screen flex flex-col justify-between overflow-visible pb-6 md:pb-8 bg-zinc-950 font-sans select-none">
      
      {/* Background Hero Images */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Portrait Mobile Hero Image (Mahindra Thar SUV) */}
        <Image
          src="/images/hero-bg-mobile.jpg"
          alt="Car Rental Journey Mobile"
          fill
          priority
          className="block sm:hidden object-cover object-[center_35%] brightness-[0.88]"
        />
        {/* Landscape Desktop Hero Image */}
        <Image
          src="/images/hero-bg.jpg"
          alt="Car Rental Journey"
          fill
          priority
          className="hidden sm:block object-cover object-center brightness-[0.9]"
        />
        {/* Soft Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 sm:to-transparent" />
      </div>

      {/* Integrated Navbar */}
      <Navbar onBookClick={onBookClick} />

      {/* Main Hero Headline Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-28 md:pt-36 pb-4 md:pb-8 flex-1 flex flex-col justify-center items-start w-full">
        <div className="max-w-2xl space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.15] sm:leading-[1.1] drop-shadow-lg">
            Rent a Car for Every Journey
          </h1>

          <p className="text-xs sm:text-base md:text-lg text-zinc-100 font-normal leading-relaxed max-w-xl drop-shadow-md">
            Premium self-drive and chauffeur rentals across India. Book instantly with doorstep delivery.
          </p>
        </div>
      </div>

      {/* DESKTOP SEARCH WIDGET: Sits INSIDE Hero Section at bottom */}
      <div className="hidden md:block relative z-40 w-full px-6 lg:px-12 pb-8 overflow-visible">
        <SearchWidget onSearch={onSearchSubmit} />
      </div>

      {/* MOBILE SEARCH WIDGET: Overlapping half on Hero banner */}
      <div className="md:hidden relative z-40 max-w-7xl mx-auto px-4 -mb-16 overflow-visible">
        <SearchWidget onSearch={onSearchSubmit} />
      </div>

    </div>
  );
}
