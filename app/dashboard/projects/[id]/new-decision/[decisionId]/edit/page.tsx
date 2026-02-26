import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import EditDecisionForm from "./EditDecisionForm";

type Props = {
  params: Promise<{ id: string; decisionId: string }>;
};

export default async function EditDecisionPage({ params }: Props) {
  const session = await auth();
  const { id, decisionId } = await params;

  if (!session?.user) redirect("/api/auth/signin");

  const decision = await prisma.bug.findFirst({
    where: { id: decisionId, project: { id, userId: session.user.id } },
  });

  if (!decision) redirect("/dashboard");

  return <EditDecisionForm decision={decision} />;
}