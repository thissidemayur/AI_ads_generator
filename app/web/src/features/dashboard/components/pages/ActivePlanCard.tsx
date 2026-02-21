import { Crown, Star, RefreshCcw, Settings2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ActivePlanCardProps {
  planName: string;
  price: string;
  nextBillDate: string;
  currentTokens: number;
  totalTokens: number;
  onManageClick: () => void;
  onBoosterClick: () => void;
}

export const ActivePlanCard = ({
  planName,
  price,
  nextBillDate,
  currentTokens,
  totalTokens,
  onManageClick,
  onBoosterClick,
}: ActivePlanCardProps) => {
  const usagePercentage = (currentTokens / totalTokens) * 100;

  return (
    <div className="lg:col-span-2 p-8 rounded-[32px] bg-zinc-900/40 border border-primary/30 relative overflow-hidden group shadow-2xl shadow-primary/5">
      {/* Visual Polish: Background Star Icon */}
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 group-hover:opacity-10 transition-all duration-700">
        <Star className="w-48 h-48 text-primary" />
      </div>

      <div className="relative z-10 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/10">
              <Crown className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {planName}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em] bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                  Active Subscription
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-white">{price}</p>
            <p className="text-[10px] text-zinc-500 uppercase font-bold mt-1 tracking-tighter">
              Next Bill: {nextBillDate}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Inference Token Usage
                </p>
                <p className="text-xl font-bold text-white">
                  {currentTokens.toLocaleString()}{" "}
                  <span className="text-zinc-600">
                    / {totalTokens.toLocaleString()}
                  </span>
                </p>
              </div>
              <span className="text-xs font-mono text-primary font-bold">
                {Math.round(usagePercentage)}%
              </span>
            </div>
            <Progress value={usagePercentage} className="h-2.5 bg-zinc-800" />
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 italic">
              <RefreshCcw className="w-3 h-3 animate-spin-slow" />
              Reset in 30 days
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 self-end">
            <Button
              onClick={onManageClick}
              variant="outline"
              className="rounded-xl border-zinc-800 hover:bg-zinc-900 text-xs font-bold gap-2 h-12 px-6"
            >
              <Settings2 className="w-4 h-4" /> Manage
            </Button>
            <Button
              onClick={onBoosterClick}
              className="rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold gap-2 h-12 px-6 shadow-lg shadow-primary/20"
            >
              <Zap className="w-4 h-4 fill-white" /> Buy Booster
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
