"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Close on outside click — but only if the click is truly outside the nav
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
      // Use 'click' (not 'mousedown') so button onClick fires first
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  // Hide navbar on auth pages
  if (pathname === "/login" || pathname?.startsWith("/auth")) return null;

  const handleScroll = (id: string) => {
    setIsOpen(false);
    // Defer scroll so menu close animation doesn't block it
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    setTimeout(() => {
      router.push(path);
    }, 50);
  };

  return (
    <div
      className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center px-6"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <nav
        ref={menuRef}
        className="w-full max-w-5xl flex items-center justify-between px-5 py-2.5 rounded-2xl border border-white/[0.08] bg-[#0d1117]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative"
      >
        {/* Logo */}
        <button
          onClick={() => handleNavigate("/")}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_14px_rgba(37,99,235,0.5)]">
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
            {"Bug"}<span className="text-blue-400">{"Vault"}</span>
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {[
            { label: "Features", id: "features" },
            { label: "How It Works", id: "how" },
            { label: "Who It's For", id: "who" },
          ].map((link) => (
            <button
              key={link.label}
              onClick={() => handleScroll(link.id)}
              className="px-4 py-1.5 text-sm text-gray-400 hover:text-blue-400 rounded-lg transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={() => handleNavigate("/auth/signin")}
            className="hidden md:block text-sm text-gray-400 hover:text-blue-400"
          >
            Login
          </button>

          <button
            onClick={() => handleNavigate("/dashboard")}
            className="hidden md:inline-flex px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl"
          >
            Get Started →
          </button>

          {/* Hamburger */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent outside-click from firing immediately
              setIsOpen((prev) => !prev);
            }}
            className="md:hidden text-gray-300"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden w-full max-w-5xl mt-3 rounded-2xl border border-white/[0.08] bg-[#0d1117]/95 backdrop-blur-xl shadow-xl p-5 space-y-4">
          {[
            { label: "Features", id: "features" },
            { label: "How It Works", id: "how" },
            { label: "Who It's For", id: "who" },
          ].map((link) => (
            <button
              key={link.label}
              onClick={() => handleScroll(link.id)}
              className="block w-full text-left text-gray-400 hover:text-blue-400"
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => handleNavigate("/auth/signin")}
            className="block w-full text-left text-gray-400 hover:text-blue-400"
          >
            Login
          </button>

          <button
            onClick={() => handleNavigate("/dashboard")}
            className="block w-full bg-blue-600 text-white text-center py-2 rounded-xl font-semibold"
          >
            Get Started
          </button>
        </div>
      )}
    </div>
  );
}