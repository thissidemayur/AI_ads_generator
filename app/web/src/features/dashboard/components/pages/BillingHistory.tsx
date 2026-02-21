import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_HISTORY = [
  {
    id: "ORD_782194",
    date: "Feb 10, 2026",
    plan: "Pro Plan",
    tokens: "+2,500",
    amount: "₹2,499",
    status: "paid",
  },
  {
    id: "ORD_661023",
    date: "Jan 12, 2026",
    plan: "Starter Plan",
    tokens: "+500",
    amount: "₹999",
    status: "paid",
  },
  {
    id: "ORD_550912",
    date: "Jan 05, 2026",
    plan: "Starter Plan",
    tokens: "0",
    amount: "₹999",
    status: "failed",
  },
];

export const BillingHistory = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white tracking-tight">
          Transaction History
        </h3>
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
          Showing last 12 months
        </p>
      </div>

      <div className="rounded-3xl border border-zinc-900 bg-black/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-900/20">
                <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Order ID
                </th>
                <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Date
                </th>
                <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Details
                </th>
                <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Amount
                </th>
                <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Status
                </th>
                <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/50">
              {MOCK_HISTORY.map((item) => (
                <tr
                  key={item.id}
                  className="group hover:bg-zinc-900/30 transition-colors"
                >
                  <td className="p-4 text-xs font-mono text-zinc-400">
                    {item.id}
                  </td>
                  <td className="p-4 text-xs text-zinc-300">{item.date}</td>
                  <td className="p-4">
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs font-bold text-white">
                        {item.plan}
                      </span>
                      <span className="text-[10px] text-primary mt-0.5">
                        {item.tokens} Tokens Added
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-bold text-white">
                    {item.amount}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-4 text-right">
                    <button
                      disabled={item.status !== "paid"}
                      className="p-2 text-zinc-500 hover:text-white disabled:opacity-20 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    paid: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    failed: "bg-red-500/10 text-red-500 border-red-500/20",
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  }[status];

  const Icon =
    status === "paid"
      ? CheckCircle2
      : status === "failed"
        ? AlertCircle
        : Clock;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-tighter",
        styles,
      )}
    >
      <Icon className="w-3 h-3" />
      {status}
    </div>
  );
};
