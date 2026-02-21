"use client";

import { ChevronRight, Share2 } from "lucide-react";
import { TokenCounter } from "./TokenCounter";
import { UserNav } from "./UserNav";
import { NotificationCenter } from "./NotificationCenter";
// import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import { Button } from "@/components/ui/button";
import { useWorkspaceStore } from "@/store/workspaceStore";

export const DashboardHeader = () => {
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

  return (
    <header className="h-20 border-b border-white/[0.08] bg-[#030303]/60 backdrop-blur-2xl sticky top-0 z-40 flex items-center justify-between px-8 transition-all duration-300">
      {/* LEFT: WORKSPACE & BREADCRUMBS */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-1 rounded-2xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          {/* <WorkspaceSwitcher /> */}
        </div>

        <div className="hidden md:flex items-center gap-3 ml-2">
          <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.25em] leading-none mb-1">
              Location
            </span>
            <span className="text-sm font-medium text-zinc-300 tracking-tight animate-in fade-in slide-in-from-left-2 duration-500">
              {currentWorkspace?.name || "Initializing..."}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT: CREDITS, NOTIFICATIONS, & USER */}
      <div className="flex items-center gap-4">
        {/* Token Economy */}
        <div className="hidden lg:block relative group">
          <div className="absolute -inset-1 bg-primary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500" />
          <TokenCounter />
        </div>

        <div className="h-6 w-px bg-white/[0.08] mx-2 hidden sm:block" />

        <div className="flex items-center gap-2">
         

          <NotificationCenter />

          {/* Identity */}
          <div className="ml-1 hover:scale-105 transition-transform duration-300">
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
};
