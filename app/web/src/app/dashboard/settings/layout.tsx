// apps/web/app/(dashboard)/settings/layout.tsx
import { SidebarNav } from "@/features/dashboard/components/setting/settingSidebarNav";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-2 duration-1000">
      {/* 🏎️ Header: Minimalist but High-Impact */}
      <header className="mb-12">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase italic leading-none">
            Configuration
          </h1>
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-primary/50" />
            <p className="text-zinc-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">
              Environment Control & Identity
            </p>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* 🧭 Navigation Rail: Adaptive Responsive Design */}
        <aside className="lg:w-72 shrink-0">
          <div className="lg:sticky lg:top-32">
            <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar pb-4 lg:pb-0 gap-1 border-b border-white/[0.05] lg:border-none">
              <SidebarNav
                items={[
                  {
                    title: "Identity",
                    href: "/dashboard/settings/profile",
                    description: "User profile & details",
                  },
                  {
                    title: "Studio",
                    href: "/dashboard/settings/workspace",
                    description: "Workspace & collaboration",
                  },
                  {
                    title: "Security",
                    href: "/dashboard/settings/security",
                    description: "Key & access protocols",
                  },
                  {
                    title: "Economy",
                    href: "/dashboard/settings/billing",
                    description: "Credits & usage logs",
                  },
                ]}
              />
            </nav>

            <div className="hidden lg:block mt-12 p-6 rounded-[2rem] border border-white/[0.05] bg-white/[0.01] backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              </div>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                <span className="text-zinc-300">Status:</span> Secure Shell
                Active. All changes are encrypted and synced in real-time.
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1 relative min-w-0">
          <div className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-br from-white/[0.08] to-transparent shadow-2xl overflow-hidden">
            <div className="bg-[#050505]/40 backdrop-blur-3xl rounded-[2.4rem] border border-white/[0.02] p-6 md:p-10 lg:p-12">
              <div className="max-w-3xl mx-auto">{children}</div>
            </div>

            {/* Ambient Background Accents */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
          </div>
        </main>
      </div>
    </div>
  );
}
