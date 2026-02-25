import { auth } from "@/lib/auth";
import DashboardSidebarWrapper from "../components/dashboard/SidebarWrapper";
import { redirect } from "next/navigation";

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
      <DashboardSidebarWrapper />

      {/* Remove fixed margin hack */}
      <main className="lg:pl-56 min-h-screen w-full">
        {children}
      </main>
    </div>
  );
}