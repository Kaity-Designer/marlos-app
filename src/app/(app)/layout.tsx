import { BottomNav } from "@/components/layout/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh">
      <div className="flex-1 pb-[90px]">
        {children}
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-30 max-w-[430px] mx-auto pb-safe">
        <BottomNav />
      </div>
    </div>
  );
}
