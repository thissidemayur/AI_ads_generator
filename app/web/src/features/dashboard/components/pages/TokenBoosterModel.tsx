import { useState } from "react";
import { Zap, ShoppingCart} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BOOSTERS = [
  { id: "b1", tokens: 100, price: 199, label: "Starter Boost" },
  { id: "b2", tokens: 500, price: 799, label: "Pro Boost", popular: true },
  { id: "b3", tokens: 1000, price: 1499, label: "Mega Boost" },
];

interface TokenBoosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TokenBoosterModal = ({
  isOpen,
  onClose,
}: TokenBoosterModalProps) => {
  const [selected, setSelected] = useState("b2");

  const handleTopUp = () => {
    const pack = BOOSTERS.find((b) => b.id === selected);
    console.log(`Processing Booster: ${pack?.label}`);
    // FUTURE: Integrate Razorpay order for specific booster amount
    alert(`Redirecting to Razorpay for ${pack?.label} (₹${pack?.price})`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-zinc-950 border-zinc-900 rounded-[28px] p-0 overflow-hidden shadow-2xl">
        <div className="p-8 space-y-6">
          <DialogHeader className="space-y-2">
            <div className="h-12 w-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-2">
              <Zap className="h-6 w-6 text-yellow-500 fill-yellow-500" />
            </div>
            <DialogTitle className="text-2xl font-bold text-white tracking-tight">
              Refill Your Vault
            </DialogTitle>
            <DialogDescription className="text-zinc-500 text-xs">
              Need a few more ads? Grab a booster pack to keep your generation
              pipeline moving.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {BOOSTERS.map((pack) => (
              <button
                key={pack.id}
                onClick={() => setSelected(pack.id)}
                className={cn(
                  "w-full p-4 rounded-2xl border transition-all flex items-center justify-between group",
                  selected === pack.id
                    ? "bg-primary/5 border-primary shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                    : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors",
                      selected === pack.id
                        ? "border-primary bg-primary"
                        : "border-zinc-700",
                    )}
                  >
                    {selected === pack.id && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">
                      {pack.tokens} Tokens
                    </p>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                      {pack.label}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-white">₹{pack.price}</p>
                </div>
              </button>
            ))}
          </div>

          <Button
            onClick={handleTopUp}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl gap-2 shadow-lg shadow-primary/20"
          >
            <ShoppingCart className="w-4 h-4" /> Complete Purchase
          </Button>

          <p className="text-[10px] text-zinc-600 text-center font-medium uppercase tracking-tighter">
            Instant delivery to your{" "}
            <span className="text-zinc-400">Asia-South-1</span> workspace
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
