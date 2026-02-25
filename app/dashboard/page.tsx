import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteBugButton from "./projects/[id]/DeleteButton";

export default async function DashboardPage() {
  const session = await auth();

  const projects = await prisma.project.findMany({
    where: { userId: session?.user.id },
    orderBy: { createdAt: "desc" },
  });

  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">

      {/* Dot grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-24 lg:pt-10 pb-32">

        {/* HEADER */}
        {/* HEADER */}
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">

  {/* LEFT SIDE */}
  <div className="space-y-3 max-w-xl">
    <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold">
      Dashboard
    </p>

    <h1
      className="text-white font-extrabold leading-[1.1]"
      style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
      }}
    >
      Hey, {firstName}
    </h1>

    <p className="text-gray-500 text-sm sm:text-base">
      Here's everything in your knowledge vault.
    </p>
  </div>

  {/* RIGHT SIDE BUTTONS */}
  <div className="flex items-center gap-4">

    <Link
      href="/dashboard/search"
      className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 text-sm whitespace-nowrap"
    >
      Search
    </Link>

    <Link
      href="/dashboard/projects/new"
      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(37,99,235,0.35)] whitespace-nowrap"
    >
      + New Project →
    </Link>

  </div>
</div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {[
            { label: "Total Projects", value: projects.length, icon: "🗂️" },
            { label: "Bugs Logged", value: "—", icon: "🐛" },
            { label: "Decisions Made", value: "—", icon: "📝" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-6 bg-white/[0.035] border border-white/[0.08] rounded-2xl"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500/10 text-xl">
                {stat.icon}
              </div>

              <div>
                <p
                  className="text-white font-bold text-2xl"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-gray-500 text-xs tracking-wide">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* PROJECTS HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2
              className="text-white font-bold text-lg"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Your Projects
            </h2>

            {projects.length > 0 && (
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">
                {projects.length}
              </span>
            )}
          </div>
        </div>

        {/* PROJECT GRID */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="flex flex-col justify-between p-6 bg-white/[0.035] hover:bg-white/[0.05] border border-white/[0.08] hover:border-blue-500/30 rounded-2xl transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-2xl font-bold opacity-20"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 truncate max-w-[110px]">
                      {project.techStack}
                    </span>
                  </div>

                  <h3
                    className="text-white font-semibold text-base mb-1 break-words"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {project.name}
                  </h3>

                  <p className="text-gray-500 text-xs">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.08]">
                  <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
                  >
                    View →
                  </Link>

                  <DeleteBugButton id={project.id} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white/[0.03] border border-white/[0.08] border-dashed rounded-2xl text-center px-6">
            <div className="text-4xl mb-4">🗂️</div>

            <h3
              className="text-white font-bold text-lg mb-2"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              No projects yet
            </h3>

            <p className="text-gray-500 text-sm mb-6 max-w-sm">
              Create your first project and start logging bugs and decisions.
            </p>

            <Link
              href="/dashboard/projects/new"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold shadow-[0_0_30px_rgba(37,99,235,0.35)]"
            >
              Create your first project →
            </Link>
          </div>
        )}
      </div>

      
    </div>
  );
}