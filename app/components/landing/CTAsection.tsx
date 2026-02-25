"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative bg-black border-t border-white/[0.06] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* Big central glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px", height: "400px",
          background: "radial-gradient(ellipse, rgba(37,99,235,0.18) 0%, transparent 65%)",
        }}
      />

      {/* Diagonal lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.6) 40px, rgba(255,255,255,0.6) 41px)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-28 text-center">
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wide">
            💡 Because future you deserves context
          </div>

          {/* Headline */}
          <h2
            className="text-white font-extrabold leading-[1.08] mb-6"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
          >
            Stop Losing Your<br />
            <span className="text-blue-400">Hard-Earned Knowledge.</span>
          </h2>

          <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-lg mx-auto">
            Start building your developer memory today. Log your first bug in under a minute.
            Free, forever.
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-200 shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 text-sm"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Create Your Knowledge Vault →
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 bg-transparent hover:bg-white/5 text-white text-sm font-medium rounded-xl border border-white/10 hover:border-blue-400/40 transition-all duration-200"
            >
              See Features
            </Link>
          </div>

          {/* Tagline trio */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {[
              "Where Bugs Become Knowledge.",
              "Turn Debugging Into Wisdom.",
              "Your Developer Memory System.",
            ].map((t, i) => (
              <span key={i} className="text-xs text-gray-700 font-medium">
                {i > 0 && <span className="mr-6 text-white/10">·</span>}
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* Footer */}
<div className="relative z-10 border-t border-white/[0.06] py-7 px-6">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

    {/* Logo + Copyright */}
    <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-xs shadow-[0_0_12px_rgba(37,99,235,0.4)]">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <span
          className="text-white font-bold text-sm"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Bug<span className="text-blue-400">Vault</span>
        </span>
      </div>

      <p className="text-gray-700 text-xs">
        © {new Date().getFullYear()} BugVault. All rights reserved.
      </p>
    </div>

    {/* Navigation */}
    <div className="flex items-center gap-6 text-xs">
      <Link href="/dashboard" className="text-gray-600 hover:text-gray-400 transition-colors">
        Dashboard
      </Link>
      <Link href="#features" className="text-gray-600 hover:text-gray-400 transition-colors">
        Features
      </Link>
      <Link href="#how" className="text-gray-600 hover:text-gray-400 transition-colors">
        How it Works
      </Link>
    </div>

    {/* Social Links */}
    <div className="flex items-center gap-5 text-gray-600">
      <a
        href="https://github.com/nitesh45176"
        target="_blank"
        className="hover:text-white transition-colors text-sm"
      >
        GitHub
      </a>
      <a
        href="https://linkedin.com/in/nitesh45176"
        target="_blank"
        className="hover:text-white transition-colors text-sm"
      >
        LinkedIn
      </a>
    </div>

  </div>
</div>

     
    </section>
  );
}