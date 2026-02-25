"use client";

import { useEffect, useRef, useState } from "react";

const solutions = [
  { icon: "🐛", text: "Log bugs with root cause & solution" },
  { icon: "📝", text: "Document architectural decisions" },
  { icon: "📸", text: "Upload screenshots for visual context" },
  { icon: "🤖", text: "AI explanations for future recall" },
  { icon: "🔍", text: "Search your past knowledge instantly" },
  { icon: "🧠", text: "Your second brain — built for devs" },
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

function SolutionPill({ icon, text, index, trigger }: { icon: string; text: string; index: number; trigger: boolean }) {
  return (
    <div
      className="group flex items-center gap-4 px-5 py-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-blue-500/25 rounded-xl transition-all duration-200 cursor-default"
      style={{
        opacity: trigger ? 1 : 0,
        transform: trigger ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
      }}
    >
      <span className="text-lg flex-shrink-0">{icon}</span>
      <span className="text-gray-400 group-hover:text-gray-200 text-sm transition-colors">{text}</span>
      <span className="ml-auto text-blue-500/0 group-hover:text-blue-400 text-sm transition-all duration-200 translate-x-2 group-hover:translate-x-0">›</span>
    </div>
  );
}

export default function SolutionSection() {
  const header = useReveal(0.2);
  const pills = useReveal(0.1);
  const card = useReveal(0.1);

  return (
    <section className="relative bg-black border-t border-white/[0.06]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute pointer-events-none" style={{ top: "30%", left: "-5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 65%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">

        {/* Header */}
        <div
          ref={header.ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
        >
          {/* Left headline */}
          <div
            style={{
              opacity: header.visible ? 1 : 0,
              transform: header.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <p className="text-xs uppercase tracking-[0.15em] text-blue-400 font-semibold mb-4">
              The Solution
            </p>
            <h2
              className="text-white font-extrabold leading-[1.1]"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Turn Every Bug &<br />
              Decision Into<br />
              <span className="text-blue-400">Permanent Knowledge.</span>
            </h2>
          </div>

          {/* Right desc */}
          <div
            style={{
              opacity: header.visible ? 1 : 0,
              transform: header.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}
          >
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              BugVault gives you a structured system to capture, explain, and retrieve
              your technical decisions — instantly. It's your second brain, built for developers.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Linear vibe", "Notion structure", "Vercel speed"].map((t, i) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-gray-500 bg-white/[0.02]"
                  style={{
                    opacity: header.visible ? 1 : 0,
                    transform: header.visible ? "translateY(0)" : "translateY(8px)",
                    transition: `opacity 0.4s ease ${0.3 + i * 0.08}s, transform 0.4s ease ${0.3 + i * 0.08}s`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Pills */}
          <div ref={pills.ref} className="lg:col-span-2 grid grid-cols-1 gap-3">
            {solutions.map((s, i) => (
              <SolutionPill key={i} icon={s.icon} text={s.text} index={i} trigger={pills.visible} />
            ))}
          </div>

          {/* Demo card */}
          <div
            ref={card.ref}
            className="lg:col-span-3"
            style={{
              opacity: card.visible ? 1 : 0,
              transform: card.visible ? "translateX(0) scale(1)" : "translateX(24px) scale(0.98)",
              transition: "opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s",
            }}
          >
            <div className="relative h-full">
              <div className="absolute -inset-4 bg-blue-600/5 rounded-2xl blur-2xl" />
              <div className="relative bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 h-full flex flex-col gap-4">

                {/* Mac dots */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                    BugVault in action
                  </span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                </div>

                {/* Entries — stagger in after card appears */}
                <div className="flex flex-col gap-3">
                  {[
                    {
                      delay: 0.3,
                      content: (
                        <div className="flex items-start gap-3 p-4 bg-black/40 border border-white/[0.05] rounded-xl">
                          <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">🐞</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Bug</span>
                              <span className="text-[10px] text-gray-700">2 min ago</span>
                            </div>
                            <p className="text-white text-xs font-medium mb-1">CORS error on production API call</p>
                            <p className="text-gray-600 text-[11px] leading-relaxed">Missing Access-Control-Allow-Origin header in Express middleware</p>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 flex-shrink-0">Solved</span>
                        </div>
                      ),
                    },
                    {
                      delay: 0.45,
                      content: (
                        <div className="flex items-start gap-3 p-4 bg-black/40 border border-white/[0.05] rounded-xl">
                          <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">📝</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">Decision</span>
                              <span className="text-[10px] text-gray-700">Yesterday</span>
                            </div>
                            <p className="text-white text-xs font-medium mb-1">Switched from REST to tRPC</p>
                            <p className="text-gray-600 text-[11px] leading-relaxed">Type-safety end-to-end with zero manual validation code</p>
                          </div>
                        </div>
                      ),
                    },
                    {
                      delay: 0.6,
                      content: (
                        <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-violet-500/5 to-blue-500/5 border border-violet-500/10 rounded-xl">
                          <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">🤖</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">AI Insight</span>
                            </div>
                            <p className="text-violet-300 text-[11px] leading-relaxed">
                              This CORS pattern appears in 3 of your past bugs. Consider creating a shared middleware utility to prevent recurrence.
                            </p>
                          </div>
                        </div>
                      ),
                    },
                  ].map((entry, i) => (
                    <div
                      key={i}
                      style={{
                        opacity: card.visible ? 1 : 0,
                        transform: card.visible ? "translateY(0)" : "translateY(12px)",
                        transition: `opacity 0.5s ease ${entry.delay}s, transform 0.5s ease ${entry.delay}s`,
                      }}
                    >
                      {entry.content}
                    </div>
                  ))}
                </div>

                {/* Search bar */}
                <div
                  className="mt-auto flex items-center gap-3 px-4 py-3 bg-black/40 border border-white/[0.06] rounded-xl"
                  style={{
                    opacity: card.visible ? 1 : 0,
                    transition: "opacity 0.5s ease 0.75s",
                  }}
                >
                  <span className="text-gray-600 text-sm">🔍</span>
                  <span className="text-gray-600 text-xs">Search past bugs and decisions…</span>
                  <span className="ml-auto text-[10px] px-2 py-0.5 border border-white/10 rounded text-gray-700">⌘K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
      `}</style>
    </section>
  );
}