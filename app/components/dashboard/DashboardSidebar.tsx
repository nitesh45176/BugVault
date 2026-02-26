"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

function ThemeToggleRow({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const isDark = theme === "dark";
  if (compact) {
    return (
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {isDark ? "☀️" : "🌙"}
      </button>
    );
  }
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-sm hover:bg-white/[0.05]"
    >
      {isDark ? "☀️ Light mode" : "🌙 Dark mode"}
    </button>
  );
}

function Logo({ isLight = false, size = 32 }: { isLight?: boolean; size?: number }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" style={{ textDecoration: "none" }}>
      <div
        className="rounded-lg bg-blue-600 flex items-center justify-center"
        style={{ width: size, height: size, flexShrink: 0, boxShadow: "0 0 14px rgba(37,99,235,0.5)" }}
      >
        <svg width={size * 0.45} height={size * 0.45} fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>
      <span
        className="font-bold text-base"
        style={{ fontFamily: "'Syne', sans-serif", color: isLight ? "#111827" : "#ffffff" }}
      >
        {"Bug"}<span className="text-blue-400">{"Vault"}</span>
      </span>
    </Link>
  );
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => setMobileOpen(false), [pathname]);

  const id = pathname.split("/")[3];

  const navItems = [
    { label: "Projects", href: "/dashboard" },
    { label: "Bugs", href: `/dashboard/projects/${id}/bugs` },
    { label: "Decisions", href: `/dashboard/projects/${id}/decisions` },
  ];

  const isLight = mounted && theme === "light";
  const bg = isLight ? "#f8faff" : "#080c14";
  const border = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)";
  const inactiveColor = isLight ? "#475569" : "#9ca3af";

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className="hidden lg:flex fixed top-0 left-0 h-screen w-56 flex-col z-40 border-r"
        style={{ backgroundColor: bg, borderColor: border }}
      >
        <div className="px-5 py-5 border-b" style={{ borderColor: border }}>
          <Logo isLight={isLight} size={32} />
        </div>

        <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={{
                  backgroundColor: isActive ? "rgba(37,99,235,0.12)" : "transparent",
                  color: isActive ? "#3b82f6" : inactiveColor,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-3 py-4 border-t flex flex-col gap-2" style={{ borderColor: border }}>
          <ThemeToggleRow />
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 hover:bg-red-500/10 group"
            style={{ color: inactiveColor }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              className="flex-shrink-0 group-hover:text-red-400 transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="group-hover:text-red-400 transition-colors">Sign out</span>
          </Link>
        </div>
      </aside>

      {/* ================= MOBILE HEADER ================= */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 border-b"
        style={{ backgroundColor: bg, borderColor: border }}
      >
        <Logo isLight={isLight} size={28} />

        <div className="flex items-center gap-3">
          <ThemeToggleRow compact />
          <button
            onClick={(e) => { e.stopPropagation(); setMobileOpen((prev) => !prev); }}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: mobileOpen ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${mobileOpen ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.08)"}`,
              color: mobileOpen ? "#3b82f6" : "#9ca3af",
            }}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* ================= BACKDROP ================= */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className="lg:hidden fixed top-14 left-0 right-0 z-50 border-b"
        style={{
          backgroundColor: bg,
          borderColor: border,
          maxHeight: mobileOpen ? "400px" : "0px",
          overflow: "hidden",
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? "translateY(0)" : "translateY(-8px)",
          transition: "max-height 0.3s ease, opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3"
                style={{
                  backgroundColor: isActive ? "rgba(37,99,235,0.12)" : "transparent",
                  color: isActive ? "#3b82f6" : inactiveColor,
                }}
              >
                <span style={{
                  width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0,
                  background: isActive ? "#3b82f6" : "transparent",
                  border: isActive ? "none" : `1px solid ${inactiveColor}`,
                  boxShadow: isActive ? "0 0 6px #3b82f6" : "none",
                }} />
                {item.label}
              </Link>
            );
          })}

          <div style={{ height: "1px", background: border, margin: "0.5rem 0" }} />
          <div className="px-1"><ThemeToggleRow /></div>

          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all hover:bg-red-500/10"
            style={{ color: "#f87171" }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </Link>
        </div>
      </div>
    </>
  );
}