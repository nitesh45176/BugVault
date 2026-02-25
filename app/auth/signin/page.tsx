"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const isLight = theme === "light";

  const fade = (delay: number, y = 14) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : `translateY(${y}px)`,
    transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
  });

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("github", { callbackUrl: "/dashboard" });
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: isLight ? "#f1f5f9" : "#000" }}
    >

      {/* ── LEFT PANEL ── */}
      <div
        className="flex-1 flex flex-col px-10 py-10 relative overflow-hidden"
        style={{ backgroundColor: isLight ? "#f1f5f9" : "#000" }}
      >
        {/* Dot grid */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `radial-gradient(${isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.04)"} 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Logo */}
        <div className="relative z-10" style={fade(0)}>
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_16px_rgba(37,99,235,0.4)]">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <span className="font-bold text-base" style={{ fontFamily: "'Syne', sans-serif", color: isLight ? "#0f172a" : "#fff" }}>
              Bug<span className="text-blue-500">Vault</span>
            </span>
          </Link>
        </div>

        {/* Form area */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-sm w-full mx-auto">

          {/* Back */}
          <div style={fade(0.08)}>
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors duration-150"
              style={{ color: isLight ? "#64748b" : "#6b7280" }}>
              ← Back
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-8" style={fade(0.15)}>
            <h1 className="font-extrabold text-3xl leading-tight mb-2" style={{ fontFamily: "'Syne', sans-serif", color: isLight ? "#0f172a" : "#fff" }}>
              Welcome back to{" "}
              <span className="text-blue-500">BugVault</span>
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: isLight ? "#64748b" : "#9ca3af" }}>
              Sign in to access your developer memory vault.
            </p>
          </div>

          {/* GitHub button */}
          <div style={fade(0.24)}>
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="group w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                backgroundColor: isLight ? "#1e293b" : "#161b22",
                color: "#fff",
                border: `1px solid ${isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.1)"}`,
              }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full flex-shrink-0" style={{ animation: "spin 0.7s linear infinite" }} />
                  Connecting to GitHub…
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="flex-shrink-0">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Continue with GitHub
                  <span className="ml-auto translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200" style={{ color: "#9ca3af" }}>→</span>
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6" style={fade(0.3)}>
            <div className="flex-1 h-px" style={{ backgroundColor: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)" }} />
            <span className="text-xs tracking-wide" style={{ color: isLight ? "#94a3b8" : "#374151" }}></span>
            <div className="flex-1 h-px" style={{ backgroundColor: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)" }} />
          </div>

          {/* Feature hints */}
          <div className="flex flex-col gap-3">
            {[
              { icon: "🐛", text: "Log bugs with root cause & AI explanation" },
              { icon: "📝", text: "Document architectural decisions" },
              { icon: "🔍", text: "Search your past knowledge instantly" },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{
                  backgroundColor: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.05)"}`,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(-10px)",
                  transition: `opacity 0.45s ease ${0.38 + i * 0.08}s, transform 0.45s ease ${0.38 + i * 0.08}s`,
                }}
              >
                <span className="text-base">{f.icon}</span>
                <span className="text-xs" style={{ color: isLight ? "#64748b" : "#6b7280" }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        className="hidden lg:flex w-[45%] flex-col justify-center px-16 relative overflow-hidden"
        style={{
          background: isLight
            ? "linear-gradient(135deg, #1e3a5f 0%, #1a2d4a 50%, #0f1f35 100%)"
            : "linear-gradient(135deg, #0d1117 0%, #0a0f1e 50%, #060d1f 100%)",
        }}
      >
        {/* Glows */}
        <div className="absolute pointer-events-none" style={{ top: "20%", right: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 65%)" }} />
        <div className="absolute pointer-events-none" style={{ bottom: "10%", left: "0%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 65%)" }} />
        <div className="absolute top-0 left-0 bottom-0 w-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wide mb-8" style={fade(0.2)}>
            🧠 Developer Memory System
          </div>

          <h2
            className="text-white font-extrabold leading-[1.1] mb-6"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", ...fade(0.28) }}
          >
            Never Lose Your<br />
            Hard-Earned<br />
            <span className="text-blue-400">Knowledge Again.</span>
          </h2>

          <p className="text-sm leading-relaxed mb-10 max-w-xs" style={{ color: "rgba(255,255,255,0.55)", ...fade(0.36) }}>
            Log bugs, document decisions, and let AI explain everything — so future you always has the context you need.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6" style={fade(0.44)}>
            {[{ val: "100%", label: "Free" }, { val: "AI", label: "Powered" }, { val: "∞", label: "Projects" }].map((s, i) => (
              <div key={i} className="flex items-center gap-6">
                {i > 0 && <div className="w-px h-6" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />}
                <div>
                  <p className="text-white font-bold text-lg leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>{s.val}</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Floating card */}
          <div
            className="mt-12 p-5 rounded-2xl max-w-xs"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              ...fade(0.52),
              animation: mounted ? "float 5s ease-in-out infinite" : "none",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-400/10 text-red-400">🔴 Bug Solved</span>
              <span className="text-[10px] ml-auto" style={{ color: "rgba(255,255,255,0.3)" }}>Just now</span>
            </div>
            <p className="text-white text-xs font-semibold mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>Auth token not refreshing on expiry</p>
            <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>Moved interceptor setup to app init — never forget this fix again.</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-emerald-400 text-[10px]">Saved to BugVault</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}