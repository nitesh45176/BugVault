import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import DeleteBugButton from "./DeleteBugPage";

interface ParamsProps {
  params: { bugId: string; id: string };
}

export default async function BugDetailPage({ params }: ParamsProps) {
  const session = await auth();
  const { id, bugId } = await params;

  const bug = await prisma.bug.findFirst({
    where: { id: bugId, project: { id, userId: session?.user.id } },
  });

  if (!bug) redirect("/dashboard");

  const createdAt = new Date(bug.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

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

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-24 lg:pt-8 lg:pb-8">

        {/* Back */}
        <Link
          href={`/dashboard/projects/${id}/bugs`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-400 transition-colors duration-150 mb-7"
        >
          ← Back to Bugs
        </Link>

        {/* ── TITLE CARD ── */}
        <div className="relative p-5 sm:p-6 bg-white/[0.02] border border-white/[0.07] border-l-[3px] border-l-red-400 rounded-2xl mb-4 overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-red-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-400/10 text-red-400 border border-red-400/15">
                  🐞 Bug
                </span>
                <span className="text-gray-700 text-xs">{createdAt}</span>
              </div>
              <h1
                className="text-white font-extrabold text-xl sm:text-2xl leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {bug.title}
              </h1>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                href={`/dashboard/projects/${id}/bugs/${bugId}/edit`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-400 bg-blue-400/10 hover:bg-blue-400/15 border border-blue-400/20 hover:border-blue-400/35 rounded-xl transition-all duration-150"
              >
                ✏️ Edit
              </Link>
              <DeleteBugButton bugId={bugId} projectId={id} />
            </div>
          </div>
        </div>

        {/* ── SCREENSHOT ── */}
        {bug.screenshotUrl && (
          <div className="p-5 bg-white/[0.02] border border-white/[0.07] rounded-2xl mb-4">
            <p className="text-[10px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-3">Screenshot</p>
            <img
              src={bug.screenshotUrl}
              alt="Bug screenshot"
              className="w-full rounded-xl border border-white/[0.08]"
            />
          </div>
        )}

        {/* ── ERROR MESSAGE ── */}
        {bug.errorMessage && (
          <div className="p-5 bg-white/[0.02] border border-white/[0.07] rounded-2xl mb-4">
            <p className="text-[10px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-3">Error Message</p>
            <pre className="font-mono text-xs text-red-400 bg-black/40 border border-white/[0.05] rounded-xl p-4 overflow-x-auto leading-relaxed whitespace-pre-wrap">
              {bug.errorMessage}
            </pre>
          </div>
        )}

        {/* ── CONTEXT + ROOT CAUSE ── */}
        {(bug.context || bug.rootCause) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {bug.context && (
              <div className="p-5 bg-white/[0.02] border border-white/[0.07] rounded-2xl">
                <p className="text-[10px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-3">🔍 Context</p>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{bug.context}</p>
              </div>
            )}
            {bug.rootCause && (
              <div className="p-5 bg-white/[0.02] border border-white/[0.07] rounded-2xl">
                <p className="text-[10px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-3">⚙️ Root Cause</p>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{bug.rootCause}</p>
              </div>
            )}
          </div>
        )}

        {/* ── SOLUTION ── */}
        {bug.solution && (
          <div className="p-5 bg-white/[0.02] border border-white/[0.07] border-l-[3px] border-l-emerald-400 rounded-2xl mb-4 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/5 rounded-full blur-2xl pointer-events-none" />
            <p className="text-[10px] uppercase tracking-[0.1em] text-emerald-400 font-semibold mb-3 relative z-10">✅ Solution</p>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap relative z-10">{bug.solution}</p>
          </div>
        )}

        {/* ── AI EXPLANATION ── */}
        {bug.aiExplanation && (
          <div className="p-5 bg-white/[0.02] border border-white/[0.07] border-l-[3px] border-l-violet-400 rounded-2xl mb-4 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-400/5 rounded-full blur-2xl pointer-events-none" />
            <p className="text-[10px] uppercase tracking-[0.1em] text-violet-400 font-semibold mb-3 relative z-10">🤖 AI Explanation</p>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap relative z-10">{bug.aiExplanation}</p>
          </div>
        )}

        {/* ── INTERVIEW QUESTION ── */}
        {bug.aiInterviewQuestion && (
          <div className="p-5 bg-amber-400/[0.03] border border-amber-400/15 rounded-2xl mb-4">
            <p className="text-[10px] uppercase tracking-[0.1em] text-amber-400 font-semibold mb-3">💡 Interview Question</p>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{bug.aiInterviewQuestion}</p>
          </div>
        )}

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
      `}</style>
    </div>
  );
}