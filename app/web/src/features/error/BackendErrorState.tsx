"use client";

import React from "react";

export function BackendErrorState() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#030303] text-white p-10">
      <div className="max-w-md text-center space-y-8">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20 animate-pulse" />
          <div className="relative p-4 rounded-2xl bg-zinc-900 border border-red-500/50">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-black">!</span>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-black uppercase tracking-tight italic">
            System Offline
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            We can&apos;t establish a secure connection to the advertising
            engine. The studio API might be undergoing maintenance.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="group relative px-8 py-3 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          Re-initialize System
        </button>
      </div>
    </div>
  );
}
