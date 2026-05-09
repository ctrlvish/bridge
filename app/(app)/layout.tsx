import TopNav from "@/components/top-nav";
import BottomNav from "@/components/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
