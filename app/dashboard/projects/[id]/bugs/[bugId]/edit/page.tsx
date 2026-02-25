import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import EditBugForm from "./EditBugForm";

interface PageProps {
  params: { id: string; bugId: string };
}

export default async function EditBugPage({ params }: PageProps) {
  const session = await auth();

  if (!session?.user) redirect("/api/auth/signin");

  const bug = await prisma.bug.findFirst({
    where: {
      id: params.bugId,
      project: { id: params.id, userId: session.user.id },
    },
  });

  if (!bug) redirect("/dashboard");

  return (
    <div style={{ backgroundColor: "#0a0e1a", minHeight: "100vh", padding: "40px 24px" }}>
      <EditBugForm bug={bug} />
    </div>
  );
}