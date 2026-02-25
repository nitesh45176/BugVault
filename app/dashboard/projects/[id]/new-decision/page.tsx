import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DecisionForm from "./DecisionForm";

export default async function NewDecisionPage({ params }: any) {
  const session = await auth();
  const { id } = params;

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="max-w-3xl mx-auto">
      <DecisionForm />
    </div>
  );
}