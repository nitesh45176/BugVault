import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProjectOverview({ params }: any) {
  const session = await auth();
  const { id } = await params;

  if (!session?.user) redirect("/api/auth/signin");

  const project = await prisma.project.findFirst({
    where: { id, userId: session.user.id },
    include: { bugs: true },
  });

  if (!project) redirect("/dashboard");

  const bugCount = project.bugs.filter((b) => b.entryType === "BUG").length;
  const decisionCount = project.bugs.filter((b) => b.entryType === "DECISION").length;
  const total = project.bugs.length;

  return (
    <div className="min-h-screen bg-black mt-15">

      {/* Dot grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Back */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-400 transition-colors duration-150 mb-8"
        >
          ← Back to Dashboard
        </Link>

        {/* ── PROJECT HEADER ── */}
        <div className="relative p-7 bg-white/[0.02] border border-white/[0.07] rounded-2xl mb-5 overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-blue-400 font-semibold mb-2">
                Project
              </p>
              <h1
                className="text-white font-extrabold text-2xl leading-tight mb-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {project.name}
              </h1>
              <span className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/15 font-medium">
                {project.techStack}
              </span>
            </div>

            <div className="text-right flex-shrink-0">
              <p className="text-[10px] uppercase tracking-[0.1em] text-gray-600 font-semibold mb-1">
                Total Entries
              </p>
              <p
                className="text-white font-extrabold text-4xl leading-none"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {total}
              </p>
            </div>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 gap-4 mb-5">

          {/* Bugs */}
          <Link href={`/dashboard/projects/${id}/bugs`} className="group block no-underline">
            <div className="relative h-full p-6 bg-white/[0.02] hover:bg-white/[0.035] border border-white/[0.07] hover:border-red-400/25 rounded-2xl transition-all duration-200 overflow-hidden border-l-[3px] border-l-red-400">
              {/* Corner glow on hover */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-400/0 group-hover:bg-red-400/8 rounded-full blur-2xl transition-all duration-300 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl">🐞</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-400/10 text-red-400 border border-red-400/15">
                    Bugs
                  </span>
                </div>

                <p
                  className="text-white font-extrabold text-4xl leading-none mb-1"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {bugCount}
                </p>
                <p className="text-gray-600 text-xs mb-5">logged bugs</p>

                <div className="flex items-center gap-1.5 text-blue-400 text-xs font-medium group-hover:gap-2.5 transition-all duration-150">
                  View all bugs
                  <span>→</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Decisions */}
          <Link href={`/dashboard/projects/${id}/decisions`} className="group block no-underline">
            <div className="relative h-full p-6 bg-white/[0.02] hover:bg-white/[0.035] border border-white/[0.07] hover:border-violet-400/25 rounded-2xl transition-all duration-200 overflow-hidden border-l-[3px] border-l-violet-400">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-violet-400/0 group-hover:bg-violet-400/8 rounded-full blur-2xl transition-all duration-300 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl">📝</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet-400/10 text-violet-400 border border-violet-400/15">
                    Decisions
                  </span>
                </div>

                <p
                  className="text-white font-extrabold text-4xl leading-none mb-1"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {decisionCount}
                </p>
                <p className="text-gray-600 text-xs mb-5">logged decisions</p>

                <div className="flex items-center gap-1.5 text-blue-400 text-xs font-medium group-hover:gap-2.5 transition-all duration-150">
                  View all decisions
                  <span>→</span>
                </div>
              </div>
            </div>
          </Link>

        </div>

        {/* ── QUICK ACTIONS ── */}
        <div className="p-5 bg-white/[0.02] border border-white/[0.07] rounded-2xl">
          <p className="text-[10px] uppercase tracking-[0.12em] text-gray-600 font-semibold mb-4">
            Quick Actions
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href={`/dashboard/projects/${id}/bugs/new-bug`}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-red-400/8 hover:bg-red-400/15 text-red-400 text-xs font-semibold rounded-xl border border-red-400/15 hover:border-red-400/30 transition-all duration-150 overflow-hidden"
            >
              <span>🐞</span>
              Log Bug
              <span className="translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-150">→</span>
            </Link>
            <Link
              href={`/dashboard/projects/${id}/new-decision`}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-violet-400/8 hover:bg-violet-400/15 text-violet-400 text-xs font-semibold rounded-xl border border-violet-400/15 hover:border-violet-400/30 transition-all duration-150 overflow-hidden"
            >
              <span>📝</span>
              Log Decision
              <span className="translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-150">→</span>
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        .no-underline { text-decoration: none; }
      `}</style>
    </div>
  );
}