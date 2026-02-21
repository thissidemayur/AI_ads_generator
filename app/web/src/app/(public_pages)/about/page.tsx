import { Rocket, Globe, ShieldCheck, TrendingUp } from "lucide-react";

export default function AboutPage  () {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 overflow-hidden">
      <main className="container mx-auto px-6 relative">
        {/* Architectural Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[140px] rounded-full" />
        </div>

        {/* Section 1: The Vision (The "Why") */}
        <section className="max-w-4xl mx-auto text-center space-y-8 mb-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-2">
            The Vision
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none">
            Scale Without <br />
            <span className="text-primary italic font-serif">
              The Agency Fee.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto font-medium">
            AdGen AI was built to solve the "Creative-to-Conversion" gap. We
            bridge the manual friction of ad creation with a high-velocity AI
            pipeline that turns raw assets into live campaigns in 60 seconds.
          </p>
        </section>

        {/* Section 2: Core Pillars (Problem-Solution Mapping) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <ValueCard
            icon={<Rocket className="text-primary w-6 h-6" />}
            title="10x Faster Time-to-Market"
            description="Traditional agencies take weeks. Our asynchronous pipeline processes variations in seconds, allowing you to refresh creatives before ad fatigue sets in."
          />
          <ValueCard
            icon={<ShieldCheck className="text-emerald-400 w-6 h-6" />}
            title="Zero Manual Friction"
            description="From generation to publishing. We've automated the complex handshake between AI rendering and Ads Manager uploading, so you don't have to."
          />
          <ValueCard
            icon={<Globe className="text-indigo-400 w-6 h-6" />}
            title="Enterprise-Grade Scaling"
            description="Designed for India's creator economy. Our Asia-South-1 nodes handle high-concurrency jobs, ensuring your brand grows without infrastructure limits."
          />
        </div>

        {/* Section 3: The "Gap" Philosophy (Lighthouse: SEO & Narrative) */}
        <section className="mt-32 p-12 rounded-[3rem] bg-zinc-900/30 border border-zinc-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp className="w-64 h-64 text-primary" />
          </div>
          <div className="max-w-3xl relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
              Breaking the{" "}
              <span className="text-primary italic">Cost Barrier.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-medium leading-relaxed">
              Small businesses lose significant ROI due to manual friction in
              the publishing cycle. By moving away from "DIY" quality and agency
              costs, we empower startups to compete on the same level as global
              enterprises.
            </p>
            <div className="pt-4 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-white font-black text-2xl">90%</span>
                <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">
                  Cost Reduction
                </span>
              </div>
              <div className="h-8 w-px bg-zinc-800" />
              <div className="flex flex-col">
                <span className="text-white font-black text-2xl">60s</span>
                <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">
                  Launch Speed
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const ValueCard = ({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <article className="group p-10 rounded-[2.5rem] border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm hover:bg-zinc-900/40 hover:border-primary/20 transition-all duration-500">
    <div className="mb-8 w-fit p-4 rounded-2xl bg-black border border-zinc-800 shadow-inner group-hover:border-primary/50 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-black text-white mb-4 tracking-tight">
      {title}
    </h3>
    <p className="text-zinc-500 text-sm leading-relaxed font-medium">
      {description}
    </p>
  </article>
);
