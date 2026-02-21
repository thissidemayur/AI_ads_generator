import { Outlet } from "react-router-dom";
import { PublicHeader } from "../features/home/PublicHeader";
import { PublicFooter } from "../features/home/PublicFooter";
import { AnnouncementBar } from "../features/home/AnnouncementBar";
import ScrollToTop from "@/lib/ScrollToTop";

export const PublicLayout = () => {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-primary/30 flex flex-col">
      {/* 1. Viewport & Navigation Helpers */}
      <ScrollToTop />

      {/* 2. Announcement Bar: High-Velocity Alerts */}
      <AnnouncementBar />

      {/* 3. Sticky Navigation Wrapper: Lighthouse-optimized for zero CLS */}
      <div className="sticky top-0 z-[100] w-full bg-black/50 backdrop-blur-md border-b border-zinc-900/50">
        <PublicHeader />
      </div>

      {/* 4. Main Content: Asynchronous Page Loading Area */}
      <main className="relative flex-1">
        {/* Subtle background architectural glow to maintain 'Vibrant' feel across all pages */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.05)_0%,transparent_50%)] pointer-events-none" />

        <Outlet />
      </main>

      {/* 5. Global Brand Reinforcement */}
      <PublicFooter />

      {/* 6. High-End Visual Polish: Optimized Grain Overlay */}
      {/* Developer Note: Opacity 0.03 is the 'sweet spot'. 
          Anything higher interferes with color accuracy for AI ad previews.
      */}
      <div
        className="fixed inset-0 z-[999] pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url('/grain.png')` }}
        aria-hidden="true"
      />
    </div>
  );
};
