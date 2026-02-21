import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Zap } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden border-t border-zinc-900">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">
            <Sparkles className="w-3 h-3 text-primary" /> Ready to bridge the
            gap?
          </div>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[1.05]">
            Stop Building Ads. <br />
            <span className="text-primary italic font-serif">
              Start Launching Campaigns.
            </span>
          </h2>

          <p className="text-zinc-500 max-w-xl mx-auto text-lg font-medium leading-relaxed">
            Join the new era of high-velocity advertising. Eliminate manual
            friction and scale your ROI for 1/10th the cost of an agency.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button
              size="lg"
              className="h-14 px-10 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs rounded-full shadow-2xl shadow-primary/20"
            >
              <Zap className="w-4 h-4 mr-2 fill-white" /> Get Started for Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-10 border-zinc-800 bg-black text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-zinc-900 hover:text-zinc-200"
            >
              Schedule a Demo <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">
            Instant Access // No Credit Card Required // Asia-South-1 Nodes Live
          </p>
        </div>
      </div>
    </section>
  );
};
