import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Info, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MODELS = [
  {
    id: "mod_1",
    name: "Aria",
    description: "Lifestyle & Fashion",
    style: "Urban, High-Energy",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop",
    trending: true,
  },
  {
    id: "mod_2",
    name: "Marcus",
    description: "Tech & Gadgets",
    style: "Professional, Minimal",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop",
    trending: false,
  },
  {
    id: "mod_3",
    name: "Elena",
    description: "Beauty & Skincare",
    style: "Soft, Natural, Glow",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&fit=crop",
    trending: true,
  },
];

export const ModelSelector = () => {
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">
          Select Persona Template
        </p>
        <span className="text-[10px] text-primary font-mono flex items-center gap-1">
          <Users className="w-3 h-3" /> {MODELS.length} Active Models
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {MODELS.map((model) => (
          <button
            key={model.id}
            onClick={() => setSelectedModel(model.id)}
            className={cn(
              "relative text-left p-3 rounded-2xl border transition-all duration-300 group",
              selectedModel === model.id
                ? "bg-zinc-900 border-primary/50 ring-1 ring-primary/20"
                : "bg-zinc-950 border-zinc-800 hover:border-zinc-700",
            )}
          >
            {/* Model Preview Image */}
            <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3 bg-zinc-900 border border-white/5">
              <img
                src={model.image}
                alt={model.name}
                className={cn(
                  "h-full w-full object-cover transition-transform duration-500",
                  selectedModel === model.id
                    ? "scale-110"
                    : "grayscale group-hover:grayscale-0",
                )}
              />
              {model.trending && (
                <div className="absolute top-2 left-2">
                  <Badge className="bg-primary/90 text-[8px] h-4 px-1.5 border-none shadow-lg">
                    <Star className="w-2 h-2 mr-1 fill-current" /> TRENDING
                  </Badge>
                </div>
              )}
              {selectedModel === model.id && (
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center animate-in fade-in duration-300">
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center shadow-xl">
                    <Check className="w-5 h-5" />
                  </div>
                </div>
              )}
            </div>

            {/* Model Info */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  {model.name}
                </h3>
                <Info className="w-3 h-3 text-zinc-600 hover:text-zinc-400 cursor-help" />
              </div>
              <p className="text-[10px] text-zinc-500 leading-tight">
                {model.description}
              </p>
              <div className="pt-2 border-t border-white/5 mt-2">
                <p className="text-[9px] font-mono text-primary/70 uppercase tracking-tighter">
                  Style: {model.style}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
