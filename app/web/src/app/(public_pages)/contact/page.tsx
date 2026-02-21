"use client"
import { Button } from "@/components/ui/button";
import {
  Mail,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

      <main className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Strategic Hook */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                <Zap className="w-3 h-3" /> Get Enterprise Access
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
                Scale Your <br />
                <span className="text-primary italic font-serif">
                  Conversion ROI.
                </span>
              </h1>
              <p className="text-zinc-500 text-lg max-w-md font-medium leading-relaxed">
                Ready to bridge the gap? Whether it's custom model training or
                high-velocity publishing, our team is ready to help you scale.
              </p>
            </div>

            {/* Support Metrics/Trust Badges */}
            <div className="grid grid-cols-1 gap-4">
              <ContactDetail
                icon={<Mail />}
                label="Direct Support"
                value="contact@thissidemayur.me"
                href="mailto:contact@thissidemayur.me"
              />
              <div className="flex items-center gap-6 pt-4 border-t border-zinc-900">
                <div className="flex flex-col">
                  <span className="text-white font-black text-xl tracking-tighter">
                    24h
                  </span>
                  <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest">
                    Response Time
                  </span>
                </div>
                <div className="h-8 w-px bg-zinc-800" />
                <div className="flex flex-col">
                  <span className="text-white font-black text-xl tracking-tighter">
                    Asia-S1
                  </span>
                  <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest">
                    Inference Hub
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: The Inquiry Command Center */}
          <div className="relative group">
            {/* Vibrant Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-transparent blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-b from-zinc-700 to-transparent">
              <div className="bg-zinc-950 rounded-[2.4rem] p-10 lg:p-12 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-primary">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                      Secure Inquiry
                    </span>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-zinc-800" />
                </div>

                <form
                  className="space-y-5"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">
                        Full Name
                      </label>
                      <input
                        placeholder="Mayur"
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-primary transition-all text-white placeholder:text-zinc-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">
                        Company
                      </label>
                      <input
                        placeholder="AdGen AI"
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-primary transition-all text-white placeholder:text-zinc-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      placeholder="mayur@lpu.in"
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-primary transition-all text-white placeholder:text-zinc-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">
                      Message
                    </label>
                    <textarea
                      placeholder="Tell us about your conversion goals..."
                      rows={4}
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-primary transition-all text-white placeholder:text-zinc-700 resize-none"
                    />
                  </div>

                  <Button className="w-full h-14 bg-white text-black hover:bg-zinc-200 font-black uppercase tracking-widest text-xs rounded-2xl group shadow-xl">
                    Sync With Our Team
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>

                <p className="text-[9px] text-zinc-600 text-center font-bold uppercase tracking-widest">
                  <Globe className="w-3 h-3 inline mr-1 opacity-50" /> Encrypted
                  Data Transmission
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ContactDetail = ({
  icon,
  label,
  value,
  href,
}: {
  icon: any;
  label: string;
  value: string;
  href: string;
}) => (
  <a
    href={href}
    className="flex items-center gap-5 p-6 rounded-3xl border border-zinc-900 bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-800 transition-all group w-full md:w-fit shadow-inner"
  >
    <div className="p-4 rounded-2xl bg-zinc-900 text-zinc-500 group-hover:text-primary group-hover:bg-primary/10 transition-all">
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-1">
        {label}
      </p>
      <p className="text-white font-bold group-hover:text-primary transition-colors tracking-tight">
        {value}
      </p>
    </div>
  </a>
);
