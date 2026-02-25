import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import EditdecisionForm from "./EditDecisionForm";
interface PageProps {
  params: { id: string; decisionId: string };
}

export default async function EditBugPage({ params }: PageProps) {
  const session = await auth();
  const { id, decisionId } = await params;

  if (!session?.user) redirect("/api/auth/signin");

  const decision = await prisma.bug.findFirst({
    where: {
      id: decisionId,
      project: { id: id, userId: session.user.id },
    },
  });



  return (
    <div style={{ backgroundColor: "#0a0e1a", minHeight: "100vh", padding: "40px 24px" }}>
      <EditdecisionForm decision={decision} />
    </div>
  );
}