import { useState } from "react";
import {
  Check,
  Zap,
  Crown,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  CreditCard,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Starter",
    tokens: "500",
    price: 999,
    description: "Ideal for testing the AI pipeline on small projects.",
    features: ["50 Image Ads", "5 Video Ads", "Standard Queue", "S3 Storage"],
    popular: false,
    icon: Zap,
  },
  {
    name: "Pro",
    tokens: "2000",
    price: 2499,
    description: "Best for active creators and growing brands.",
    features: [
      "Unlimited Image Ads",
      "30 Video Ads",
      "Priority Queue",
      "Custom Personas",
    ],
    popular: true,
    icon: TrendingUp,
  },
  {
    name: "Enterprise",
    tokens: "10k+",
    price: "Custom",
    description: "Scale your brand with massive AI-driven output.",
    features: [
      "API Access",
      "Unlimited Video",
      "Dedicated Node",
      "24/7 Support",
    ],
    popular: false,
    icon: Crown,
  },
];

export const BillingPrice = () => {
  const [loading, setLoading] = useState<string | null>(null);

  // Razorpay Integration Placeholder
  const handlePayment = (planName: string, amount: number | string) => {
    setLoading(planName);
    console.log(`Initializing Razorpay for ${planName} at ₹${amount}`);

    // In your real API integration, you would:
    // 1. Call your backend to create a Razorpay Order ID
    // 2. Open the Razorpay Checkout Modal
    // 3. Verify the signature on your backend

    setTimeout(() => {
      alert(`Razorpay Gateway: Processing ₹${amount} for ${planName} Plan`);
      setLoading(null);
    }, 1000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
          <Sparkles className="w-3 h-3" />
          Secure Billing
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Power Your <span className="text-primary">Inference</span>
        </h1>
        <p className="text-zinc-500 text-sm max-w-2xl mx-auto leading-relaxed">
          Credits are the fuel for AdGen AI. Purchase a pack to start generating
          high-conversion ads on our{" "}
          <span className="text-zinc-300 font-medium">Asia-South-1</span>{" "}
          inference cluster.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative p-8 rounded-[32px] border transition-all duration-500 flex flex-col min-h-[500px]",
              plan.popular
                ? "bg-zinc-900/40 border-primary shadow-[0_20px_50px_rgba(99,102,241,0.15)] ring-1 ring-primary/50"
                : "bg-zinc-950 border-zinc-900 hover:border-zinc-800",
            )}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-[10px] font-black px-4 py-1 rounded-full text-white uppercase tracking-[0.2em] shadow-lg">
                Most Popular
              </div>
            )}

            <div className="flex-1 space-y-8">
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "h-12 w-12 rounded-2xl flex items-center justify-center border",
                    plan.popular
                      ? "bg-primary/10 border-primary/20"
                      : "bg-zinc-900 border-zinc-800",
                  )}
                >
                  <plan.icon
                    className={cn(
                      "w-6 h-6",
                      plan.popular ? "text-primary" : "text-zinc-500",
                    )}
                  />
                </div>
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
                  {plan.name}
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white tracking-tighter">
                    {plan.tokens}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
                    Tokens
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-4">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/5 space-y-6">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold text-white">
                  {typeof plan.price === "number"
                    ? `₹${plan.price}`
                    : plan.price}
                </span>
                <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                  One-Time Payment
                </span>
              </div>
              <Button
                onClick={() => handlePayment(plan.name, plan.price)}
                disabled={loading !== null}
                className={cn(
                  "w-full h-14 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-[0.98] shadow-lg",
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
                    : "bg-white text-black hover:bg-zinc-200",
                )}
              >
                {loading === plan.name ? "Initializing..." : `Get ${plan.name}`}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Policy Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-zinc-900">
        <div className="p-6 rounded-3xl bg-zinc-900/30 border border-zinc-800 flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-widest">
              SSL Secure
            </p>
            <p className="text-[10px] text-zinc-500 mt-1">
              256-bit payment encryption
            </p>
          </div>
        </div>
        <div className="p-6 rounded-3xl bg-zinc-900/30 border border-zinc-800 flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <CreditCard className="w-5 h-5 text-indigo-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-widest">
              No Expiry
            </p>
            <p className="text-[10px] text-zinc-500 mt-1">
              Tokens stay in your vault
            </p>
          </div>
        </div>
        <div className="p-6 rounded-3xl bg-zinc-900/30 border border-zinc-800 flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
            <History className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-widest">
              Invoicing
            </p>
            <p className="text-[10px] text-zinc-500 mt-1">
              Automated GST invoices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
