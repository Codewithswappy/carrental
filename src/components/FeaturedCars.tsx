"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconSteeringWheel,
  IconUsers,
  IconLuggage,
  IconStarFilled,
  IconArrowRight,
  IconGasStation,
  IconBolt,
} from "@tabler/icons-react";
import { CarItem } from "./VehicleModal";

interface FeaturedCarsProps {
  onSelectCar?: (car: CarItem) => void;
}

export interface FeaturedCarData extends CarItem {
  luggage: number;
}

const FEATURED_CARS: FeaturedCarData[] = [
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
    transmission: "Automatic (CVT)",
    fuel: "Petrol",
    mileage: "18.4 km/l",
    rating: 4.75,
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
    fuel: "Diesel 4WD",
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

  // LUXURY
  {
    id: "luxury-mercedes-e-class",
    name: "Mercedes-Benz E-Class Luxury Sedan",
    category: "Luxury",
    image: "/images/cars/mercedes-e-class-v2.jpg",
    pricePerDay: 5499,
    seats: 5,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Petrol / Mild-Hybrid",
    mileage: "15.2 km/l",
    rating: 4.98,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },
  {
    id: "luxury-fortuner",
    name: "Toyota Fortuner Legender 4x4",
    category: "Luxury",
    image: "/images/fortuner.jpg",
    pricePerDay: 4999,
    seats: 7,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Diesel 4WD",
    mileage: "12.5 km/l",
    rating: 4.95,
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
];

const CATEGORIES = ["All", "Hatchback", "Sedan", "SUV", "Luxury", "Electric"];

export default function FeaturedCars({ onSelectCar }: FeaturedCarsProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCars = FEATURED_CARS.filter((car) => {
    if (activeCategory === "All") return true;
    return car.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section id="fleet" className="w-full py-16 bg-white text-neutral-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-1.5">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
              Top picks vehicle this month
            </h2>
            <p className="text-sm text-neutral-500 font-normal">
              Experience the epitome of amazing journey with our top picks.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* FULL WIDTH Image Container with bg-neutral-200 */}
                <div className="relative w-full aspect-[4/3] bg-neutral-200 overflow-hidden">
                  {/* Category Pill Badge */}
                  <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-xs text-neutral-800 font-medium text-[11px] px-3 py-1 rounded-full">
                    {car.category}
                  </span>

                  {/* Full Width Car Image */}
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Car Details Content */}
                <div className="p-4 space-y-2.5">
                  <h3 className="text-base font-semibold text-neutral-900">
                    {car.name}
                  </h3>

                  {/* Specs Row */}
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

                    <div className="flex items-center gap-1">
                      <IconLuggage className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>{car.luggage}</span>
                    </div>

                    <div className="flex items-center gap-1 ml-auto font-medium text-neutral-700">
                      <IconStarFilled className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{car.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Price & Action Bar */}
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
                  onClick={() => onSelectCar && onSelectCar(car)}
                  className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <span>Book Now</span>
                  <IconArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Clean "View More" Button linking to /cars page */}
        <div className="mt-12 text-center">
          <Link
            href="/cars"
            className="inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm px-7 py-3 rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            <span>View More</span>
            <IconArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
