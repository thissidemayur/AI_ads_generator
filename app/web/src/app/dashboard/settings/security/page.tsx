"use client";

import { ShieldCheck, Key, Laptop, Fingerprint, Lock, Zap } from "lucide-react";
import { PasswordForm } from "@/features/dashboard/components/setting/profile/changePassword";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SecuritySettingsPage() {
  const handleTerminateAll = async () => {
    // Placeholder for IUserService.terminateSessions
    console.log("Purging all active sessions...");
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* 🚀 Tactical Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 bg-primary rounded-full shadow-[0_0_20px_rgba(var(--primary),0.6)]" />
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            Security Protocols
          </h1>
        </div>
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] ml-4">
          Access Credentials & Session Lifecycle Management
        </p>
      </div>

      <div className="space-y-20 pb-32">
        {/* 1. Password Rotation Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4 space-y-4">
            <div className="p-3 bg-primary/10 rounded-2xl w-fit border border-primary/20">
              <Key className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                Authentication
              </h2>
              <h3 className="text-xl font-black text-white uppercase tracking-tight italic">
                Credential Rotation
              </h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                Ensure your studio access remains exclusive. We recommend a
                90-day rotation cycle for high-security environments.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 p-[1px] rounded-[2.5rem] bg-gradient-to-br from-white/[0.08] to-transparent shadow-showroom">
            <div className="p-8 md:p-10 rounded-[2.4rem] bg-[#050505]/60 backdrop-blur-3xl border border-white/[0.02]">
              <PasswordForm />
            </div>
          </div>
        </section>

        {/* 2. Session Management Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4 space-y-4">
            <div className="p-3 bg-primary/10 rounded-2xl w-fit border border-primary/20">
              <Laptop className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                Active Nodes
              </h2>
              <h3 className="text-xl font-black text-white uppercase tracking-tight italic">
                Session Control
              </h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                Monitor and terminate active connections. If you suspect an
                unauthorized breach, immediately purge all nodes.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 p-[1px] rounded-[2.5rem] bg-gradient-to-br from-white/[0.08] to-transparent shadow-showroom">
            <div className="p-8 md:p-10 rounded-[2.4rem] bg-[#050505]/60 backdrop-blur-3xl border border-white/[0.02]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/[0.05] relative group">
                    <div className="absolute inset-0 bg-primary/10 blur-md rounded-full animate-pulse opacity-50" />
                    <Fingerprint className="w-7 h-7 text-zinc-400 group-hover:text-primary transition-colors z-10" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-white uppercase tracking-tight">
                        Encrypted Shell
                      </h4>
                      <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-500 uppercase tracking-widest">
                        Verified
                      </div>
                    </div>
                    <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-tighter">
                      Status:{" "}
                      <span className="text-zinc-400 italic">
                        Protected Node active
                      </span>
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={handleTerminateAll}
                  className="w-full sm:w-auto h-12 rounded-xl border-white/[0.08] bg-white/[0.02] hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all text-[10px] font-black uppercase tracking-widest"
                >
                  Terminate All Nodes
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
