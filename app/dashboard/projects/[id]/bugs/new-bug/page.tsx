"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function NewBugPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [context, setContext] = useState("");
  const [rootCause, setRootCause] = useState("");
  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let screenshotUrl = null;
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const file = formData.get("screenshot") as File | null;

      if (file && file.size > 0) {
        const uploadForm = new FormData();
        uploadForm.append("file", file);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadForm });
        const uploadData = await uploadRes.json();
        screenshotUrl = uploadData.url;
      }

      await fetch("/api/bugs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, errorMessage, context, rootCause, solution, projectId, screenshotUrl }),
      });

      router.push(`/dashboard/projects/${projectId}`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
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
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-400 transition-colors duration-150 mb-7"
        >
          ← Back to Project
        </button>

        {/* ── HEADER ── */}
        <div className="mb-7">
          <p className="text-[10px] uppercase tracking-[0.14em] text-red-400 font-semibold mb-1.5">
            New Entry
          </p>
          <h1
            className="text-white font-extrabold text-2xl sm:text-3xl leading-tight mb-1"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            🐛 Log a Bug
          </h1>
          <p className="text-gray-500 text-sm">
            Document it clearly so future you always has the context.
          </p>
        </div>

        {/* ── FORM CARD ── */}
        <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 sm:p-7">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Title */}
            <div>
              <label className={labelCls}>Bug Title <span className="text-red-400">*</span></label>
              <input
                className={inputCls}
                placeholder="e.g. Login button throws 500 on submit"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            <div>
              <label className={labelCls}>Error Message</label>
              <textarea
                className={`${inputCls} min-h-[90px] font-mono text-xs`}
                style={{ color: "#f87171" }}
                placeholder="Paste the exact error or stack trace here..."
                value={errorMessage}
                onChange={(e) => setErrorMessage(e.target.value)}
              />
            </div>

            {/* Context + Root Cause — 2 col on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Context</label>
                <textarea
                  className={`${inputCls} min-h-[100px]`}
                  placeholder="What were you doing when this happened?"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Root Cause</label>
                <textarea
                  className={`${inputCls} min-h-[100px]`}
                  placeholder="Why did this bug occur?"
                  value={rootCause}
                  onChange={(e) => setRootCause(e.target.value)}
                />
              </div>
            </div>

            {/* Solution */}
            <div>
              <label className={labelCls}>Solution</label>
              <textarea
                className={`${inputCls} min-h-[90px]`}
                placeholder="How did you fix it? What steps resolved the issue?"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
              />
            </div>

            {/* Screenshot */}
            <div>
              <label className={labelCls}>Screenshot <span className="text-gray-700 normal-case tracking-normal font-normal">(optional)</span></label>
              <label className="flex items-center gap-3 px-4 py-3 bg-white/[0.02] border border-dashed border-white/[0.12] hover:border-blue-500/30 hover:bg-white/[0.04] rounded-xl cursor-pointer transition-all duration-150 group">
                <span className="text-lg">📎</span>
                <span className="text-gray-600 group-hover:text-gray-400 text-sm transition-colors truncate">
                  {fileName ?? "Click to attach a screenshot"}
                </span>
                {fileName && (
                  <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/15 flex-shrink-0">
                    attached
                  </span>
                )}
                <input
                  type="file"
                  name="screenshot"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                />
              </label>
            </div>

            {/* Divider */}
            <div className="border-t border-white/[0.06]" />

            {/* Actions */}
            <div className="flex items-center gap-3 justify-end">
              <button
                type="button"
                onClick={() => router.back()}
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
                    Saving…
                  </>
                ) : (
                  <>
                    Save Bug
                    <span className="translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200">→</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* AI hint */}
        <div className="mt-4 flex items-start gap-3 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
          <span className="text-lg flex-shrink-0">🤖</span>
          <p className="text-gray-600 text-xs leading-relaxed">
            After saving, BugVault will generate an AI explanation and interview-style questions to help you retain and recall this bug easily.
          </p>
        </div>

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}