"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Building2, ShieldCheck, CreditCard } from "lucide-react";

interface SidebarNavProps {
  items: {
    href: string;
    title: string;
    description?: string;
  }[];
}

const ICON_MAP: Record<string, any> = {
  Identity: User,
  Studio: Building2,
  Security: ShieldCheck,
  Economy: CreditCard,
};

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex lg:flex-col gap-2 p-1">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = ICON_MAP[item.title] || Building2;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group relative px-4 py-4 rounded-[1.5rem] flex items-center gap-4 transition-all duration-500 outline-none overflow-hidden",
              isActive
                ? "bg-white/[0.04] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                : "text-zinc-500 hover:bg-white/[0.02] hover:text-zinc-300",
            )}
          >
            {/* Active Side Indicator (Pure CSS Transition) */}
            <div
              className={cn(
                "absolute left-0 top-1/4 bottom-1/4 w-[3px] rounded-r-full transition-all duration-700 ease-in-out",
                isActive
                  ? "bg-primary shadow-[4px_0_15px_rgba(var(--primary),0.6)] translate-x-0"
                  : "-translate-x-full",
              )}
            />

            {/* Icon Box */}
            <div
              className={cn(
                "relative p-2.5 rounded-xl border transition-all duration-500",
                isActive
                  ? "bg-primary/10 border-primary/20 text-primary"
                  : "bg-zinc-900/50 border-white/[0.03] group-hover:border-white/[0.1] text-zinc-500 group-hover:text-zinc-300",
              )}
            >
              <Icon className="w-4 h-4" />
            </div>

            {/* Labels */}
            <div className="flex flex-col items-start min-w-0">
              <span
                className={cn(
                  "text-[10px] font-black uppercase tracking-[0.25em] transition-colors duration-500",
                  isActive
                    ? "text-white"
                    : "text-zinc-500 group-hover:text-zinc-300",
                )}
              >
                {item.title}
              </span>
              {item.description && (
                <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5 truncate w-full">
                  {item.description}
                </span>
              )}
            </div>

            {/* Interactive Hover Glow (CSS Only) */}
            {!isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
