"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {isDark ? "☀️" : "🌙"}
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-sm transition-all duration-150 hover:bg-white/[0.05]"
    >
      {isDark ? "☀️ Light mode" : "🌙 Dark mode"}
    </button>
  );
}

function LogoIcon({ size = 22 }: { size?: number }) {
  return (
    <img
      src="/favicon.ico"
      alt="BugVault logo"
      width={size}
      height={size}
      style={{ flexShrink: 0, objectFit: "contain" }}
    />
  );
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const id = pathname.split("/")[3];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/dashboard/search?q=${encodeURIComponent(search)}`);
    setSearch("");
  };

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
          <Link href="/" className="font-bold text-white flex gap">
            <LogoIcon size={20} />
            Bug<span className="text-blue-400">Vault</span>
          </Link>
        </div>

        <div className="px-3 pt-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 pl-9 text-sm rounded-xl bg-white/[0.04] border border-white/[0.08] focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.06] transition-all text-white placeholder-gray-500"
            />
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
            </svg>
          </form>
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
        className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 border-b"
        style={{ backgroundColor: bg, borderColor: border }}
      >
        <Link href="/dashboard" className="font-bold text-white flex ">
        <LogoIcon size={20} />
          Bug<span className="text-blue-400">Vault</span>
        </Link>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-28 px-3 py-1.5 pl-8 text-xs rounded-lg bg-white/[0.04] border border-white/[0.08] focus:outline-none focus:border-blue-500/40 text-white placeholder-gray-500"
            />
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
            </svg>
          </form>

          <ThemeToggleRow compact />

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
            style={{
              background: mobileOpen ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${mobileOpen ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.08)"}`,
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={2.5}>
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="text-gray-400">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ================= MOBILE DRAWER BACKDROP ================= */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className="lg:hidden fixed top-14 left-0 right-0 z-40 border-b"
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
                className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 flex items-center gap-3"
                style={{
                  backgroundColor: isActive ? "rgba(37,99,235,0.12)" : "transparent",
                  color: isActive ? "#3b82f6" : inactiveColor,
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: isActive ? "#3b82f6" : "transparent",
                    border: isActive ? "none" : `1px solid ${inactiveColor}`,
                    flexShrink: 0,
                    boxShadow: isActive ? "0 0 6px #3b82f6" : "none",
                  }}
                />
                {item.label}
              </Link>
            );
          })}

          <div style={{ height: "1px", background: border, margin: "0.5rem 0" }} />

          <div className="px-1">
            <ThemeToggleRow />
          </div>

          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-150 hover:bg-red-500/10 group"
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
      </div>
    </>
  );
}