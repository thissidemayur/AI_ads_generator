"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Trash2,
  LogOut,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// 🛡️ Deletion Schema
const deleteAccountSchema = z.object({
  confirmation: z.string().refine((val) => val === "DELETE", {
    message: "Please type DELETE to confirm.",
  }),
});

type DeleteAccountValues = z.infer<typeof deleteAccountSchema>;

export function DangerZone() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const form = useForm<DeleteAccountValues>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: { confirmation: "" },
  });

  // Placeholder Actions
  const handleTerminateSessions = async () => {
    console.log("Terminating all other sessions...");
  };

  const onDeleteSubmit = async (data: DeleteAccountValues) => {
    console.log("Account deletion confirmed:", data);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 🚀 TERMINATE SESSIONS */}
      <div className="group relative overflow-hidden p-6 rounded-[2rem] border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.02] transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex gap-4">
            <div className="p-3 bg-zinc-900 rounded-2xl border border-white/[0.05] h-fit">
              <LogOut className="w-5 h-5 text-zinc-400" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-white uppercase tracking-widest">
                Session Management
              </h4>
              <p className="text-[11px] text-zinc-500 max-w-sm leading-relaxed">
                Log out of all active devices and browsers except for this one.
                Use this if you suspect unauthorized access.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={handleTerminateSessions}
            className="h-11 px-6 rounded-xl border border-white/[0.05] hover:bg-white/[0.05] text-[10px] font-black uppercase tracking-widest"
          >
            Terminate Others
          </Button>
        </div>
      </div>

      {/* 🧨 DELETE ACCOUNT (THE RED ZONE) */}
      <div className="group relative overflow-hidden p-6 rounded-[2rem] border border-red-500/10 bg-red-500/[0.02] hover:bg-red-500/[0.04] transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex gap-4">
            <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/20 h-fit">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-red-500 uppercase tracking-widest">
                Danger Zone
              </h4>
              <p className="text-[11px] text-zinc-500 max-w-sm leading-relaxed">
                Permanently remove your identity, all workspaces, and generated
                AI assets.
                <span className="text-red-500/60 ml-1 italic">
                  This action is irreversible.
                </span>
              </p>
            </div>
          </div>

          <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="h-11 px-6 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
              >
                Delete Account
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-zinc-950/95 backdrop-blur-2xl border-white/[0.08] sm:max-w-[440px] rounded-[2.5rem] p-8 shadow-showroom">
              <DialogHeader className="space-y-4">
                <div className="mx-auto p-4 bg-red-500/10 rounded-[1.5rem] w-fit border border-red-500/20">
                  <ShieldAlert className="w-8 h-8 text-red-500" />
                </div>
                <div className="space-y-2 text-center">
                  <DialogTitle className="text-2xl font-black text-white uppercase italic tracking-tighter">
                    Final Confirmation
                  </DialogTitle>
                  <DialogDescription className="text-zinc-500 text-xs">
                    You are about to purge your entire presence from our
                    systems. All tokens, ads, and data will be lost forever.
                  </DialogDescription>
                </div>
              </DialogHeader>

              <form
                onSubmit={form.handleSubmit(onDeleteSubmit)}
                className="space-y-6 py-4"
              >
                <Controller
                  name="confirmation"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="space-y-3"
                    >
                      <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 text-center block">
                        Type <span className="text-white">DELETE</span> below
                      </FieldLabel>
                      <Input
                        {...field}
                        placeholder="Type DELETE"
                        className="bg-white/[0.02] border-white/[0.08] focus:border-red-500/50 rounded-2xl h-14 text-center font-bold tracking-widest uppercase"
                      />
                      {fieldState.invalid && (
                        <FieldError
                          className="text-center"
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="submit"
                    variant="destructive"
                    className="w-full h-14 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-red-500/20"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Confirm Deletion"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
