import { cn } from "@/lib/utils";

// Using real brand-aligned placeholders to improve SEO and Trust
const LOGOS = [
  { name: "Meta", color: "hover:text-blue-500" },
  { name: "Google", color: "hover:text-red-500" },
  { name: "TikTok", color: "hover:text-pink-500" },
  { name: "Stripe", color: "hover:text-indigo-400" },
  { name: "OpenAI", color: "hover:text-emerald-500" },
  { name: "Amazon", color: "hover:text-orange-400" },
  { name: "Shopify", color: "hover:text-green-500" },
  { name: "Instagram", color: "hover:text-fuchsia-500" },
];

export const SocialProof = () => {
  return (
    <section
      className="py-20 bg-black border-y border-zinc-900/50 overflow-hidden"
      aria-label="Social Proof: Trusted Partners"
    >
      <div className="container mx-auto px-6">
        {/* Updated Copy to reflect the "Team-in-a-Box" Problem Statement */}
        <p className="text-center text-[10px] md:text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-16">
          Scaling Ad Performance Across{" "}
          <span className="text-zinc-300">Industry Leaders</span>
        </p>

        <div className="relative flex overflow-hidden group select-none">
          {/* Performance: Optimized Edge Fades using Backdrop Blur for "Vibrant" feel */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track: Using will-change-transform for 60fps performance */}
          <div
            className="flex animate-infinite-scroll whitespace-nowrap min-w-full gap-16 md:gap-32 items-center will-change-transform"
            style={{ animationDuration: "40s" }}
          >
            {/* Accessibility: We use aria-hidden="true" for the duplicate set 
              to prevent screen readers from reading the list twice.
            */}
            <LogoTrack logos={LOGOS} />
            <LogoTrack logos={LOGOS} ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
};

const LogoTrack = ({
  logos,
  ariaHidden = false,
}: {
  logos: typeof LOGOS;
  ariaHidden?: boolean;
}) => (
  <div className="flex gap-16 md:gap-32 items-center" aria-hidden={ariaHidden}>
    {logos.map((logo, index) => (
      <div
        key={`${logo.name}-${index}`}
        className={cn(
          "text-xl md:text-3xl font-black text-zinc-800 transition-all duration-500 cursor-default tracking-tighter italic font-serif opacity-50 hover:opacity-100 filter grayscale hover:grayscale-0",
          logo.color,
        )}
      >
        {logo.name}
      </div>
    ))}
  </div>
);
