import { BottomNav } from "@/components/layout/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="pb-[80px]">
        {children}
      </main>
      <BottomNav />
    </>
  );
}
