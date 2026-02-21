"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ImageIcon,
  Users,
  History,
  Settings,
  Sparkles,
  Zap,
  CreditCard,
  Menu,
  Briefcase,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  // 🎨 CREATIVE FLOW
  { name: "Studio", href: "/dashboard", icon: Sparkles }, // Changed icon to Sparkles for "Magic"
  { name: "Media Vault", href: "/dashboard/assets", icon: ImageIcon },

  // 🤖 AI ASSETS
  { name: "AI Personas", href: "/dashboard/models", icon: Users }, // Renamed to "Personas" - sounds more "AI"

  // 📈 MANAGEMENT
  { name: "Brand Kit", href: "/dashboard/brand", icon: Briefcase }, // NEW: Store logos/colors here
  { name: "Gen History", href: "/dashboard/history", icon: History },

  // 💳 INFRASTRUCTURE
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings/profile", icon: Settings },
];
export const DashboardSidebar = () => {
  const pathname = usePathname();

  // Reusable Sidebar Content for both Mobile and Desktop
  const SidebarContent = (
    <div className="flex flex-col h-full bg-[#050505] lg:bg-black">
      {/* Branding */}
      <div className="p-8">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 group-hover:border-primary/50 transition-all duration-500 shadow-[0_0_20px_rgba(var(--primary),0.1)]">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white uppercase italic leading-none">
              AdGen<span className="text-primary">AI</span>
            </span>
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">
              Studio v1.0
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300",
                  isActive
                    ? "bg-white/[0.04] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.02]",
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive
                      ? "text-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                      : "group-hover:text-zinc-300",
                  )}
                />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  {item.name}
                </span>

                {isActive && (
                  <div className="ml-auto w-1 h-4 bg-primary rounded-full shadow-[0_0_12px_rgba(var(--primary),1)]" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Infrastructure Card */}
      <div className="p-6 border-t border-white/[0.05] bg-gradient-to-t from-zinc-950/50 to-transparent">
        <div className="p-5 rounded-[2rem] bg-zinc-900/10 border border-white/[0.03] backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                Inference Load
              </span>
            </div>
            <span className="text-[10px] text-primary font-black uppercase">
              45%
            </span>
          </div>
          <div className="h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[45%] rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)] transition-all duration-1000" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em]">
              Cluster: Global-v4
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* --- DESKTOP VIEW --- */}
      <aside className="hidden lg:flex w-72 border-r border-white/[0.05] bg-black flex-col h-screen sticky top-0">
        {SidebarContent}
      </aside>

      {/* --- MOBILE VIEW: Triggered by a menu button in your layout --- */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl h-10 w-10"
            >
              <Menu className="w-5 h-5 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 w-72 border-r border-white/10 bg-black"
          >
            {/* 🛡️ ACCESSIBILITY FIX START */}
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            {/* 🛡️ ACCESSIBILITY FIX END */}

            {SidebarContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
