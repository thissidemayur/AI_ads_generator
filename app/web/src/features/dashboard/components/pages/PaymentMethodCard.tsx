import { CreditCard, ArrowUpRight, Plus, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PaymentMethodCard = () => {
  return (
    <div className="p-8 rounded-[32px] bg-zinc-950 border border-zinc-900 flex flex-col justify-between hover:border-zinc-700 transition-all duration-500 group relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-colors" />

      <div className="space-y-6 relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
            Default Payment Method
          </h3>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
        </div>

        {/* Card Visual Representation */}
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800 transition-all group-hover:bg-zinc-900/60 group-hover:border-zinc-700 shadow-inner">
          <div className="h-10 w-14 bg-gradient-to-br from-zinc-800 to-black rounded-lg border border-zinc-700/50 flex items-center justify-center shrink-0 shadow-2xl relative overflow-hidden">
            {/* Micro-chip detail */}
            <div className="absolute top-2 left-2 w-3 h-2 bg-zinc-700/30 rounded-sm" />
            <CreditCard className="w-6 h-6 text-zinc-500 group-hover:text-zinc-200 transition-colors" />
          </div>

          <div className="leading-none overflow-hidden space-y-2">
            <p className="text-sm font-bold text-white tracking-[0.15em] flex items-center gap-2">
              •••• •••• ••••{" "}
              <span className="text-primary tracking-normal">4242</span>
            </p>
            <div className="flex items-center gap-3">
              <p className="text-[9px] text-zinc-600 uppercase font-mono tracking-tighter">
                Visa Credit
              </p>
              <div className="h-1 w-1 rounded-full bg-zinc-800" />
              <p className="text-[9px] text-zinc-600 uppercase font-mono tracking-tighter">
                Exp 12/28
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 flex items-center justify-between relative z-10">
        <Button
          variant="link"
          className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] h-auto p-0 justify-start hover:no-underline hover:text-white transition-all group/btn"
        >
          Update Details
          <ArrowUpRight className="w-3 h-3 ml-1.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
        </Button>

        <button className="h-8 w-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-600 hover:bg-zinc-900 transition-all active:scale-90">
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
