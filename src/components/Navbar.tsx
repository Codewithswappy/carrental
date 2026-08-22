"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { IconMenu2, IconX, IconChevronRight } from "@tabler/icons-react";

interface NavbarProps {
  onBookClick?: () => void;
  variant?: "dark" | "light"; // "dark" for hero/landing, "light" for cars page
}

export default function Navbar({ onBookClick, variant = "dark" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Determine if header should render in light mode (black text + white bg)
  const isLightMode = variant === "light" || scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isLightMode
            ? "bg-white/95 backdrop-blur-md border-b border-neutral-200 py-3 shadow-xs"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo Image */}
            <Link href="/" className="flex items-center gap-2 group cursor-pointer shrink-0">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={140}
                height={40}
                priority
                className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              {[
                { label: "Fleet", href: "/#fleet" },
                { label: "All Cars", href: "/cars" },
                { label: "Services", href: "/#services" },
                { label: "Locations", href: "/#locations" },
                { label: "About", href: "/#about" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors duration-200 cursor-pointer ${
                    isLightMode
                      ? "text-neutral-800 hover:text-neutral-950 font-medium"
                      : "text-white hover:text-neutral-200 font-medium"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Action Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={onBookClick}
                className={`text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-xs cursor-pointer ${
                  isLightMode
                    ? "bg-neutral-900 text-white hover:bg-neutral-800"
                    : "bg-white text-neutral-900 hover:bg-neutral-100"
                }`}
              >
                Check Availability
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`md:hidden p-2 transition-colors cursor-pointer rounded-xl ${
                isLightMode ? "text-neutral-900 hover:bg-neutral-100" : "text-white hover:bg-white/10"
              }`}
              aria-label="Open navigation menu"
            >
              <IconMenu2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN PORTAL MOBILE DRAWER (White Background) */}
      {mobileMenuOpen &&
        mounted &&
        createPortal(
          <div className="md:hidden fixed inset-0 z-[9999] bg-white text-neutral-900 font-sans flex flex-col justify-between p-6 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between pb-5 border-b border-neutral-200">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={140}
                height={40}
                priority
                className="h-9 w-auto object-contain"
              />

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <IconX className="w-6 h-6" />
              </button>
            </div>

            {/* Vertical Navigation Links */}
            <nav className="flex flex-col gap-6 my-auto py-8 text-xl font-semibold tracking-tight">
              {[
                { label: "Fleet", href: "/#fleet" },
                { label: "All Cars", href: "/cars" },
                { label: "Services", href: "/#services" },
                { label: "Locations", href: "/#locations" },
                { label: "About", href: "/#about" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer group py-1"
                >
                  <span>{link.label}</span>
                  <IconChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                </Link>
              ))}
            </nav>

            {/* Bottom Action CTA */}
            <div className="pt-5 border-t border-neutral-200 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick && onBookClick();
                }}
                className="w-full py-4 bg-neutral-950 text-white font-semibold text-sm rounded-2xl text-center shadow-md active:scale-98 transition-all cursor-pointer"
              >
                Check Availability
              </button>

              <p className="text-center text-[11px] text-neutral-500">
                Instant Self-Drive & Chauffeur Rental • 24/7 Support
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
