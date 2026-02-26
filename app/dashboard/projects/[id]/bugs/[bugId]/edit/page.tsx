import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import EditBugForm from "./EditBugForm";

type Props = {
  params: Promise<{ id: string; bugId: string }>;
};

export default async function EditBugPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin");

  const { id, bugId } = await params;

  const bug = await prisma.bug.findFirst({
    where: { id: bugId, project: { id, userId: session.user.id } },
  });

  if (!bug) redirect("/dashboard");

  return <EditBugForm bug={bug} />;
}