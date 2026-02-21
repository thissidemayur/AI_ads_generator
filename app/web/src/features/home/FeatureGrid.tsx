import { Globe, ShieldCheck, Zap, Layers, Share2, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export const FeatureGrid = () => {
  return (
    <section id="solutions" className="py-32 bg-black relative overflow-hidden">
      {/* Lighthouse: Performance - Decorative background with no layout shift */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
            <Rocket className="w-3 h-3" /> The Solution
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none">
            Scale Without <br />
            <span className="text-zinc-600 italic font-serif">
              A Marketing Team.
            </span>
          </h2>
          <p className="text-zinc-400 max-w-xl text-lg font-medium">
            We've automated the manual friction out of advertising. Generate
            high-performance creatives and go live across all platforms in 60
            seconds.
          </p>
        </div>

        {/* Bento Grid: Optimized for SEO & Accessibility */}
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 auto-rows-[300px]">
          {/* 1. Multi-Platform Publishing (The 'Publishing' Barrier) */}
          <BentoCard
            className="md:col-span-4 md:row-span-1 border-primary/20 bg-primary/[0.02]"
            icon={<Share2 className="w-6 h-6 text-primary" />}
            title="Instant Multi-Platform Publishing"
            description="Don't just create—deploy. Push your ads directly to Facebook, Instagram, and Google Ads managers with a single click. No manual uploads, no friction."
            graphic={
              <div className="mt-6 flex items-center gap-4 animate-in fade-in slide-in-from-left-4 duration-1000">
                {["Meta", "Google", "TikTok"].map((platform) => (
                  <div
                    key={platform}
                    className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest shadow-2xl"
                  >
                    {platform}
                  </div>
                ))}
                <div className="h-px w-12 bg-gradient-to-r from-zinc-800 to-transparent" />
                <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            }
          />

          {/* 2. Automated Copywriting (The 'Complexity' Barrier) */}
          <BentoCard
            className="md:col-span-2 md:row-span-1"
            icon={<Layers className="w-6 h-6 text-amber-500" />}
            title="High-Conversion Copy"
            description="AI that knows marketing. Our system generates headlines and captions designed to convert based on real-time ad performance data."
          />

          {/* 3. Infinite Variations (The 'Ad Fatigue' Barrier) */}
          <BentoCard
            className="md:col-span-2 md:row-span-1"
            icon={<Zap className="w-6 h-6 text-yellow-500" />}
            title="Anti-Fatigue Scaling"
            description="Go from 1 asset to 50 unique ad variations in seconds. Keep your audience engaged with fresh content updated every week."
          />

          {/* 4. Infrastructure Status (Lighthouse: Best Practices) */}
          <BentoCard
            className="md:col-span-4 md:row-span-1"
            icon={<Globe className="w-6 h-6 text-blue-500" />}
            title="Global Infrastructure"
            description="Powered by a high-concurrency pipeline. We use Asia-South-1 inference nodes to ensure your ads are rendered and optimized at S3-class speeds."
            graphic={
              <div className="mt-6 w-full space-y-3">
                <div className="flex justify-between text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                  <span>Rendering Pipeline</span>
                  <span className="text-emerald-500">99.9% Uptime</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-primary w-[88%] shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
};

interface BentoProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  graphic?: React.ReactNode;
}

const BentoCard = ({
  title,
  description,
  icon,
  className,
  graphic,
}: BentoProps) => (
  <article
    className={cn(
      "group relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900/30 p-8 hover:bg-zinc-900/50 transition-all duration-500",
      className,
    )}
  >
    <div className="relative z-10 flex flex-col h-full">
      <div className="mb-6 w-fit p-4 rounded-2xl bg-black border border-zinc-800 group-hover:border-primary/50 transition-colors shadow-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-black text-white mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-zinc-500 text-sm leading-relaxed font-medium">
        {description}
      </p>

      {graphic && (
        <div className="mt-auto pt-6 flex items-center">{graphic}</div>
      )}
    </div>

    {/* Hover Effect: Pure CSS */}
    <div className="absolute inset-0 border border-transparent group-hover:border-primary/10 rounded-[2.5rem] transition-colors pointer-events-none" />
  </article>
);
