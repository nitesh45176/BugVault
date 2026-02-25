"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Hide navbar on auth pages
  if (pathname === "/login" || pathname?.startsWith("/auth")) return null;

  return (
    <div
      className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center px-6"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {/* Main Nav */}
      <nav
        ref={menuRef}
        className="w-full max-w-5xl flex items-center justify-between px-5 py-2.5 rounded-2xl border border-white/[0.08] bg-[#0d1117]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group flex-shrink-0"
          onClick={() => setIsOpen(false)}
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_14px_rgba(37,99,235,0.5)] group-hover:shadow-[0_0_22px_rgba(37,99,235,0.7)] transition-shadow duration-200">
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>

          <span
            className="font-bold text-base text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Bug<span className="text-blue-400">Vault</span>
          </span>
        </Link>

        {/* Desktop Center Links */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {[
            { label: "Features", href: "#features" },
            { label: "How It Works", href: "#how" },
            { label: "Who It's For", href: "#who" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-1.5 text-sm text-gray-400 hover:text-blue-400 rounded-lg transition-colors duration-200 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <ThemeToggle />

          {/* Desktop Buttons */}
          <Link
            href="/auth/signin"
            className="hidden md:block text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200"
          >
            Login
          </Link>

          <Link
            href="/dashboard"
            className="hidden md:inline-flex group items-center gap-1.5 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_0_18px_rgba(37,99,235,0.35)] overflow-hidden"
          >
            Get Started
            <span className="inline-block translate-x-[-6px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
              →
            </span>
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden w-full max-w-5xl mt-3 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-2xl border border-white/[0.08] bg-[#0d1117]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-5 space-y-4">
          {[
            { label: "Features", href: "#features" },
            { label: "How It Works", href: "#how" },
            { label: "Who It's For", href: "#who" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-400 hover:text-blue-400 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <Link
            href="/auth/signin"
            onClick={() => setIsOpen(false)}
            className="block text-gray-400 hover:text-blue-400 transition-colors"
          >
            Login
          </Link>

          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block bg-blue-600 text-white text-center py-2 rounded-xl font-semibold"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}