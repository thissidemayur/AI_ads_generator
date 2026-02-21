"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Starter",
    description:
      "Ideal for early-stage startups testing the AI creative-to-conversion gap.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "5 AI Creative Credits",
      "720p Export Quality",
      "Single Platform Publishing",
      "Community Access",
    ],
    cta: "Start Scaling Free",
    highlight: false,
  },
  {
    name: "Professional",
    description:
      "Replace your $5,000/month agency with high-velocity AI automation.",
    monthlyPrice: 2499,
    yearlyPrice: 1999,
    features: [
      "50 AI Creative Credits",
      "4K Ultra HD Rendering",
      "Multi-Platform Sync (FB, IG, G)",
      "Direct Ads Manager Publishing",
      "Priority Inference Queue",
    ],
    cta: "Get Pro Access",
    highlight: true,
  },
  {
    name: "Enterprise",
    description:
      "Full-stack custom pipelines for massive digital infrastructure.",
    monthlyPrice: 9999,
    yearlyPrice: 7999,
    features: [
      "Unlimited Ad Variations",
      "Private API Endpoints",
      "Custom Model Fine-tuning",
      "SLA & Dedicated Support",
      "White-label Ad Console",
    ],
    cta: "Scale Globally",
    highlight: false,
  },
];

export const PricingTeaser = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  return (
    <section
      id="pricing"
      className="py-32 bg-black relative overflow-hidden"
      aria-label="Pricing Plans"
    >
      {/* Lighthouse: No Layout Shift Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
            <ShieldCheck className="w-3 h-3" /> Scale for 1/10th the Cost
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none">
            Simple,{" "}
            <span className="text-primary italic font-serif text-5xl md:text-7xl">
              Transparent{" "}
            </span>
            Inference.
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-lg font-medium leading-relaxed">
            Stop overpaying agencies for manual friction. Choose the plan that
            fuels your creative-to-conversion pipeline.
          </p>

          {/* Optimized Toggle Switch */}
          <div className="flex items-center justify-center gap-6 pt-8">
            <span
              className={cn(
                "text-[10px] font-black uppercase tracking-widest transition-colors",
                billingCycle === "monthly" ? "text-white" : "text-zinc-600",
              )}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle((prev) =>
                  prev === "monthly" ? "yearly" : "monthly",
                )
              }
              className="relative w-14 h-7 rounded-full bg-zinc-900 border border-zinc-800 p-1 transition-all hover:border-zinc-700"
              aria-label="Toggle billing cycle"
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-transform duration-500 ease-in-out",
                  billingCycle === "yearly" ? "translate-x-7" : "translate-x-0",
                )}
              />
            </button>
            <span
              className={cn(
                "text-[10px] font-black uppercase tracking-widest transition-colors",
                billingCycle === "yearly" ? "text-white" : "text-zinc-600",
              )}
            >
              Yearly <span className="text-emerald-500 ml-1">(-20%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-center">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative p-10 rounded-[2.5rem] border transition-all duration-500 flex flex-col min-h-[600px]",
                plan.highlight
                  ? "bg-zinc-900/50 border-primary shadow-[0_20px_50px_rgba(99,102,241,0.15)] ring-1 ring-primary/50 md:scale-105 z-10"
                  : "bg-zinc-950/30 border-zinc-900 hover:border-zinc-800",
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
                  <Sparkles className="w-3 h-3 fill-white" /> Growth Choice
                </div>
              )}

              <div className="mb-10">
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">
                  {plan.name}
                </h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="mb-10 flex items-baseline gap-2">
                <span className="text-5xl font-black text-white tracking-tighter">
                  ₹
                  {billingCycle === "monthly"
                    ? plan.monthlyPrice.toLocaleString("en-IN")
                    : plan.yearlyPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                  / month
                </span>
              </div>

              <ul className="space-y-5 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-4 text-sm font-medium text-zinc-400 group"
                  >
                    <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                      <Check className="w-3 h-3 text-emerald-500" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-[0.98]",
                  plan.highlight
                    ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                    : "bg-white text-black hover:bg-zinc-200",
                )}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
