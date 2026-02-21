import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  Twitter,
  Github,
  Linkedin,
  ArrowUpRight,
  Zap,
} from "lucide-react";

export const PublicFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: ["Features", "Workflow", "Demo", "Pricing"],
    Company: ["About", "Contact", "Blog"],
    Legal: ["Privacy Policy", "Terms of Service"],
  };

  const slugify = (text: string) =>
    "/" + text.toLowerCase().replace(/\s+/g, "-");

  return (
    <footer
      className="bg-black border-t border-zinc-900/50 pt-32 pb-12 relative overflow-hidden"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          {/* Brand & Value Prop Section */}
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary h-9 w-9 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <Sparkles className="text-white h-5 w-5" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white">
                  AdGen<span className="text-primary">AI</span>
                </span>
              </div>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-xs">
                Bridging the{" "}
                <span className="text-zinc-300">Creative-to-Conversion</span>{" "}
                gap for Indian startups. Generate and publish professional ads
                in 60 seconds.
              </p>
            </div>

            <div className="space-y-4 max-w-sm">
              <h4 className="text-white text-xs font-black uppercase tracking-[0.2em]">
                Weekly Creative Strategy
              </h4>
              <div className="flex gap-2 p-1.5 bg-zinc-900/50 border border-zinc-800 rounded-2xl focus-within:border-primary/50 transition-all">
                <Input
                  placeholder="mayur@lpu.in"
                  className="bg-transparent border-none focus-visible:ring-0 text-sm placeholder:text-zinc-700 h-10"
                />
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-5 h-10 font-bold text-xs uppercase tracking-widest">
                  Join
                </Button>
              </div>
              <p className="text-[10px] text-zinc-600 font-medium italic">
                Join 2,500+ creators scaling with AI. No spam, just ROI.
              </p>
            </div>
          </div>

          {/* Links Grid: SEO Optimized */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-6">
                <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] opacity-50">
                  {title}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => {
                    const isAnchor = title === "Product";

                    // FIX: Ensure anchor links point to the root path (/#id)
                    // so they work from sub-pages like /contact or /about
                    const path = isAnchor
                      ? `/#${link.toLowerCase()}`
                      : slugify(link);

                    return (
                      <li key={link}>
                        {isAnchor ? (
                          <a
                            href={path}
                            className="text-zinc-500 hover:text-primary transition-all text-xs font-bold uppercase tracking-widest flex items-center group"
                          >
                            {link}
                            <ArrowUpRight className="w-3 h-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-x-0.5" />
                          </a>
                        ) : (
                          <Link
                            to={path}
                            className="text-zinc-500 hover:text-primary transition-all text-xs font-bold uppercase tracking-widest flex items-center group"
                          >
                            {link}
                            <ArrowUpRight className="w-3 h-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-x-0.5" />
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Reliability & Socials */}
        <div className="pt-12 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-zinc-600">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-mono uppercase tracking-widest font-bold text-zinc-500">
                  Node: Asia-South-1
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span className="text-[9px] font-mono uppercase tracking-widest font-bold text-zinc-500">
                  Uptime: 99.9%
                </span>
              </div>
            </div>
            <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.2em]">
              © {currentYear} AdGen AI // Scale Without a Team.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <SocialIcon href="https://x.com/thissidemayur" icon={Twitter} />
            <SocialIcon href="https://github.com/thissidemayur" icon={Github} />
            <SocialIcon
              href="https://linkedin.com/in/thissidemayur"
              icon={Linkedin}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[150px] rounded-full -z-10 pointer-events-none" />
    </footer>
  );
};

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: any }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="h-10 w-10 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700 hover:bg-zinc-900 transition-all active:scale-90"
  >
    <Icon className="w-4 h-4" />
  </a>
);
