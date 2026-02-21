"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Trash2,
  Loader2,
  ShieldAlert,
  ZapOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function WorkspaceDangerZone({
  tenantName,
  tenantId,
}: {
  tenantName?: string;
  tenantId?: string;
}) {
  const [confirmName, setConfirmName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Placeholder for logic
  const handleDelete = async () => {
    console.log(`Eliminating environment: ${tenantId}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 🧭 Label Section */}
      <div className="lg:col-span-4 space-y-4">
        <div className="p-3 bg-red-500/10 rounded-2xl w-fit border border-red-500/20">
          <ZapOff className="w-5 h-5 text-red-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500/70">
            Critical Systems
          </h2>
          <h3 className="text-xl font-black text-white uppercase tracking-tight italic">
            Danger Zone
          </h3>
          <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
            Irreversible actions for this studio. Deleting an environment will
            purge all associated ad history, trained personas, and token logs.
          </p>
        </div>
      </div>

      {/* 🧨 Action Card */}
      <div className="lg:col-span-8 p-1 rounded-[2.5rem] bg-gradient-to-br from-red-500/20 to-transparent">
        <div className="bg-[#050505]/60 backdrop-blur-3xl p-8 rounded-[2.4rem] border border-red-500/10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white uppercase tracking-widest">
                Delete Environment
              </h4>
              <p className="text-[11px] text-zinc-500 max-w-md leading-relaxed">
                Permanently terminate the{" "}
                <span className="text-red-500 font-bold">{tenantName}</span>{" "}
                studio. This action cannot be undone.
              </p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="h-11 px-6 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
                >
                  Confirm Destruction
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-950/95 backdrop-blur-2xl border-white/[0.08] sm:max-w-[440px] rounded-[2.5rem] p-8 shadow-showroom">
                <DialogHeader className="space-y-4">
                  <div className="mx-auto p-4 bg-red-500/10 rounded-[1.5rem] w-fit border border-red-500/20">
                    <ShieldAlert className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="space-y-2 text-center">
                    <DialogTitle className="text-2xl font-black text-white uppercase italic tracking-tighter">
                      Are you sure?
                    </DialogTitle>
                    <DialogDescription className="text-zinc-500 text-xs">
                      Please type{" "}
                      <span className="text-white font-mono font-bold italic">
                        {tenantName}
                      </span>{" "}
                      to confirm the purge of this workspace.
                    </DialogDescription>
                  </div>
                </DialogHeader>

                <div className="py-4 space-y-3">
                  <Input
                    placeholder={tenantName}
                    value={confirmName}
                    onChange={(e) => setConfirmName(e.target.value)}
                    className="bg-white/[0.02] border-white/[0.08] focus:border-red-500/50 rounded-2xl h-14 text-center font-bold tracking-tight text-white"
                  />
                </div>

                <DialogFooter>
                  <Button
                    variant="destructive"
                    className="w-full h-14 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-red-500/20 active:scale-[0.98] transition-all"
                    disabled={confirmName !== tenantName || isDeleting}
                    onClick={handleDelete}
                  >
                    {isDeleting ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      "Delete Workspace"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
