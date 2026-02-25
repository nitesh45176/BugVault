import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import DeleteDecisionButton from "./DeleteDecisionButton";

type Props = {
  params: Promise<{ id: string; decisionId: string }>;
};

export default async function DecisionDetailPage({ params }: Props) {
  const session = await auth();

  const { id, decisionId } = await params;

  if (!session?.user?.id) {
    redirect("/");
  }

  const decision = await prisma.bug.findFirst({
    where: {
      id: decisionId,
      project: {
        id,
        userId: session.user.id,
      },
    },
  });

  if (!decision) {
    redirect(`/dashboard/projects/${id}/decisions`);
  }

  const createdAt = new Date(decision.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-24 lg:pt-8 lg:pb-8">

        <Link href={`/dashboard/projects/${id}/decisions`} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-400 transition-colors duration-150 mb-7">
          ← Back to Decisions
        </Link>

        {/* ── TITLE CARD ── */}
        <div className="relative p-5 sm:p-6 bg-white/[0.02] border border-white/[0.07] border-l-[3px] border-l-violet-400 rounded-2xl mb-4 overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-violet-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet-400/10 text-violet-400 border border-violet-400/15">
                  📝 Decision
                </span>
                <span className="text-gray-700 text-xs">{createdAt}</span>
              </div>
              <h1 className="text-white font-extrabold text-xl sm:text-2xl leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                {decision.title}
              </h1>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                href={`/dashboard/projects/${id}/new-decision/${decisionId}/edit`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-400 bg-blue-400/10 hover:bg-blue-400/15 border border-blue-400/20 hover:border-blue-400/35 rounded-xl transition-all duration-150"
              >
                ✏️ Edit
              </Link>
              <DeleteDecisionButton decisionId={decision.id} projectId={decision.projectId} />
            </div>
          </div>
        </div>

        {/* ── SCREENSHOT ── */}
        {decision.screenshotUrl && (
          <div className="p-5 bg-white/[0.02] border border-white/[0.07] rounded-2xl mb-4">
            <p className="text-[10px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-3">Screenshot</p>
            <img src={decision.screenshotUrl} alt="Decision screenshot" className="w-full rounded-xl border border-white/[0.08]" />
          </div>
        )}

        {/* ── WHY / CONTEXT ── */}
        {decision.context && (
          <div className="p-5 bg-white/[0.02] border border-white/[0.07] border-l-[3px] border-l-violet-400 rounded-2xl mb-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-violet-400/5 rounded-full blur-2xl pointer-events-none" />
            <p className="text-[10px] uppercase tracking-[0.1em] text-violet-400 font-semibold mb-3 relative z-10">🔍 Why This Decision</p>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap relative z-10">{decision.context}</p>
          </div>
        )}

        {/* ── SOLUTION / CODE ── */}
        {decision.solution && (
          <div className="p-5 bg-white/[0.02] border border-white/[0.07] border-l-[3px] border-l-emerald-400 rounded-2xl mb-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-400/5 rounded-full blur-2xl pointer-events-none" />
            <p className="text-[10px] uppercase tracking-[0.1em] text-emerald-400 font-semibold mb-3 relative z-10">✅ Implementation / Code</p>
            <pre className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap font-mono relative z-10 bg-black/30 border border-white/[0.05] rounded-xl p-4 overflow-x-auto">
              {decision.solution}
            </pre>
          </div>
        )}

        {/* ── AI EXPLANATION ── */}
        {decision.aiExplanation && (
          <div className="p-5 bg-white/[0.02] border border-white/[0.07] border-l-[3px] border-l-violet-400 rounded-2xl mb-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-violet-400/5 rounded-full blur-2xl pointer-events-none" />
            <p className="text-[10px] uppercase tracking-[0.1em] text-violet-400 font-semibold mb-3 relative z-10">🤖 AI Summary</p>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap relative z-10">{decision.aiExplanation}</p>
          </div>
        )}

        {/* ── INTERVIEW QUESTION ── */}
        {decision.aiInterviewQuestion && (
          <div className="p-5 bg-amber-400/[0.03] border border-amber-400/15 rounded-2xl mb-4">
            <p className="text-[10px] uppercase tracking-[0.1em] text-amber-400 font-semibold mb-3">💡 Interview Question</p>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{decision.aiInterviewQuestion}</p>
          </div>
        )}

      </div>

    </div>
  );
}