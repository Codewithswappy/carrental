"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import CarCategories from "@/components/CarCategories";
import FeaturedCars from "@/components/FeaturedCars";
import HowItWorks from "@/components/HowItWorks";
import RentalExperience from "@/components/RentalExperience";
import WhyChooseUs from "@/components/WhyChooseUs";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import VehicleModal, { CarItem } from "@/components/VehicleModal";
import BookingConfirmationModal from "@/components/BookingConfirmationModal";
import CheckAvailabilityModal, { AvailabilityRequirements } from "@/components/CheckAvailabilityModal";
import { SearchQueryParams } from "@/components/SearchWidget";

export default function Home() {
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false);
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchQueryParams | null>(null);
  const [selectedCar, setSelectedCar] = useState<CarItem | null>(null);

  const handleSearchSubmit = (params: SearchQueryParams) => {
    setSearchParams(params);
    setVehicleModalOpen(true);
  };

  const handleAvailabilitySubmit = (reqs: AvailabilityRequirements) => {
    setSearchParams({
      departureCity: reqs.city,
      returnCity: reqs.city,
      isRoundTrip: true,
      driverType: reqs.driverType,
      pickUpDate: reqs.pickUpDate,
      pickUpTime: reqs.pickUpTime,
      returnDate: reqs.pickUpDate,
      returnTime: reqs.pickUpTime,
    });
    setAvailabilityModalOpen(false);
    setVehicleModalOpen(true);
  };

  const handleSelectCar = (car: CarItem) => {
    setSelectedCar(car);
    setVehicleModalOpen(false);
    setBookingModalOpen(true);
  };

  return (
    <main className="w-full min-h-screen bg-zinc-950 text-white selection:bg-amber-400 selection:text-zinc-950 font-sans overflow-x-hidden">
      
      {/* 1. HERO BANNER & SEARCH WIDGET */}
      <Hero
        onSearchSubmit={handleSearchSubmit}
        onBookClick={() => setAvailabilityModalOpen(true)}
      />

      {/* 2. FEATURED CARS SECTION */}
      <div className="relative z-10 pt-6 md:pt-12 bg-zinc-950">
        <FeaturedCars onSelectCar={handleSelectCar} />
      </div>

      {/* 3. WHY CHOOSE US FEATURE GRID */}
      <WhyChooseUs />

      {/* 4. HOW IT WORKS ANIMATED TIMELINE */}
      <HowItWorks />

      {/* 5. FLEET CATEGORIES SECTION */}
      <CarCategories />

      {/* 6. RENTAL EXPERIENCE / LIFESTYLE FREEDOM BANNER */}
      <RentalExperience />

      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <FaqSection />

      {/* 8. FINAL CTA CONVERSION BANNER */}
      {/* <CtaBanner /> */}

      {/* 9. CLEAN & COMPACT FOOTER */}
      <Footer />

      {/* Modals */}
      <CheckAvailabilityModal
        isOpen={availabilityModalOpen}
        onClose={() => setAvailabilityModalOpen(false)}
        onSubmitRequirements={handleAvailabilitySubmit}
      />

      <VehicleModal
        isOpen={vehicleModalOpen}
        onClose={() => setVehicleModalOpen(false)}
        searchParams={searchParams}
        onSelectCar={handleSelectCar}
      />

      <BookingConfirmationModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        car={selectedCar}
        searchParams={searchParams}
      />

    </main>
  );
}
