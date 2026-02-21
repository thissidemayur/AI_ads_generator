import { Suspense, lazy } from "react";
import { SocialProof } from "@/features/home/SocialProof";
import { FeatureGrid } from "@/features/home/FeatureGrid";
import { Workflow } from "@/features/home/Workflow";
import { DemoPreview } from "@/features/home/DemoPreview";
import { PricingTeaser } from "@/features/home/PricingTeaser";
import { FinalCTA } from "@/features/home/FinalCTA";
import { Hero } from "@/features/home/Hero";


const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-primary/30">
      {/* Texture Overlay: Lowered opacity for better readability */}
      <div className="fixed inset-0 bg-grain opacity-[0.03] pointer-events-none z-100" />

      <main className="relative">
        <Hero />

        <div id="social-proof">
          <SocialProof />
        </div>

        <section id="features" aria-label="Solutions Overview">
            <FeatureGrid/>
        </section>

        <section id="workflow" aria-label="The Ad Pipeline">
            <Workflow />
        </section>

        <section id="demo" aria-label="Product Demo">
            <DemoPreview />
        </section>

        <section id="pricing" aria-label="Plans and Pricing">
            <PricingTeaser />
        </section>

        {/* Closing the Creative-to-Conversion Gap */}
        <section id="get-started">
            <FinalCTA />
        </section>
      </main>

      {/* Global Progress Bar (Optional - for high-end feel) */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary/50 to-transparent z-110 opacity-20" />
    </div>
  );
};

export { HomePage };
