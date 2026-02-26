import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <DashboardSidebar />

      {/* Desktop offset for sidebar */}
      <main className="lg:pl-64 pt-14 lg:pt-0 min-h-screen w-full">
        {children}
      </main>
    </div>
  );
}