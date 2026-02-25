"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function NewProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
  }, [status, router]);

  const isLight = mounted && theme === "light";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, techStack }),
      });
      if (!res.ok) throw new Error("Failed to create project");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex items-center gap-3 text-gray-500 text-sm">
          <span className="w-4 h-4 border-2 border-gray-700 border-t-blue-500 rounded-full animate-spin" />
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-8 mt-8"
      style={{ backgroundColor: isLight ? "#f1f5f9" : "#000" }}
    >
      {/* Dot grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(${isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.035)"} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto">

        {/* Back */}
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-1.5 text-sm mb-8 transition-colors duration-150"
          style={{ color: isLight ? "#64748b" : "#6b7280", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <span>←</span>
          <span className="hover:text-blue-400 transition-colors">Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.12em] text-blue-400 font-semibold mb-3">
            New Project
          </p>
          <h1
            className="font-extrabold text-2xl mb-2 leading-tight"
            style={{ fontFamily: "'Syne', sans-serif", color: isLight ? "#0f172a" : "#fff" }}
          >
            Create a Project
          </h1>
          <p className="text-sm" style={{ color: isLight ? "#64748b" : "#6b7280" }}>
            Add a new project to track bugs, decisions, and knowledge.
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 border"
          style={{
            backgroundColor: isLight ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.02)",
            borderColor: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.07)",
            backdropFilter: "blur(8px)",
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Project Name */}
            <div>
              <label
                className="block text-[10px] uppercase tracking-[0.1em] font-semibold mb-2"
                style={{ color: isLight ? "#94a3b8" : "#6b7280" }}
              >
                Project Name <span className="text-red-400">*</span>
              </label>
              <input
                placeholder="Enter you project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-150"
                style={{
                  backgroundColor: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
                  color: isLight ? "#0f172a" : "#fff",
                }}
                onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                onBlur={(e) => e.target.style.borderColor = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}
              />
            </div>

            {/* Description */}
            <div>
              <label
                className="block text-[10px] uppercase tracking-[0.1em] font-semibold mb-2"
                style={{ color: isLight ? "#94a3b8" : "#6b7280" }}
              >
                Description
              </label>
              <textarea
                placeholder="What does this project do?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-150 resize-none"
                style={{
                  backgroundColor: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
                  color: isLight ? "#0f172a" : "#fff",
                }}
                onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                onBlur={(e) => e.target.style.borderColor = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label
                className="block text-[10px] uppercase tracking-[0.1em] font-semibold mb-2"
                style={{ color: isLight ? "#94a3b8" : "#6b7280" }}
              >
                Tech Stack
              </label>
              <input
                placeholder="e.g. MERN, Next.js, Django + React"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-150"
                style={{
                  backgroundColor: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
                  color: isLight ? "#0f172a" : "#fff",
                }}
                onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                onBlur={(e) => e.target.style.borderColor = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}
              />
            </div>

            {/* Divider */}
            <div
              className="h-px w-full"
              style={{ backgroundColor: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.05)" }}
            />

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-150"
                style={{
                  backgroundColor: "transparent",
                  border: `1px solid ${isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.08)"}`,
                  color: isLight ? "#64748b" : "#6b7280",
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || !name.trim()}
                className="group flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "#2563eb",
                  color: "#fff",
                  boxShadow: "0 0 20px rgba(37,99,235,0.35)",
                }}
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating…
                  </>
                ) : (
                  <>
                    Create Project
                    <span className="translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200">
                      →
                    </span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        input::placeholder, textarea::placeholder { color: ${isLight ? "#94a3b8" : "#4b5563"}; }
      `}</style>
    </div>
  );
}