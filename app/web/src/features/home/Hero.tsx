import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section
      className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* 1. Performance: Optimized Background Glows (No Layout Shift) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-6xl h-full opacity-50 pointer-events-none">
        <div className="absolute top-[-10%] left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full transition-opacity duration-1000" />
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-10 relative">
        {/* 2. SEO & Accessibility: Dynamic Badge */}
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className="py-1.5 px-4 border-primary/30 bg-primary/5 text-primary-foreground backdrop-blur-md flex items-center gap-2 rounded-full shadow-sm"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Stop Wasting Hours on Ads That Don't Sell
            </span>
          </Badge>
        </div>

        {/* 3. The Hook: Problem-Solution Headline (Lighthouse: SEO & LCP) */}
        <div className="space-y-6">
          <h1
            id="hero-heading"
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 leading-[1.05]"
          >
            Generate & Publish <br className="hidden md:block" />
            <span className="text-primary italic font-serif">
              Professional Ads{" "}
            </span>
            in 60s.
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-zinc-400 leading-relaxed font-medium">
            Bridging the{" "}
            <span className="text-white">Creative-to-Conversion gap</span>. Our
            AI bridges the $5,000/month agency barrier, letting you scale from
            one ad to 50 variations and publish to Facebook or Google instantly.
          </p>
        </div>

        {/* 4. Action Hub: Conversion Optimized */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            size="lg"
            className="h-14 px-10 text-sm font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-white rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(99,102,241,0.2)]"
          >
            <Zap className="w-4 h-4 mr-2 fill-current" />
            Launch Campaign Now
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-14 px-10 text-sm font-black uppercase tracking-widest border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 rounded-full backdrop-blur-md text-white hover:text-zinc-300 group transition-all"
          >
            <Play className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
            See How It Works
          </Button>
        </div>

        {/* 5. Trust Metrics: Real-World ROI (Lighthouse: Best Practices) */}
        <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/5">
          <TrustMetric label="Agency Costs Saved" value="90%" />
          <TrustMetric label="Time-to-Market" value="< 1m" />
          <TrustMetric label="Ad Variations" value="50+" />
          <TrustMetric label="Publishing" value="Instant" />
        </div>
      </div>

      {/* Grid Floor with specific height to prevent Cumulative Layout Shift (CLS) */}
      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-black to-transparent z-[-5] pointer-events-none" />
    </section>
  );
};

const TrustMetric = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center gap-1 group cursor-default">
    <span className="text-white font-black text-2xl tracking-tighter group-hover:text-primary transition-colors">
      {value}
    </span>
    <span className="text-zinc-600 text-[9px] uppercase tracking-[0.2em] font-bold">
      {label}
    </span>
  </div>
);
