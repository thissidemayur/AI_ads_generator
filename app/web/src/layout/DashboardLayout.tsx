import {  Outlet } from "react-router-dom";
import { DashboardSidebar } from "@/features/dashboard/components/pages/DashboardSidebar";
import { Search, LayoutGrid, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TokenCounter } from "@/features/dashboard/components/nav/TokenCounter"; // New Component
import { UserNav } from "@/features/dashboard/components/nav/UserNav";
import { NotificationCenter } from "@/features/dashboard/components/nav/NotificationCenter";

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-black overflow-hidden text-zinc-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-zinc-900 bg-black flex items-center justify-between px-8 z-30">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
              <input
                placeholder="Search assets..."
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary text-zinc-300 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Modular Token Counter with Usage Info */}
            <TokenCounter />

            <NotificationCenter />

            {/* App Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors">
                  <LayoutGrid className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-zinc-950 border-zinc-800 p-2 shadow-2xl"
                align="end"
              >
                <DropdownMenuLabel className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] mb-1">
                  Ecosystem
                </DropdownMenuLabel>
                <DropdownMenuItem className="focus:bg-zinc-900 rounded-lg gap-3 cursor-pointer py-2.5">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">
                      AdGen Studio
                    </span>
                    <span className="text-[10px] text-zinc-500">Active</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-8 w-px bg-zinc-900 mx-2" />
            <UserNav />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-zinc-950/50 relative">
          <div className="p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
          <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 z-[-1]" />
        </main>
      </div>
    </div>
  );
};
