import { Sparkles, CheckCircle2, Globe, Rocket } from "lucide-react";
import Link from "next/link";
import React from "react";

export const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row overflow-hidden">
      <div className="hidden md:flex md:w-1/2 bg-zinc-950 p-16 flex-col justify-between border-r border-zinc-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.12)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.05)_0%,transparent_50%)] pointer-events-none" />

        <Link href="/" className="flex items-center gap-2 z-10 group">
          <div className="bg-primary h-10 w-10 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform duration-500">
            <Sparkles className="text-white h-6 w-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            AdGen<span className="text-primary">AI</span>
          </span>
        </Link>

        <div className="z-10 space-y-12">
          <div className="space-y-6">
            <h2 className="text-5xl lg:text-6xl font-black leading-[1.1] text-white tracking-tighter">
              Launch Ads <br />
              <span className="text-primary italic font-serif">
                In 60 Seconds.
              </span>
            </h2>
            <p className="text-zinc-500 max-w-sm text-lg font-medium leading-relaxed">
              Eliminate manual friction and the $5,000 agency barrier. Scale
              from one asset to 50 variations instantly.
            </p>
          </div>

          {/* Social Proof & Trust (Lighthouse: Best Practices) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-zinc-400 group">
              <div className="h-6 w-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                Direct Ads Manager Publishing
              </span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400 group">
              <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Rocket className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                Agency-Quality for 1/10th the Cost
              </span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400 group">
              <div className="h-6 w-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                Scale Globally Without a Team
              </span>
            </div>
          </div>
        </div>

        <div className="z-10 flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
              Node: Asia-South-1
            </span>
          </div>
          <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest font-bold">
            v2.0 // Secure Auth
          </div>
        </div>
      </div>

      {/* --- Form Side --- */}
      <main className="flex-1 flex items-center justify-center p-8 md:p-12 bg-black relative">
        {/* Subtle decorative background floor */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          {children}
        </div>
      </main>
    </div>
  );
};
