"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const PHRASES = [
  "Why You Wrote That Code.",
  "How You Solved That Bug.",
  "Why You Chose That Library.",
  "What Caused That Crash.",
  "How You Fixed That CORS Error.",
];

function Typewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIndex];

    if (isPaused) {
      const t = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 1800);
      return () => clearTimeout(t);
    }

    if (isDeleting) {
      if (displayed.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % PHRASES.length);
        return;
      }
      const t = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), 28);
      return () => clearTimeout(t);
    }

    if (displayed.length === current.length) {
      setIsPaused(true);
      return;
    }

    const t = setTimeout(
      () => setDisplayed(current.slice(0, displayed.length + 1)),
      displayed.length === 0 ? 120 : 55
    );
    return () => clearTimeout(t);
  }, [displayed, isDeleting, isPaused, phraseIndex]);

  return (
    <span className="text-blue-400">
      {displayed}
      <span
        className="inline-block w-[2px] h-[0.85em] bg-blue-400 ml-0.5 align-middle"
        style={{ animation: "blink 1s step-end infinite" }}
      />
    </span>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay: number, x = 0, y = 20) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translate(0,0)" : `translate(${x}px,${y}px)`,
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <section className="relative bg-black overflow-hidden pt-10">

      {/* Dot grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Diagonal lines */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.6) 40px, rgba(255,255,255,0.6) 41px)`,
        }}
      />

      {/* Blue glows */}
      <div className="fixed pointer-events-none z-0" style={{ top: "-10%", right: "-5%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 65%)" }} />
      <div className="fixed pointer-events-none z-0" style={{ top: "20%", right: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)" }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-20 flex items-start gap-16">

        {/* LEFT */}
        <div className="flex flex-col min-w-0" style={{ width: "480px", flexShrink: 0 }}>

          {/* Pill */}
          <div
            className="inline-flex items-center gap-2 w-fit px-4 py-1.5 mb-6 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wide"
            style={fade(0.1)}
          >
             Your Developer Memory System
          </div>

          {/* Heading with typewriter */}
          <h1
            className="font-extrabold text-white leading-[1.1]"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 3.5rem)",
              ...fade(0.2),
            }}
          >
            Never Forget<br />
            {/* Fixed line */}
            <span className="block overflow-hidden">
              {mounted && <Typewriter />}
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="text-gray-400 text-base leading-relaxed max-w-[460px] mt-6 mb-8"
            style={fade(0.32)}
          >
            BugVault is your personal developer memory system. Log bugs,
            document key decisions, store screenshots, and let AI explain
            everything — for future you.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 mb-12" style={fade(0.44)}>
            <Link
              href="/dashboard"
              className="group px-5 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-[0_0_28px_rgba(37,99,235,0.4)] hover:shadow-[0_0_42px_rgba(37,99,235,0.55)] inline-flex items-center gap-2 overflow-hidden"
            >
              Get Started Free
              <span className="inline-block translate-x-[-6px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200">→</span>
            </Link>
            <Link
              href="#features"
              className="group px-7 py-3.5 bg-transparent text-white text-sm font-medium rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 inline-flex items-center gap-2"
            >
              See Features
              <span className="inline-block translate-x-[-6px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200">→</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 border-t border-white/[0.06] pb-5" style={fade(0.56)}>
            {[
              { val: "100%", label: "Free to use" },
              { val: "AI", label: "Powered insights" },
              { val: "∞", label: "Projects & bugs" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-8">
                {i > 0 && <div className="w-px h-7 bg-white/10" />}
                <div>
                  <p className="text-white font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>{s.val}</p>
                  <p className="text-gray-600 text-xs mt-1">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 hidden lg:block pt-10" style={fade(0.35, 24, 0)}>
          <div className="relative">
            <div className="absolute -inset-6 bg-blue-600/10 rounded-3xl blur-3xl" />

            {/* Main card */}
            <div
              className="relative bg-[#111827]/90 border border-white/[0.08] rounded-2xl p-6 backdrop-blur-md shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
              style={{ animation: mounted ? "float 5s ease-in-out infinite" : "none" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-400/10 text-red-400 uppercase tracking-wider">🔴 Bug</span>
                <span className="text-xs text-gray-600">Just now</span>
              </div>

              <p className="text-white font-semibold text-sm mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                Auth token not refreshing on expiry
              </p>

              <div className="flex flex-col gap-3 mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-gray-600 font-semibold mb-1.5">Error</p>
                  <div className="bg-[#0d1117] border border-white/[0.05] rounded-lg px-3 py-2.5 font-mono text-[11px] text-red-400 leading-relaxed">
                    TypeError: Cannot read property 'refresh' of undefined
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-gray-600 font-semibold mb-1.5">Root Cause</p>
                  <div className="bg-[#0d1117] border border-white/[0.05] rounded-lg px-3 py-2.5 text-xs text-gray-400">
                    Axios interceptor was not initialized before token check
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-gray-600 font-semibold mb-1.5">Solution</p>
                  <div className="bg-[#0d1117] border border-emerald-500/10 rounded-lg px-3 py-2.5 text-xs text-emerald-400">
                    Moved interceptor setup to app init, before any API calls fire
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gradient-to-r from-violet-500/5 to-blue-500/5 border border-violet-500/10 rounded-xl p-3.5">
                <span className="text-sm flex-shrink-0">🤖</span>
                <p className="text-[11px] text-violet-300 leading-relaxed">
                  This is a classic async initialization race condition. The token interceptor needs to be registered before any requests fire…
                </p>
              </div>
            </div>

            {/* Floating decision card */}
            <div
              className="absolute -bottom-5 -left-10 bg-[#111827] border border-white/[0.08] rounded-xl p-4 shadow-2xl w-52"
              style={{ animation: mounted ? "floatReverse 5s ease-in-out infinite" : "none" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-400/10 text-violet-400">📝 Decision</span>
              </div>
              <p className="text-white text-xs font-medium leading-snug">Chose Zustand over Redux for lighter state management</p>
              <p className="text-gray-600 text-[10px] mt-1.5">2 days ago</p>
            </div>

            {/* Pulse ring */}
            <div
              className="absolute -inset-1 rounded-2xl border border-blue-500/20 pointer-events-none"
              style={{ animation: mounted ? "pulse-ring 3s ease-in-out infinite" : "none" }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(7px); }
        }
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%       { opacity: 0.05; transform: scale(1.015); }
        }
      `}</style>
    </section>
  );
}