import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardSidebar />
      {/* lg:ml-56 offsets content past the sidebar; pt-14 offsets past mobile header */}
      <main className="lg:ml-56 pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}