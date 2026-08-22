"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BookingConfirmationModal from "@/components/BookingConfirmationModal";
import CheckAvailabilityModal, { AvailabilityRequirements } from "@/components/CheckAvailabilityModal";
import { CarItem } from "@/components/VehicleModal";
import {
  IconSteeringWheel,
  IconUsers,
  IconLuggage,
  IconStarFilled,
  IconArrowRight,
  IconGasStation,
  IconBolt,
  IconFilter,
  IconArrowLeft,
  IconRefresh,
} from "@tabler/icons-react";

export interface FleetCarItem extends CarItem {
  luggage: number;
}

const ALL_FLEET: FleetCarItem[] = [
  // HATCHBACKS
  {
    id: "hatchback-yaris",
    name: "Toyota Yaris Hatchback",
    category: "Hatchback",
    image: "/images/hatchback-studio.jpg",
    pricePerDay: 1800,
    seats: 5,
    luggage: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "18 km/l",
    rating: 4.7,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },
  {
    id: "hatchback-swift",
    name: "Maruti Suzuki Swift ZXi",
    category: "Hatchback",
    image: "/images/hatchback-studio.jpg",
    pricePerDay: 1499,
    seats: 5,
    luggage: 2,
    transmission: "Manual",
    fuel: "Petrol",
    mileage: "22 km/l",
    rating: 4.65,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },
  {
    id: "hatchback-i20",
    name: "Hyundai i20 N-Line",
    category: "Hatchback",
    image: "/images/hatchback-studio.jpg",
    pricePerDay: 1750,
    seats: 5,
    luggage: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "17 km/l",
    rating: 4.75,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },

  // SEDANS
  {
    id: "sedan-camry",
    name: "Toyota Camry Executive",
    category: "Sedan",
    image: "/images/sedan-studio.jpg",
    pricePerDay: 2499,
    seats: 5,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Hybrid",
    mileage: "21 km/l",
    rating: 4.8,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },
  {
    id: "sedan-city",
    name: "Honda City VTEC",
    category: "Sedan",
    image: "/images/sedan-studio.jpg",
    pricePerDay: 2199,
    seats: 5,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "18.4 km/l",
    rating: 4.75,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },
  {
    id: "sedan-slavia",
    name: "Skoda Slavia 1.5 TSI",
    category: "Sedan",
    image: "/images/sedan-studio.jpg",
    pricePerDay: 2399,
    seats: 5,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "17.8 km/l",
    rating: 4.82,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },

  // SUVs
  {
    id: "suv-thar",
    name: "Mahindra Thar 4x4 Hard Top",
    category: "SUV",
    image: "/images/thar.jpg",
    pricePerDay: 2999,
    seats: 4,
    luggage: 2,
    transmission: "Automatic",
    fuel: "Diesel",
    mileage: "14 km/l",
    rating: 4.9,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },
  {
    id: "suv-safari",
    name: "Tata Safari Dark Edition",
    category: "SUV",
    image: "/images/hero-bg.jpg",
    pricePerDay: 3499,
    seats: 7,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Diesel",
    mileage: "16 km/l",
    rating: 4.85,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },
  {
    id: "suv-seltos",
    name: "Kia Seltos GTX+ Turbo",
    category: "SUV",
    image: "/images/creta-studio.jpg",
    pricePerDay: 2699,
    seats: 5,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "16.5 km/l",
    rating: 4.78,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },
  {
    id: "suv-xuv700",
    name: "Mahindra XUV700 AX7 Luxury",
    category: "SUV",
    image: "/images/hero-bg.jpg",
    pricePerDay: 3299,
    seats: 7,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Diesel",
    mileage: "15 km/l",
    rating: 4.88,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },

  // LUXURY
  {
    id: "luxury-fortuner",
    name: "Toyota Fortuner Legender 4x4",
    category: "Luxury",
    image: "/images/fortuner.jpg",
    pricePerDay: 4999,
    seats: 7,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Diesel",
    mileage: "12.5 km/l",
    rating: 4.95,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },
  {
    id: "luxury-bmw",
    name: "BMW 3 Series Gran Limousine",
    category: "Luxury",
    image: "/images/bmw-studio.jpg",
    pricePerDay: 6499,
    seats: 5,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "14 km/l",
    rating: 4.92,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },

  // ELECTRIC
  {
    id: "electric-tesla",
    name: "Tesla Model Y / EV SUV",
    category: "Electric",
    image: "/images/ev-studio.jpg",
    pricePerDay: 3800,
    seats: 5,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Electric",
    mileage: "450 km range",
    rating: 4.9,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },
  {
    id: "electric-nexon",
    name: "Tata Nexon EV Max",
    category: "Electric",
    image: "/images/ev-studio.jpg",
    pricePerDay: 2299,
    seats: 5,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Electric",
    mileage: "400 km range",
    rating: 4.75,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },
  {
    id: "electric-ioniq",
    name: "Hyundai Ioniq 5 EV",
    category: "Electric",
    image: "/images/ev-studio.jpg",
    pricePerDay: 4299,
    seats: 5,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Electric",
    mileage: "480 km range",
    rating: 4.93,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },
];

