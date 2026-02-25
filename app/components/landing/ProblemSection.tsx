"use client";

import { useEffect, useRef, useState } from "react";

const problems = [
  { text: "You fix a complex bug at 2am and promise yourself you'll remember it." },
  { text: "You make a critical architectural decision that shapes the whole project." },
  { text: "You write a clever workaround that took you 3 days to figure out." },
  { text: "Six months later — you're searching Slack, commits, old files. Wasting hours." },
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

export default function ProblemSection() {
  const header = useReveal(0.2);
  const right = useReveal(0.15);

  return (
    <section className="relative bg-[#080c14] border-t border-white/[0.06]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-28">

        {/* Header */}
        <div
          ref={header.ref}
          className="mb-16"
          style={{
            opacity: header.visible ? 1 : 0,
            transform: header.visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="text-xs uppercase tracking-[0.15em] text-blue-400 font-semibold mb-4">
            The Problem
          </p>
          <h2
            className="text-white font-extrabold leading-[1.1] mb-5"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Developers Forget More<br />Than They Think.
          </h2>
          <p className="text-gray-500 text-base max-w-md leading-relaxed">
            Every bug fixed, every decision made — without a system, it all disappears.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left — problem cards, each self-animating */}
          <div className="flex flex-col gap-4">
            {problems.map((p, i) => (
              <ProblemCard key={i} text={p.text} index={i} />
            ))}
          </div>

          {/* Right */}
          <div
            ref={right.ref}
            className="flex flex-col gap-5"
            style={{
              opacity: right.visible ? 1 : 0,
              transform: right.visible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.65s ease 0.15s, transform 0.65s ease 0.15s",
            }}
          >
            {/* Quote card */}
            <div className="relative p-8 bg-white/[0.02] border border-white/[0.06] border-l-[3px] border-l-red-500 rounded-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-48 h-48 bg-red-500/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              <p
                className="text-white font-bold text-2xl leading-snug mb-5 relative z-10"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Your experience fades.<br />
                Your decisions<br />
                <span className="text-red-400">disappear.</span>
              </p>
              <p className="text-gray-500 text-sm leading-relaxed relative z-10">
                Every bug you fix, every decision you make is hard-earned knowledge.
                Without a system to capture it, you're doomed to repeat the same
                debugging sessions — forever.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: "~4hrs", label: "wasted per repeated bug" },
                { val: "70%", label: "of devs rediscover old bugs" },
              ].map((s, i) => (
                <StatCard key={i} val={s.val} label={s.label} delay={i * 0.1} trigger={right.visible} />
              ))}
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
}

function ProblemCard({ text, index }: { text: string; index: number }) {
  const { ref, visible } = useReveal(0.2);
  return (
    <div
      ref={ref}
      className="group flex items-start gap-4 p-5 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-red-500/20 rounded-xl transition-all duration-200"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-24px)",
        transition: `opacity 0.55s ease ${index * 0.12}s, transform 0.55s ease ${index * 0.12}s, background 0.2s, border-color 0.2s`,
      }}
    >
      <div className="mt-1.5 flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
      </div>
      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
        {text}
      </p>
    </div>
  );
}

function StatCard({ val, label, delay, trigger }: { val: string; label: string; delay: number; trigger: boolean }) {
  return (
    <div
      className="p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl text-center"
      style={{
        opacity: trigger ? 1 : 0,
        transform: trigger ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.55s ease ${0.3 + delay}s, transform 0.55s ease ${0.3 + delay}s`,
      }}
    >
      <p className="text-3xl font-extrabold text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
        {val}
      </p>
      <p className="text-gray-600 text-xs">{label}</p>
    </div>
  );
}