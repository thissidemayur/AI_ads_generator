import { useState } from "react";
import { ShieldCheck, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BillingHistory } from "./components/pages/BillingHistory";
import { TokenBoosterModal } from "./components/pages/TokenBoosterModel";
import { ActivePlanCard } from "./components/pages/ActivePlanCard";
import { PaymentMethodCard } from "./components/pages/PaymentMethodCard"; // New import
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const MemberSubscription = () => {
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isBoosterOpen, setIsBoosterOpen] = useState(false);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. TOP SECTION: ACTIVE PLAN & PAYMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActivePlanCard
          planName="Pro Creator"
          price="₹2,499"
          nextBillDate="March 12, 2026"
          currentTokens={2158}
          totalTokens={2500}
          onManageClick={() => setIsManageModalOpen(true)}
          onBoosterClick={() => setIsBoosterOpen(true)}
        />

        <PaymentMethodCard />
      </div>

      {/* 2. TRANSACTION HISTORY SECTION */}
      <div className="space-y-6 pt-4">
        <BillingHistory />
      </div>

      {/* --- MODALS --- */}
      <TokenBoosterModal
        isOpen={isBoosterOpen}
        onClose={() => setIsBoosterOpen(false)}
      />

      {/* 3. MANAGE PLAN MODAL */}
      <Dialog open={isManageModalOpen} onOpenChange={setIsManageModalOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-900 text-white rounded-[32px] sm:max-w-md shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight">
              Subscription Settings
            </DialogTitle>
            <DialogDescription className="text-zinc-500 text-xs mt-2 leading-relaxed">
              Modify your current Pro Creator subscription or view full legal
              billing details.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-6">
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between group hover:border-zinc-700 transition-all">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-medium text-zinc-300">
                  Billing Cycle
                </span>
              </div>
              <span className="text-xs font-bold text-white">Monthly</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between group hover:border-zinc-700 transition-all">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-medium text-zinc-300">
                  Auto-renew Status
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-500">
                Enabled
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="rounded-xl border-zinc-800 hover:bg-zinc-900 h-12 text-xs font-bold uppercase tracking-widest transition-all"
            >
              Switch Subscription Plan
            </Button>
            <Button
              variant="ghost"
              className="rounded-xl text-red-500/70 hover:text-red-500 hover:bg-red-500/5 h-12 text-xs font-bold uppercase tracking-widest transition-all"
            >
              Cancel Membership
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
