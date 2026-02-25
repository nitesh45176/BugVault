"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: "🐞",
    label: "Bug Tracking",
    title: "Bug Tracking That Actually Matters",
    items: ["Title, context, root cause & solution", "Screenshot uploads for visual context", "AI-generated explanation per bug", "Interview-style question generation"],
    accent: "rgba(248,113,113,0.12)",
    border: "rgba(248,113,113,0.2)",
    text: "#f87171",
  },
  {
    icon: "📝",
    label: "Decisions",
    title: "Decision Logging",
    items: ["Record architectural decisions", "Store important patterns & tradeoffs", "Add code snippets inline", "Preserve long-term project knowledge"],
    accent: "rgba(167,139,250,0.12)",
    border: "rgba(167,139,250,0.2)",
    text: "#a78bfa",
  },
  {
    icon: "🔍",
    label: "Search",
    title: "Powerful Search",
    items: ["Search by title, error, or context", "Retrieve past solutions instantly", "Filter by project or entry type", "Semantic search coming soon"],
    accent: "rgba(96,165,250,0.12)",
    border: "rgba(96,165,250,0.2)",
    text: "#60a5fa",
  },
  {
    icon: "🤖",
    label: "AI Insights",
    title: "AI-Powered Insights",
    items: ["Clear explanations of complex bugs", "Interview-ready summaries", "Smarter knowledge recall", "Contextual pattern recognition"],
    accent: "rgba(52,211,153,0.12)",
    border: "rgba(52,211,153,0.2)",
    text: "#34d399",
  },
];

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FeatureCard({ f, index }: { f: typeof features[0]; index: number }) {
  const { ref, visible } = useReveal(0.15);

  return (
    <div
      ref={ref}
      className="group relative p-7 bg-white/[0.02] hover:bg-white/[0.035] border border-white/[0.07] rounded-2xl transition-all duration-300 overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.98)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${f.border}` }}
      />

      {/* Corner glow */}
      <div
        className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-2xl"
        style={{ background: f.accent }}
      />

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: f.accent }}
      >
        {f.icon}
      </div>

      {/* Label */}
      <span className="text-[10px] font-bold uppercase tracking-[0.1em] mb-2 block" style={{ color: f.text }}>
        {f.label}
      </span>

      {/* Title */}
      <h3 className="text-white font-bold text-lg mb-5 leading-snug" style={{ fontFamily: "'Syne', sans-serif" }}>
        {f.title}
      </h3>

      {/* Items — stagger in when card is visible */}
      <div className="flex flex-col gap-3">
        {f.items.map((item, j) => (
          <div
            key={j}
            className="flex items-center gap-3"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-10px)",
              transition: `opacity 0.4s ease ${index * 0.12 + j * 0.07 + 0.3}s, transform 0.4s ease ${index * 0.12 + j * 0.07 + 0.3}s`,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: f.text, opacity: 0.6 }} />
            <span className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors">{item}</span>
          </div>
        ))}
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-7 right-7 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(to right, transparent, ${f.text}40, transparent)` }}
      />
    </div>
  );
}

export default function FeaturesSection() {
  const header = useReveal(0.2);

  return (
    <section id="features" className="relative bg-black border-t border-white/[0.06]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute pointer-events-none" style={{ top: "-5%", right: "-5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 65%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">

        {/* Header */}
        <div
          ref={header.ref}
          className="mb-14"
          style={{
            opacity: header.visible ? 1 : 0,
            transform: header.visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="text-xs uppercase tracking-[0.15em] text-blue-400 font-semibold mb-4">Features</p>
          <div className="flex items-end justify-between gap-8">
            <h2
              className="text-white font-extrabold leading-[1.1]"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Everything You Need to<br />
              <span className="text-blue-400">Remember Everything.</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs text-right hidden lg:block">
              Four focused modules that work together to make sure nothing falls through the cracks.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={i} f={f} index={i} />
          ))}
        </div>
      </div>

    </section>
  );
}