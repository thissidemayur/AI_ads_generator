"use client";

import { useState } from "react";
import {
  Bell,
  X,
  CheckCheck,
  Info,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const INITIAL_DATA = [
  {
    id: 1,
    title: "Generation Successful",
    desc: "Your AI Video Ad for 'Cyber-Pump Sneaker' is ready for export.",
    time: "2m ago",
    status: "success",
    read: false,
  },
  {
    id: 2,
    title: "Low Token Warning",
    desc: "Your vault is down to 142 tokens. Refill to avoid inference pauses.",
    time: "1h ago",
    status: "warning",
    read: false,
  },
  {
    id: 3,
    title: "V4 Infrastructure",
    desc: "Now supporting ultra-high fidelity image rendering for all users.",
    time: "1d ago",
    status: "info",
    read: true,
  },
];

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(INITIAL_DATA);

  const deleteNotification = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const clearAll = () => setNotifications([]);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all relative group active:scale-95 border border-transparent hover:border-white/[0.05]">
          <Bell
            className={cn(
              "w-5 h-5 transition-all duration-300 group-hover:rotate-[15deg]",
              unreadCount > 0 && "text-primary fill-primary/10",
            )}
          />
          {unreadCount > 0 && (
            <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary border border-black"></span>
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={12}
        className="w-[400px] bg-zinc-950/95 backdrop-blur-2xl border-white/[0.08] p-0 shadow-showroom rounded-[2rem] overflow-hidden"
        align="end"
      >
        {/* Header Section */}
        <div className="p-6 border-b border-white/[0.05] bg-white/[0.02] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-black text-white uppercase tracking-widest">
              Live Feed
            </h3>
            {unreadCount > 0 && (
              <div className="flex items-center gap-1 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-lg">
                <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                <span className="text-primary text-[10px] font-black uppercase">
                  {unreadCount} New
                </span>
              </div>
            )}
          </div>
          <button
            onClick={clearAll}
            className="text-[10px] text-zinc-500 hover:text-primary transition-colors font-black uppercase tracking-[0.2em] flex items-center gap-1.5 group"
          >
            <CheckCheck className="w-3 h-3 transition-transform group-hover:scale-110" />
            Clear Log
          </button>
        </div>

        {/* List Section */}
        <div className="max-h-[450px] overflow-y-auto custom-scrollbar bg-[#020202]">
          {notifications.length > 0 ? (
            notifications.map((note) => (
              <div
                key={note.id}
                onClick={() => markAsRead(note.id)}
                className={cn(
                  "p-5 border-b border-white/[0.03] transition-all cursor-pointer flex gap-4 group relative",
                  !note.read
                    ? "bg-primary/[0.03] hover:bg-primary/[0.05]"
                    : "hover:bg-white/[0.02] opacity-70 hover:opacity-100",
                )}
              >
                {/* Status Indicator Bar */}
                {!note.read && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_15px_rgba(var(--primary),0.6)]" />
                )}

                <div className="shrink-0">
                  <StatusIcon status={note.status} />
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex items-center justify-between mb-1">
                    <p
                      className={cn(
                        "text-xs font-bold tracking-tight truncate transition-colors",
                        !note.read ? "text-white" : "text-zinc-400",
                      )}
                    >
                      {note.title}
                    </p>
                    <span className="text-[9px] text-zinc-600 font-mono font-bold">
                      {note.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-snug line-clamp-2 font-medium">
                    {note.desc}
                  </p>
                </div>

                {/* Quick Action Button */}
                <button
                  onClick={(e) => deleteNotification(note.id, e)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-zinc-800 hover:text-white hover:bg-white/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        {/* Footer Link */}
        <div className="p-4 bg-white/[0.02] border-t border-white/[0.05]">
          <Button
            variant="ghost"
            className="w-full text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-[0.3em] h-8 rounded-xl"
          >
            View All Terminal Logs
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const StatusIcon = ({ status }: { status: string }) => {
  const configs: Record<string, { icon: any; color: string }> = {
    success: { icon: CheckCircle2, color: "text-emerald-500" },
    warning: { icon: AlertTriangle, color: "text-yellow-500" },
    info: { icon: Info, color: "text-indigo-400" },
  };
  const { icon: Icon, color } = configs[status] || configs.info;

  return (
    <div
      className={cn(
        "p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.05]",
        color,
      )}
    >
      <Icon className="w-4 h-4" />
    </div>
  );
};

const EmptyState = () => (
  <div className="p-16 text-center space-y-4">
    <div className="h-16 w-16 bg-white/[0.02] rounded-[2rem] flex items-center justify-center mx-auto border border-white/[0.05] shadow-inner">
      <Bell className="w-6 h-6 text-zinc-800" />
    </div>
    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">
      Communications Clear
    </p>
  </div>
);
