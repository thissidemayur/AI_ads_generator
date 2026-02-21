"use client"
import React, { useState, useRef, useCallback } from "react";
import {
  MoveLeft,
  MoveRight,
  Sparkles,
  Image as ImageIcon,
  Rocket,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const DemoPreview = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleInteractionStart = () => setIsDragging(true);
  const handleInteractionEnd = () => setIsDragging(false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  return (
    <section
      id="demo"
      className="py-32 bg-black overflow-hidden select-none"
      aria-label="AI Ad Generation Demo"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
            <Zap className="w-3 h-3" /> Live Preview
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-[1.1]">
            Turn Raw Assets into <br />
            <span className="text-primary italic font-serif">
              High-Conversion Ads.
            </span>
          </h2>
          <p className="text-zinc-500 max-w-xl text-lg font-medium">
            Slide to see how our AI bridges the gap between a simple product
            photo and an agency-quality creative that is ready to publish.
          </p>
        </div>

        {/* Comparison Container: Optimized for Performance/Lighthouse */}
        <div
          ref={containerRef}
          className={cn(
            "relative max-w-6xl mx-auto aspect-video rounded-[3rem] border border-zinc-800 bg-zinc-950 overflow-hidden shadow-[0_0_100px_rgba(99,102,241,0.1)] transition-all duration-300",
            isDragging ? "cursor-grabbing" : "cursor-ew-resize",
          )}
          onMouseDown={handleInteractionStart}
          onMouseUp={handleInteractionEnd}
          onMouseLeave={handleInteractionEnd}
          onMouseMove={onMouseMove}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          onTouchMove={onTouchMove}
        >
          {/* "AFTER" - THE SOLUTION (High-Fidelity AI Output) */}
          <div className="absolute inset-0 w-full h-full bg-zinc-900 flex items-center justify-center pointer-events-none">
            {/* High-end technical grid floor */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative z-10 flex flex-col items-center gap-8 text-center px-12 animate-in fade-in duration-1000">
              <div className="flex -space-x-4 mb-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-14 w-14 rounded-2xl border-2 border-black bg-zinc-800 flex items-center justify-center shadow-2xl ring-2 ring-primary/20"
                  >
                    <Rocket className="w-6 h-6 text-primary" />
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-black uppercase tracking-[0.2em] shadow-lg">
                  <Sparkles className="w-4 h-4" /> Ready for Meta & Google
                </div>
                <h3 className="text-white text-3xl md:text-5xl font-black tracking-tighter">
                  Agency-Quality Ad
                </h3>
                <p className="text-zinc-500 text-sm max-w-sm font-medium leading-relaxed">
                  Optimized for 60% higher engagement via AI Persona mapping.
                </p>
              </div>
            </div>
          </div>

          {/* "BEFORE" - THE PAIN (Raw, Unoptimized Asset) */}
          <div
            className="absolute inset-0 w-full h-full bg-zinc-950/80 backdrop-blur-sm border-r border-white/20 z-10 flex items-center justify-center overflow-hidden pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <div className="flex flex-col items-center gap-6 text-center opacity-40 grayscale">
              <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-inner">
                <ImageIcon className="w-16 h-16 text-zinc-600" />
              </div>
              <div className="space-y-2">
                <span className="text-zinc-400 font-black text-2xl tracking-tight uppercase">
                  Static Raw Asset
                </span>
                <div className="flex items-center gap-2 justify-center text-zinc-700 text-[10px] font-mono tracking-widest bg-black px-4 py-1 rounded-full">
                  UNOPTIMIZED // ZERO_CONVERSION_ROI
                </div>
              </div>
            </div>
          </div>

          {/* Slider Handle: a11y & Performance Optimized */}
          <div
            className="absolute inset-y-0 z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-white shadow-[0_0_50px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2 transition-transform duration-300 group-hover:scale-110 ring-8 ring-white/10">
                <MoveLeft className="w-4 h-4 text-black" />
                <MoveRight className="w-4 h-4 text-black" />
              </div>
              {/* Vibrant Vertical Split Line */}
              <div className="absolute top-[-500%] bottom-[-500%] w-0.5 bg-gradient-to-b from-transparent via-white/50 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
            </div>
          </div>

          {/* State Labels: SEO & User Guidance */}
          <div className="absolute bottom-10 left-10 z-30 hidden md:flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md text-[10px] font-black text-zinc-500 border border-white/5 uppercase tracking-[0.2em]">
              Non-Performing Asset
            </div>
          </div>
          <div className="absolute bottom-10 right-10 z-30 hidden md:flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-primary/20 backdrop-blur-md text-[10px] font-black text-primary border border-primary/20 uppercase tracking-[0.2em] shadow-xl">
              <ShieldCheck className="w-3 h-3 inline mr-2" /> Live Ad Strategy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
