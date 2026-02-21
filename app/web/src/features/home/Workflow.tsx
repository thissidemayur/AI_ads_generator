"use client"
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Share2,
  Rocket,
  CheckCircle2,
  Loader2,
  Globe,
} from "lucide-react";

const STEPS = [
  {
    id: "01",
    title: "Instant Creative Generation",
    description:
      "Bridge the cost barrier. Upload your product asset and type a command. Our AI builds the copy, designs the layout, and formats it for 50+ variations instantly.",
    icon: <Sparkles className="w-5 h-5" />,
    preview: "bg-indigo-500/10",
    label: "Creative Engine Active",
  },
  {
    id: "02",
    title: "One-Click Multi-Channel Sync",
    description:
      "Eliminate manual friction. Our system handles the complexity of logging into Facebook, Google, and TikTok. Review your generated variations in one unified pipeline.",
    icon: <Share2 className="w-5 h-5" />,
    preview: "bg-purple-500/10",
    label: "Cross-Platform Handshake",
  },
  {
    id: "03",
    title: "Real-Time Ad Publishing",
    description:
      "Go live in 60 seconds. Finalized ads are sent directly to your ad managers. Scale your presence without a $5,000/month agency or a design team.",
    icon: <Rocket className="w-5 h-5" />,
    preview: "bg-emerald-500/10",
    label: "Live on Meta & Google",
  },
];

export const Workflow = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="workflow" className="py-32 bg-black relative overflow-hidden">
      {/* Lighthouse: Zero Layout Shift with fixed-size ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em]">
              <Globe className="w-3 h-3" /> Zero Manual Friction
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
              From Concept to <br />
              <span className="text-primary italic font-serif">
                Live Campaign{" "}
              </span>{" "}
              in 60s.
            </h2>
            <p className="text-zinc-500 max-w-xl text-lg font-medium">
              Stop wasting hours on manual uploads. Our asynchronous pipeline
              automates the entire ad lifecycle from generation to publishing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Side: Business Outcome Selectors */}
            <div className="lg:col-span-5 space-y-3">
              {STEPS.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "w-full text-left p-8 rounded-[2rem] border transition-all duration-500 group relative",
                    activeStep === index
                      ? "bg-zinc-900/50 border-zinc-700 shadow-2xl"
                      : "bg-transparent border-transparent hover:bg-zinc-900/20",
                  )}
                  aria-pressed={activeStep === index}
                >
                  <div className="flex gap-6 items-start">
                    <div
                      className={cn(
                        "mt-1 p-3 rounded-2xl border transition-all duration-500",
                        activeStep === index
                          ? "bg-primary border-primary text-white scale-110 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                          : "bg-zinc-900 border-zinc-800 text-zinc-600",
                      )}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <h3
                        className={cn(
                          "text-xl font-black transition-colors tracking-tight",
                          activeStep === index ? "text-white" : "text-zinc-600",
                        )}
                      >
                        {step.title}
                      </h3>
                      {activeStep === index && (
                        <p className="mt-3 text-zinc-500 text-sm leading-relaxed font-medium">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Side: Visual Feedback (The "Real-Time" Proof) */}
            <div className="lg:col-span-7 sticky top-32">
              <div className="relative aspect-[4/3] rounded-[3rem] border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden group">
                {/* Simulated Publishing Terminal Header */}
                <div className="absolute top-0 left-0 right-0 h-12 border-b border-zinc-900 bg-black/50 backdrop-blur-md flex items-center px-6 justify-between z-20">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/20" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
                  </div>
                  <div className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                    Pipeline: Asia-South-1 // Status:{" "}
                    {activeStep === 1 ? "Syncing" : "Ready"}
                  </div>
                </div>

                {/* Animated UI State */}
                <div
                  className={cn(
                    "absolute inset-0 pt-12 transition-all duration-1000 flex flex-col items-center justify-center p-12",
                    STEPS[activeStep].preview,
                  )}
                >
                  <div className="text-center space-y-8">
                    <div className="relative">
                      {activeStep === 1 ? (
                        <Loader2 className="w-20 h-20 text-primary animate-spin mx-auto opacity-20" />
                      ) : (
                        <div className="w-20 h-20 bg-primary/10 rounded-3xl border border-primary/20 flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-10 h-10 text-primary" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-zinc-800 font-black text-6xl opacity-5 select-none">
                          {STEPS[activeStep].id}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em] bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                        {STEPS[activeStep].label}
                      </div>
                      <div className="h-1.5 w-72 bg-zinc-900 rounded-full overflow-hidden mx-auto shadow-inner">
                        <div
                          className={cn(
                            "h-full bg-primary transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.5)]",
                            activeStep === 0
                              ? "w-1/3"
                              : activeStep === 1
                                ? "w-2/3 animate-pulse"
                                : "w-full",
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* High-end decorative grid floor */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
