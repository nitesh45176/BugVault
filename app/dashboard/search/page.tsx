import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

interface Props {
  searchParams: { q?: string };
}

export default async function GlobalSearchPage({ searchParams }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin");

  const query = searchParams.q || "";

  let bugs: any[] = [];
  let decisions: any[] = [];

  const projects = await prisma.project.findMany({
  where: {
    userId: session.user.id,
    name: {
      contains: query,
      mode: "insensitive",
    },
  },
});

  if (query) {
    bugs = await prisma.bug.findMany({
      where: {
        project: { userId: session.user.id },
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { errorMessage: { contains: query, mode: "insensitive" } },
          { context: { contains: query, mode: "insensitive" } },
        ],
      },
      include: { project: true },
    });

    decisions = await prisma.bug.findMany({
      where: {
        project: { userId: session.user.id },
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { context: { contains: query, mode: "insensitive" } },
        ],
      },
      include: { project: true },
    });
  }

  return (
  <div className="min-h-screen bg-black relative overflow-x-hidden">

    {/* Dot Grid Background */}
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
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold">
          Search
        </p>

        <h1
          className="text-white font-extrabold leading-[1.1] mt-2"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
          }}
        >
          Global Search
        </h1>

        <p className="text-gray-500 text-sm sm:text-base mt-3 max-w-xl">
          Search across all your projects, bugs and decisions.
        </p>
      </div>

      {/* SEARCH FORM */}
      <form className="flex flex-col sm:flex-row gap-4 mb-12">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Search across all projects..."
          className="w-full px-5 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.06] transition-all"
        />

        <button
          type="submit"
          className="sm:w-auto w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-[0_0_25px_rgba(37,99,235,0.35)]"
        >
          Search →
        </button>
      </form>

      {/* RESULTS */}
      {query && (
        <div className="space-y-14">

          {/* PROJECTS */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h2
                className="text-white font-bold text-lg"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Projects
              </h2>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {projects.length}
              </span>
            </div>

            {projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/dashboard/projects/${project.id}`}
                    className="p-6 bg-white/[0.035] hover:bg-white/[0.05] border border-white/[0.08] hover:border-blue-500/30 rounded-2xl transition-all duration-200"
                  >
                    <h3 className="text-white font-semibold break-words">
                      {project.name}
                    </h3>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No projects found.</p>
            )}
          </div>

          {/* BUGS */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h2
                className="text-white font-bold text-lg"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Bugs
              </h2>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {bugs.length}
              </span>
            </div>

            {bugs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {bugs.map((bug) => (
                  <Link
                    key={bug.id}
                    href={`/dashboard/projects/${bug.projectId}/bugs/${bug.id}`}
                    className="p-6 bg-white/[0.035] hover:bg-white/[0.05] border border-white/[0.08] hover:border-blue-500/30 rounded-2xl transition-all duration-200"
                  >
                    <h3 className="text-white font-semibold break-words">
                      {bug.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-2">
                      Project: {bug.project.name}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No bugs found.</p>
            )}
          </div>

          {/* DECISIONS */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h2
                className="text-white font-bold text-lg"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Decisions
              </h2>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {decisions.length}
              </span>
            </div>

            {decisions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {decisions.map((decision) => (
                  <Link
                    key={decision.id}
                    href={`/dashboard/projects/${decision.projectId}/decisions/${decision.id}`}
                    className="p-6 bg-white/[0.035] hover:bg-white/[0.05] border border-white/[0.08] hover:border-blue-500/30 rounded-2xl transition-all duration-200"
                  >
                    <h3 className="text-white font-semibold break-words">
                      {decision.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-2">
                      Project: {decision.project.name}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No decisions found.</p>
            )}
          </div>

        </div>
      )}

    </div>

    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
    `}</style>
  </div>
);
}