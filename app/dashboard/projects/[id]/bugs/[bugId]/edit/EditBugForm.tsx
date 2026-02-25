"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditBugForm({ bug }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    await fetch(`/api/bugs/${bug.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        errorMessage: formData.get("errorMessage"),
        context: formData.get("context"),
        rootCause: formData.get("rootCause"),
        solution: formData.get("solution"),
      }),
    });
    router.push(`/dashboard/projects/${bug.projectId}/bugs/${bug.id}`);
  };

  const inputCls = "w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-blue-500/50 focus:bg-white/[0.05] rounded-xl text-white text-sm outline-none transition-all duration-150 placeholder:text-gray-700 resize-vertical";
  const labelCls = "block text-[10px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-2";

  return (
    <div className="min-h-screen bg-black">

      {/* Dot grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-20 pb-24 lg:pt-8 lg:pb-8">

        {/* Back */}
        <button
          type="button"
          onClick={() => router.push(`/dashboard/projects/${bug.projectId}/bugs/${bug.id}`)}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-400 transition-colors duration-150 mb-7"
        >
          ← Back to Bug
        </button>

        {/* Header */}
        <div className="mb-7">
          <p className="text-[10px] uppercase tracking-[0.14em] text-blue-400 font-semibold mb-1.5">Editing</p>
          <h1
            className="text-white font-extrabold text-2xl sm:text-3xl leading-tight mb-1"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            ✏️ Edit Bug
          </h1>
          <p className="text-gray-500 text-sm">
            Updating: <span className="text-blue-400">{bug.title}</span>
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 sm:p-7">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Title */}
            <div>
              <label className={labelCls}>Bug Title <span className="text-red-400">*</span></label>
              <input
                name="title"
                defaultValue={bug.title}
                className={inputCls}
                required
              />
            </div>

            {/* Error Message */}
            <div>
              <label className={labelCls}>Error Message</label>
              <textarea
                name="errorMessage"
                defaultValue={bug.errorMessage}
                className={`${inputCls} min-h-[90px] font-mono text-xs`}
                style={{ color: "#f87171" }}
              />
            </div>

            {/* Context + Root Cause */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Context</label>
                <textarea
                  name="context"
                  defaultValue={bug.context}
                  className={`${inputCls} min-h-[100px]`}
                />
              </div>
              <div>
                <label className={labelCls}>Root Cause</label>
                <textarea
                  name="rootCause"
                  defaultValue={bug.rootCause}
                  className={`${inputCls} min-h-[100px]`}
                />
              </div>
            </div>

            {/* Solution */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.1em] text-emerald-400 font-semibold mb-2">
                ✅ Solution
              </label>
              <textarea
                name="solution"
                defaultValue={bug.solution}
                className={`${inputCls} min-h-[90px] border-emerald-400/20 focus:border-emerald-400/40`}
              />
            </div>

            <div className="border-t border-white/[0.06]" />

            {/* Actions */}
            <div className="flex items-center gap-3 justify-end">
              <button
                type="button"
                onClick={() => router.push(`/dashboard/projects/${bug.projectId}/bugs/${bug.id}`)}
                className="px-5 py-2.5 text-sm text-gray-400 hover:text-white font-medium rounded-xl border border-white/[0.08] hover:border-white/[0.15] bg-transparent transition-all duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="group inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.35)] hover:shadow-[0_0_28px_rgba(37,99,235,0.5)] overflow-hidden"
              >
                {loading ? (
                  <>
                    <span
                      className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full flex-shrink-0"
                      style={{ animation: "spin 0.7s linear infinite" }}
                    />
                    Updating…
                  </>
                ) : (
                  <>
                    Update Bug
                    <span className="translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200">→</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}