// apps/web/app/(dashboard)/layout.tsx
import { DashboardSidebar } from "@/features/dashboard/components/pages/DashboardSidebar";
import { DashboardHeader } from "@/features/dashboard/components/nav/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-black overflow-hidden selection:bg-primary/30">
      {/* 🏎️ FIXED SIDEBAR: The Control Tower */}
      <DashboardSidebar />

      {/* 📜 CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* 🌌 Top Navigation: The Viewport */}
        <DashboardHeader />

        {/* 🎬 MAIN STAGE */}
        <main className="flex-1 overflow-y-auto bg-zinc-950/50 scroll-smooth relative">
          {/* Global Texture Layer (Noise) */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0" />

          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

          <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
