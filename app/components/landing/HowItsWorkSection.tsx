"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    icon: "🗂️",
    title: "Create a Project",
    desc: "Add your project with its name and tech stack. BugVault organizes everything by project — so your MERN app and your Next.js SaaS stay cleanly separate.",
    color: "#60a5fa",
    glow: "rgba(96,165,250,0.15)",
    mock: (
      <div className="flex flex-col gap-2">
        <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-1">New Project</div>
        <div className="bg-black/50 border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white">Project</div>
        <div className="bg-black/50 border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-gray-500">MERN Stack</div>
        <div className="mt-1 px-4 py-2 bg-blue-600 rounded-lg text-xs text-white font-semibold text-center w-fit">
          Create Project →
        </div>
      </div>
    ),
  },
  {
    num: "02",
    icon: "🐛",
    title: "Log Bugs & Decisions",
    desc: "Write down what happened, the root cause, your fix, and attach a screenshot. Log architectural decisions, tradeoffs, and important patterns as they happen.",
    color: "#f87171",
    glow: "rgba(248,113,113,0.15)",
    mock: (
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <span className="text-[10px] px-2 py-1 rounded-full bg-red-400/10 text-red-400 font-semibold">🐞 Bug</span>
          <span className="text-[10px] px-2 py-1 rounded-full bg-violet-400/10 text-violet-400 font-semibold">📝 Decision</span>
        </div>
        <div className="bg-black/50 border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white">JWT not refreshing on expiry</div>
        <div className="bg-black/50 border border-red-500/10 rounded-lg px-3 py-2 font-mono text-[10px] text-red-400">
          TypeError: token.refresh is undefined
        </div>
        <div className="bg-black/50 border border-emerald-500/10 rounded-lg px-3 py-2 text-[11px] text-emerald-400">
          ✓ Moved interceptor to app init
        </div>
      </div>
    ),
  },
  {
    num: "03",
    icon: "🔍",
    title: "Search & Recall Instantly",
    desc: "Next time you hit a similar bug — search it. Get the full context, root cause, and solution you documented. Past you saves future you hours of debugging.",
    color: "#34d399",
    glow: "rgba(52,211,153,0.15)",
    mock: (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 bg-black/50 border border-white/[0.08] rounded-lg px-3 py-2">
          <span className="text-gray-600 text-xs">🔍</span>
          <span className="text-xs text-blue-400 font-mono">CORS error</span>
          <span className="ml-auto text-[10px] text-gray-700">↵</span>
        </div>
        <div className="text-[10px] text-gray-600 px-1">2 results found</div>
        {["CORS on Express API — Solved 3 weeks ago", "CORS preflight fail — Solved 2 months ago"].map((r, i) => (
          <div key={i} className="flex items-center gap-2 bg-black/50 border border-white/[0.05] rounded-lg px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            <span className="text-[11px] text-gray-400">{r}</span>
          </div>
        ))}
      </div>
    ),
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isEven = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      {/* Text side */}
      <div className={isEven ? "lg:order-2" : ""}>
        <div className="flex items-center gap-4 mb-5">
          <span
            className="font-extrabold text-5xl leading-none select-none"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: "transparent",
              WebkitTextStroke: `1px ${step.color}40`,
            }}
          >
            {step.num}
          </span>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ backgroundColor: step.glow }}
          >
            {step.icon}
          </div>
        </div>

        <h3
          className="text-white font-bold text-2xl mb-4 leading-snug"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {step.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>

        {/* Connector line for non-last */}
        {index < steps.length - 1 && (
          <div className="hidden lg:flex items-center gap-3 mt-8">
            <div
              className="h-px flex-1 max-w-[120px]"
              style={{ background: `linear-gradient(to right, ${step.color}40, transparent)` }}
            />
            <span className="text-gray-700 text-xs">then</span>
          </div>
        )}
      </div>

      {/* Mock card side */}
      <div className={isEven ? "lg:order-1" : ""}>
        <div className="relative">
          {/* Glow */}
          <div
            className="absolute -inset-4 rounded-2xl blur-2xl opacity-40"
            style={{ background: step.glow }}
          />
          {/* Card */}
          <div className="relative bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5"
            style={{ borderColor: `${step.color}20` }}>
            {/* Mac dots */}
            <div className="flex gap-1.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            {step.mock}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section id="how" className="relative bg-black border-t border-white/[0.06]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.15em] text-blue-400 font-semibold mb-4">
            How It Works
          </p>
          <h2
            className="text-white font-extrabold leading-[1.1] mb-4"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Up and Running<br />
            <span className="text-blue-400">in Minutes.</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Three simple steps. No complex setup. Just start logging and let BugVault do the rest.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-20">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>

      </div>

    
    </section>
  );
}