export default function AllCarsPage() {
  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedFuel, setSelectedFuel] = useState<string[]>([]);
  const [selectedTransmission, setSelectedTransmission] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(8000);
  
  // Modals State
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Toggle Fuel Filter
  const toggleFuel = (fuel: string) => {
    setSelectedFuel((prev) =>
      prev.includes(fuel) ? prev.filter((f) => f !== fuel) : [...prev, fuel]
    );
  };

  // Toggle Transmission Filter
  const toggleTransmission = (trans: string) => {
    setSelectedTransmission((prev) =>
      prev.includes(trans) ? prev.filter((t) => t !== trans) : [...prev, trans]
    );
  };

  // Reset Filters
  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedFuel([]);
    setSelectedTransmission([]);
    setMaxPrice(8000);
  };

  // Handle Requirements Submission from Check Availability Modal
  const handleAvailabilitySubmit = (reqs: AvailabilityRequirements) => {
    if (reqs.category) {
      setSelectedCategory(reqs.category);
    }
    setAvailabilityModalOpen(false);
  };

  // Filtered Cars Memo
  const filteredCars = useMemo(() => {
    return ALL_FLEET.filter((car) => {
      // Category filter
      if (selectedCategory !== "All" && car.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Fuel filter
      if (selectedFuel.length > 0 && !selectedFuel.includes(car.fuel)) {
        return false;
      }
      // Transmission filter
      if (
        selectedTransmission.length > 0 &&
        !selectedTransmission.some((t) => car.transmission.toLowerCase().includes(t.toLowerCase()))
      ) {
        return false;
      }
      // Price filter
      if (car.pricePerDay > maxPrice) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, selectedFuel, selectedTransmission, maxPrice]);

  return (
    <div className="w-full min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        variant="light"
        onBookClick={() => setAvailabilityModalOpen(true)}
      />

      {/* Main Page Layout */}
      <div className="pt-28 pb-16 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header Title Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-200">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-neutral-900 mb-2 transition-colors cursor-pointer"
            >
              <IconArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
              All Available Vehicles
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Select from our verified rental fleet across India with instant WhatsApp booking.
            </p>
          </div>

          <div className="text-right sm:text-right shrink-0">
            <span className="text-xs text-neutral-500 block">Showing</span>
            <span className="text-xl font-bold text-neutral-900">
              {filteredCars.length} Cars
            </span>
          </div>
        </div>

        {/* 2-Column Grid: Left Sidebar Filters + Right Vehicle Cards Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT SIDEBAR FILTERS (Compact) */}
          <aside className="w-full lg:w-64 shrink-0 bg-white border border-neutral-200 rounded-2xl p-5 space-y-6 text-xs text-neutral-900 shadow-xs lg:sticky lg:top-24">
            
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-1.5 font-semibold text-neutral-900">
                <IconFilter className="w-4 h-4 text-neutral-700" />
                <span>Filters</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-[11px] font-medium text-neutral-500 hover:text-neutral-900 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <IconRefresh className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* 1. Category Filter */}
            <div className="space-y-2.5">
              <label className="font-semibold text-neutral-800 uppercase tracking-wider text-[11px] block">
                Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["All", "Hatchback", "Sedan", "SUV", "Luxury", "Electric"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Fuel Type Filter */}
            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <label className="font-semibold text-neutral-800 uppercase tracking-wider text-[11px] block">
                Fuel Type
              </label>
              <div className="space-y-1.5">
                {["Petrol", "Diesel", "Hybrid", "Electric"].map((fuel) => (
                  <label
                    key={fuel}
                    className="flex items-center gap-2 text-neutral-700 cursor-pointer font-medium hover:text-neutral-900"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFuel.includes(fuel)}
                      onChange={() => toggleFuel(fuel)}
                      className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer"
                    />
                    <span>{fuel}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Transmission Filter */}
            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <label className="font-semibold text-neutral-800 uppercase tracking-wider text-[11px] block">
                Transmission
              </label>
              <div className="space-y-1.5">
                {["Automatic", "Manual"].map((trans) => (
                  <label
                    key={trans}
                    className="flex items-center gap-2 text-neutral-700 cursor-pointer font-medium hover:text-neutral-900"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTransmission.includes(trans)}
                      onChange={() => toggleTransmission(trans)}
                      className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer"
                    />
                    <span>{trans}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Max Price Per Day Filter */}
            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <div className="flex justify-between items-center text-[11px] font-semibold text-neutral-800">
                <span className="uppercase tracking-wider">Max Price / Day</span>
                <span className="text-neutral-900 font-bold">₹{maxPrice.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min={1400}
                max={8000}
                step={200}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-neutral-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-medium">
                <span>₹1,400</span>
                <span>₹8,000</span>
              </div>
            </div>

          </aside>

          {/* RIGHT SIDE VEHICLE CARDS GRID */}
          <main className="flex-1 w-full">
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <div
                    key={car.id}
                    className="bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* FULL WIDTH Image Container with bg-neutral-200 */}
                      <div className="relative w-full aspect-[4/3] bg-neutral-200 overflow-hidden">
                        <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-xs text-neutral-800 font-medium text-[11px] px-3 py-1 rounded-full">
                          {car.category}
                        </span>

                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Car Specs Details */}
                      <div className="p-4 space-y-2.5">
                        <h3 className="text-base font-semibold text-neutral-900">
                          {car.name}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-500 font-normal">
                          <div className="flex items-center gap-1">
                            <IconSteeringWheel className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <span>{car.transmission.split(" ")[0]}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            {car.fuel.includes("Electric") ? (
                              <IconBolt className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : (
                              <IconGasStation className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            )}
                            <span>{car.fuel.split(" ")[0]}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <IconUsers className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <span>{car.seats}</span>
                          </div>

                          <div className="flex items-center gap-1 ml-auto font-medium text-neutral-700">
                            <IconStarFilled className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>{car.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Price & Action */}
                    <div className="p-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-neutral-400 block font-normal">
                          Start from
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-bold text-neutral-900">
                            ₹{car.pricePerDay.toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-neutral-500 font-normal">
                            / day
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCar(car);
                          setModalOpen(true);
                        }}
                        className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                      >
                        <span>Book Now</span>
                        <IconArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 bg-white rounded-2xl border border-neutral-200 text-center space-y-3">
                <p className="text-sm font-semibold text-neutral-800">
                  No vehicles match your active filter criteria.
                </p>
                <p className="text-xs text-neutral-500">
                  Try unchecking some filters or resetting to view available cars.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-neutral-900 text-white text-xs font-medium rounded-xl cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Check Availability Requirements Modal */}
      <CheckAvailabilityModal
        isOpen={availabilityModalOpen}
        onClose={() => setAvailabilityModalOpen(false)}
        onSubmitRequirements={handleAvailabilitySubmit}
      />

      {/* Direct WhatsApp Booking Modal */}
      <BookingConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        car={selectedCar}
        searchParams={null}
      />
    </div>
  );
}
