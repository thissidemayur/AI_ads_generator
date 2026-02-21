"use client";

import { Zap, Info, TrendingUp, ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useWorkspaceStore } from "@/store/workspaceStore"; // 🎯 To grab real balance

export const TokenCounter = () => {
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

  // Logic: Use real data if available, otherwise fall back to demo values
  const tokensLeft = currentWorkspace?.tokenBalance ?? 842;
  const totalTokens = 1000;
  const percentage = (tokensLeft / totalTokens) * 100;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            href="/dashboard/billing"
            className="group relative flex items-center gap-4 px-4 py-2 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative">
              <div className="absolute -inset-1 bg-yellow-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500 group-hover:scale-110 transition-transform duration-500 z-10" />
            </div>

            <div className="flex flex-col gap-1.5 min-w-[80px]">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-black text-white tracking-tight">
                  {tokensLeft.toLocaleString()}
                </span>
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                  Cr.
                </span>
              </div>

              {/* Refined Progress Bar */}
              <div className="h-1 w-full bg-white/[0.05] rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-primary to-yellow-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </Link>
        </TooltipTrigger>

        <TooltipContent
          sideOffset={12}
          className="bg-zinc-950/90 backdrop-blur-2xl border-white/[0.08] p-5 w-72 shadow-showroom rounded-3xl"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                </div>
                <p className="text-xs font-black text-white uppercase tracking-wider">
                  Usage Intelligence
                </p>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">v1.0</span>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/[0.05]">
              {[
                { label: "AI Image Ad", cost: "10" },
                { label: "AI Video Ad (5s)", cost: "50" },
                { label: "Persona Training", cost: "100" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center group/item hover:translate-x-1 transition-transform"
                >
                  <span className="text-[11px] text-zinc-400 group-hover/item:text-zinc-200">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-white">
                      {item.cost}
                    </span>
                    <Zap className="w-2.5 h-2.5 text-yellow-500/50" />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <div className="p-2.5 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between group/btn cursor-pointer">
                <span className="text-[10px] text-primary font-bold uppercase tracking-tight">
                  Refill Vault
                </span>
                <ChevronRight className="w-3 h-3 text-primary group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
