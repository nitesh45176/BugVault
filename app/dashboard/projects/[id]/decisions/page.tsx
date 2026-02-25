import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DecisionsPage({ params }: any) {
  const session = await auth();
  const { id } = await params;

  if (!session?.user) redirect("/api/auth/signin");

  const decisions = await prisma.bug.findMany({
    where: { projectId: id, project: { userId: session.user.id }, entryType: "DECISION" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-24 lg:pt-8 lg:pb-8">

        <Link href={`/dashboard/projects/${id}`} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-400 transition-colors duration-150 mb-7">
          ← Back to Project
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-7">
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-violet-400 font-semibold mb-1.5">Decision Log</p>
            <h1 className="text-white font-extrabold leading-tight mb-1" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>
              📝 Decisions
            </h1>
            <p className="text-gray-500 text-sm">{decisions.length} decision{decisions.length !== 1 ? "s" : ""} logged in this project</p>
          </div>
          <Link
            href={`/dashboard/projects/${id}/new-decision`}
            className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 text-sm font-semibold rounded-xl border border-violet-500/20 hover:border-violet-500/40 transition-all duration-200 self-start flex-shrink-0 overflow-hidden"
          >
            + Log Decision
            <span className="translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200">→</span>
          </Link>
        </div>

        {/* List */}
        {decisions.length > 0 ? (
          <div className="flex flex-col gap-3">
            {decisions.map((decision, index) => (
              <div
                key={decision.id}
                className="group relative flex flex-col gap-3 p-4 sm:p-5 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.07] hover:border-violet-400/20 rounded-2xl transition-all duration-200 border-l-[3px] border-l-violet-400 overflow-hidden"
              >
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-violet-400/0 group-hover:bg-violet-400/6 rounded-full blur-2xl transition-all duration-300 pointer-events-none" />
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-xs font-bold mt-0.5" style={{ color: "transparent", WebkitTextStroke: "1px rgba(167,139,250,0.4)", fontFamily: "'Syne', sans-serif", fontSize: "0.95rem", lineHeight: 1.4 }}>
                    #{String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-white font-semibold text-sm sm:text-base leading-snug" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {decision.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400/50" />
                    <span className="text-gray-600 text-xs">
                      {new Date(decision.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <Link
                    href={`/dashboard/projects/${id}/new-decision/${decision.id}`}
                    className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 text-xs font-medium transition-all duration-150 group-hover:gap-2"
                  >
                    View Details <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 bg-white/[0.02] border border-white/[0.06] border-dashed rounded-2xl px-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-violet-400/10 flex items-center justify-center text-xl sm:text-2xl mb-4">📝</div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-2 text-center" style={{ fontFamily: "'Syne', sans-serif" }}>No decisions yet</h3>
            <p className="text-gray-600 text-sm mb-5 text-center max-w-xs leading-relaxed">Document architectural choices, tradeoffs, and important notes.</p>
            <Link
              href={`/dashboard/projects/${id}/new-decision`}
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 text-sm font-semibold rounded-xl border border-violet-500/20 hover:border-violet-500/40 transition-all duration-200 overflow-hidden"
            >
              Log your first decision
              <span className="translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200">→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}