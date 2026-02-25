"use client";

import { useEffect, useRef, useState } from "react";

const audience = [
  {
    emoji: "🚀",
    title: "Developers on Multiple Projects",
    desc: "Keep context for every project separate and instantly searchable — no more mentally switching between codebases.",
    color: "#60a5fa",
    glow: "rgba(96,165,250,0.1)",
  },
  {
    emoji: "🎓",
    title: "Students Prepping for Interviews",
    desc: "Turn every bug you fix into an interview-ready story. BugVault generates the question and the answer for you.",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.1)",
  },
  {
    emoji: "⚙️",
    title: "Engineers on Complex Systems",
    desc: "Document architectural decisions as you make them. Future teammates (and future you) will thank you.",
    color: "#34d399",
    glow: "rgba(52,211,153,0.1)",
  },
  {
    emoji: "🧠",
    title: "Anyone Who Values Their Knowledge",
    desc: "If you've ever wasted an hour rediscovering a bug you already fixed — BugVault is for you.",
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.1)",
  },
];

function Card({ item, index }: { item: typeof audience[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative p-6 bg-white/[0.02] hover:bg-white/[0.035] border border-white/[0.07] rounded-2xl transition-all duration-300 overflow-hidden cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s ease ${index * 0.1}s, background 0.3s`,
      }}
    >
      {/* Hover border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${item.color}30` }}
      />

      {/* Corner glow */}
      <div
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: item.glow }}
      />

      {/* Emoji icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
        style={{ backgroundColor: item.glow }}
      >
        {item.emoji}
      </div>

      <h3
        className="text-white font-bold text-base mb-3 leading-snug"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {item.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
        {item.desc}
      </p>

      {/* Bottom line */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(to right, transparent, ${item.color}40, transparent)` }}
      />
    </div>
  );
}

export default function WhoItsForSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="who" className="relative bg-black border-t border-white/[0.06]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">

        {/* Header */}
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.55s ease, transform 0.55s ease",
          }}
          className="mb-14"
        >
          <p className="text-xs uppercase tracking-[0.15em] text-blue-400 font-semibold mb-4">
            Who It's For
          </p>
          <h2
            className="text-white font-extrabold leading-[1.1]"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Built for Developers<br />
            <span className="text-blue-400">Who Value Their Time.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {audience.map((item, i) => (
            <Card key={i} item={item} index={i} />
          ))}
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
      `}</style>
    </section>
  );
}