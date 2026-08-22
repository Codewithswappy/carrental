"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  IconX,
  IconSteeringWheel,
  IconGasStation,
  IconUsers,
  IconStarFilled,
  IconArrowRight,
} from "@tabler/icons-react";
import { SearchQueryParams } from "./SearchWidget";

export interface CarItem {
  id: string;
  name: string;
  category: string;
  image: string;
  pricePerDay: number;
  seats: number;
  transmission: string;
  fuel: string;
  mileage: string;
  rating: number;
  features: string[];
}

const FLEET: CarItem[] = [
  // HATCHBACKS
  {
    id: "hatchback-yaris",
    name: "Toyota Yaris Hatchback",
    category: "Hatchback",
    image: "/images/hatchback-studio.jpg",
    pricePerDay: 1800,
    seats: 5,
    transmission: "Automatic / Manual",
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
    transmission: "Automatic (DCT)",
    fuel: "Petrol Turbo",
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
    transmission: "Automatic",
    fuel: "Hybrid / Petrol",
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
    transmission: "Automatic (CVT)",
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
    transmission: "Automatic (DSG)",
    fuel: "Petrol Turbo",
    mileage: "17.8 km/l",
    rating: 4.82,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },

  // SUVs
  {
    id: "thar-4x4",
    name: "Mahindra Thar 4x4",
    category: "SUV",
    image: "/images/thar.jpg",
    pricePerDay: 2999,
    seats: 4,
    transmission: "Automatic",
    fuel: "Diesel 4WD",
    mileage: "14 km/l",
    rating: 4.9,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },
  {
    id: "safari-dark",
    name: "Tata Safari Dark Edition",
    category: "SUV",
    image: "/images/hero-bg.jpg",
    pricePerDay: 3499,
    seats: 7,
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
    transmission: "Automatic",
    fuel: "Petrol Turbo",
    mileage: "16.5 km/l",
    rating: 4.78,
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
    transmission: "Automatic",
    fuel: "Petrol / Mild-Hybrid",
    mileage: "15.2 km/l",
    rating: 4.98,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },
  {
    id: "fortuner-legender",
    name: "Toyota Fortuner Legender",
    category: "Luxury",
    image: "/images/fortuner.jpg",
    pricePerDay: 4999,
    seats: 7,
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
    transmission: "Automatic",
    fuel: "Petrol Turbo",
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
    transmission: "Automatic",
    fuel: "Electric (450 km range)",
    mileage: "EV Zero Emissions",
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
    transmission: "Automatic",
    fuel: "Electric (400 km range)",
    mileage: "EV Zero Emissions",
    rating: 4.75,
    features: ["Valid DL required", "Government ID", "21+ Age"],
  },
];

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchParams: SearchQueryParams | null;
  onSelectCar: (car: CarItem) => void;
}

export default function VehicleModal({
  isOpen,
  onClose,
  searchParams,
  onSelectCar,
}: VehicleModalProps) {
  const [filter, setFilter] = useState("all");

  if (!isOpen) return null;

  const filtered = FLEET.filter((c) => {
    if (filter === "all") return true;
    if (filter === "suv") return c.category.includes("SUV");
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150 font-sans">
      <div className="relative w-full max-w-4xl bg-white text-neutral-900 border border-neutral-200 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Available Vehicles
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Location: {searchParams?.departureCity || "Selected Location"} •{" "}
              {searchParams?.driverType === "with_driver" ? "With Driver" : "Without Driver"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Vehicle List */}
        <div className="p-6 overflow-y-auto space-y-4">
          {filtered.map((car) => (
            <div
              key={car.id}
              className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col md:flex-row gap-5 items-center justify-between transition-colors"
            >
              {/* Full Width Image Container with bg-neutral-200 */}
              <div className="relative w-full md:w-56 h-36 rounded-lg overflow-hidden bg-neutral-200 shrink-0">
                <Image src={car.image} alt={car.name} fill className="object-cover" />
              </div>

              {/* Specs */}
              <div className="flex-1 w-full space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                    {car.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-neutral-700">
                    <IconStarFilled className="w-3.5 h-3.5 text-amber-400" />
                    <span>{car.rating}</span>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-neutral-900">{car.name}</h3>

                <div className="flex flex-wrap gap-2 text-xs text-neutral-600">
                  <span className="flex items-center gap-1 bg-neutral-100 px-2.5 py-1 rounded-md">
                    <IconSteeringWheel className="w-3.5 h-3.5 text-neutral-400" />
                    {car.transmission}
                  </span>
                  <span className="flex items-center gap-1 bg-neutral-100 px-2.5 py-1 rounded-md">
                    <IconGasStation className="w-3.5 h-3.5 text-neutral-400" />
                    {car.fuel}
                  </span>
                  <span className="flex items-center gap-1 bg-neutral-100 px-2.5 py-1 rounded-md">
                    <IconUsers className="w-3.5 h-3.5 text-neutral-400" />
                    {car.seats} Seats
                  </span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="w-full md:w-44 flex flex-row md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-neutral-200 pt-3 md:pt-0 md:pl-5 shrink-0 gap-3">
                <div className="text-left md:text-right">
                  <span className="text-[11px] text-neutral-400 block font-normal">Start from</span>
                  <span className="text-lg font-bold text-neutral-900">
                    ₹{car.pricePerDay.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[11px] text-neutral-500"> / day</span>
                </div>

                <button
                  onClick={() => onSelectCar(car)}
                  className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs py-2.5 px-4 rounded-xl transition-colors"
                >
                  <span>Book Now</span>
                  <IconArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
