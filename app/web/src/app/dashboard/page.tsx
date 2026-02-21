"use client";

import { useAuthStore } from "@/store/authStore";
import {
  Sparkles,
  Video,
  Image as ImageIcon,
  History,
  Zap,
  ArrowUpRight,
  PlayCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* 👋 Header: Personalized & Action-Oriented */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
              Command <span className="text-zinc-500">Center</span>
            </h1>
          </div>
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] ml-1">
            System Operational • Welcome, {user?.firstName || "Operator"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button className="h-12 px-6 bg-white text-black hover:bg-zinc-200 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all active:scale-95">
            <Sparkles className="w-4 h-4 mr-2" />
            Launch Studio
          </Button>
        </div>
      </header>

      {/* 📊 Metrics Grid: High-Contrast Glass */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Production"
          value="128"
          icon={<History className="w-4 h-4" />}
          trend="+12% growth"
        />
        <StatCard
          title="Compute Used"
          value="4,290"
          icon={<Zap className="w-4 h-4 text-primary" />}
          trend="60% Capacity"
          isPrimary
        />
        <StatCard
          title="Video Assets"
          value="42"
          icon={<Video className="w-4 h-4 text-blue-500" />}
          trend="2 Processing"
        />
        <StatCard
          title="Visual Assets"
          value="86"
          icon={<ImageIcon className="w-4 h-4 text-emerald-500" />}
          trend="Ready for Export"
        />
      </div>

      {/* ⚡ Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Featured Creative Card */}
        <div className="lg:col-span-8 p-1 rounded-[2.5rem] bg-gradient-to-br from-white/[0.08] to-transparent">
          <div className="bg-[#050505]/60 backdrop-blur-3xl p-10 rounded-[2.4rem] border border-white/[0.02] flex flex-col justify-between min-h-[380px] relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
                <span className="text-[9px] font-black text-primary uppercase tracking-widest">
                  Featured Module
                </span>
              </div>
              <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-[0.9]">
                Automated <br /> Video Synthesis
              </h3>
              <p className="text-zinc-500 text-sm max-w-sm font-medium leading-relaxed">
                Deploy high-converting agentic video ads. Scripted, voiced, and
                rendered in your studio environment.
              </p>
              <Button
                variant="outline"
                className="h-12 px-8 border-white/[0.08] rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] text-[10px] font-black uppercase tracking-widest transition-all"
              >
                Enter Video Lab
              </Button>
            </div>
            {/* Ambient Background Graphic */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-colors duration-1000" />
            <PlayCircle className="absolute right-12 bottom-12 w-32 h-32 text-white/[0.02] -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          </div>
        </div>

        {/* Recent Logs List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">
              Recent Logs
            </h4>
            <Button
              variant="link"
              className="text-[9px] uppercase font-black tracking-widest text-primary p-0"
            >
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-3xl bg-white/[0.02] border border-white/[0.03] hover:border-white/10 hover:bg-white/[0.04] transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-zinc-900 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black opacity-50 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-white tracking-tight truncate uppercase">
                    Campaign_Node_{i}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-zinc-700" />
                    <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
                      2m ago • 4k Ready
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-800 group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, isPrimary }: any) {
  return (
    <div
      className={cn(
        "p-6 rounded-[2.5rem] border transition-all duration-500 group relative overflow-hidden",
        isPrimary
          ? "bg-primary/[0.03] border-primary/20 hover:border-primary/40 shadow-[0_0_30px_rgba(var(--primary),0.05)]"
          : "bg-white/[0.01] border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.02]",
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div
          className={cn(
            "p-3 rounded-2xl border transition-colors",
            isPrimary
              ? "bg-primary/10 border-primary/20 text-primary"
              : "bg-zinc-900 border-white/[0.03] text-zinc-500 group-hover:text-zinc-300",
          )}
        >
          {icon}
        </div>
        <div className="text-[9px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors">
          {trend}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">
          {title}
        </p>
        <h3 className="text-3xl font-black text-white tracking-tighter italic">
          {value}
        </h3>
      </div>
    </div>
  );
}
