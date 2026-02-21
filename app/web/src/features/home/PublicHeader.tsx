import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Sparkles, ArrowRight, Info } from "lucide-react";

export const PublicHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Absolute paths starting with "/" ensure these work from any page
  const navLinks = [
    { name: "About Us", href: "/about", icon: <Info className="w-3 h-3" /> },
    { name: "Solutions", href: "/#features" },
    { name: "Pipeline", href: "/#workflow" },
    { name: "Pricing", href: "/#pricing" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 flex items-center justify-center w-full",
        isScrolled
          ? "h-16 border-b border-zinc-900 bg-black/80 backdrop-blur-xl"
          : "h-24 bg-transparent",
      )}
    >
      <nav
        className="max-w-7xl w-full flex items-center justify-between"
        aria-label="Main Navigation"
      >
        {/* --- Brand Identity --- */}
        <Link
          to="/"
          className="flex items-center gap-2 group outline-none"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="bg-primary h-10 w-10 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-all duration-300">
            <Sparkles className="text-white h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white leading-none">
              AdGen<span className="text-primary">AI</span>
            </span>
            <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-[0.2em] mt-1">
              Scale Without a Team
            </span>
          </div>
        </Link>

        {/* --- Desktop Navigation (Center Pill) --- */}
        <div className="hidden lg:flex items-center bg-zinc-900/40 border border-white/5 px-6 py-2 rounded-full backdrop-blur-md">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith("/#");
              const isActive = location.pathname === link.href;

              return isExternal ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-1.5",
                    isActive
                      ? "text-primary"
                      : "text-zinc-500 hover:text-white",
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* --- Action Hub --- */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <button className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <Button className="bg-white text-black hover:bg-zinc-200 h-10 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-white/5 group">
              Get Started{" "}
              <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* --- Mobile Toggle --- */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* --- Mobile Menu --- */}
      <div
        className={cn(
          "absolute top-full left-0 right-0 bg-black border-b border-zinc-900 p-8 flex flex-col gap-6 md:hidden transition-all duration-300 origin-top",
          isMobileMenuOpen
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0 pointer-events-none",
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-black uppercase tracking-widest text-zinc-400 hover:text-primary"
          >
            {link.name}
          </Link>
        ))}
        <hr className="border-zinc-900" />
        <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
          <Button className="w-full bg-primary h-12 rounded-xl text-white font-black uppercase tracking-widest text-xs">
            Start Generating Now
          </Button>
        </Link>
      </div>
    </header>
  );
};
