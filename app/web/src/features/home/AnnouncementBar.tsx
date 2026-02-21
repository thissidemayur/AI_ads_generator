import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const AnnouncementBar = () => {
  return (
    <div
      className="relative group bg-zinc-950 overflow-hidden border-b border-white/5 z-[110]"
      role="banner"
    >
      {/* Lighthouse Performance Tip: 
          Using opacity and transforms for the glow rather than background-position 
          keeps the Main Thread free for faster LCP.
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-violet-500/10 to-primary/10 opacity-30 animate-pulse pointer-events-none" />

      <Link
        to="/signup"
        className="relative py-2.5 px-6 flex items-center justify-center gap-3 text-center transition-all duration-500 group-hover:gap-6 outline-none"
      >
        <div className="flex items-center gap-3">
          {/* Vibrant Aesthetic: Animated Icon */}
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 border border-primary/30 group-hover:scale-110 transition-transform">
            <Zap className="w-3 h-3 text-primary fill-primary animate-pulse" />
          </div>

          <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.15em] text-zinc-500">
            <span className="text-zinc-300">Eliminate Manual Friction</span> —
            Launch your first <span className="text-white">AI Campaign</span>{" "}
            for{" "}
            <span className="text-primary underline decoration-primary/30 underline-offset-4 decoration-2">
              Free
            </span>
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 group-hover:border-primary/50 transition-colors">
          <span className="text-[9px] font-black text-zinc-400 group-hover:text-white uppercase tracking-tighter">
            Start Now
          </span>
          <ArrowRight className="w-3 h-3 text-zinc-600 transition-all group-hover:translate-x-1 group-hover:text-primary" />
        </div>
      </Link>

      {/* Subtle "Edge Light" Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
};
