"use client";

import { Controller } from "react-hook-form";
import { Building2, Sparkles, Hash, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { useUpdateWorkspace } from "@/hooks/workspaces/useUpdateWorkspace";
import { Tenant } from "@project/shared/server";

export function WorkspaceIdentity({ tenant }: { tenant: Tenant }) {
  const { form, handleSubmit, isSubmitting } = useUpdateWorkspace(tenant);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="lg:col-span-4 space-y-4">
        <div className="p-3 bg-primary/10 rounded-2xl w-fit border border-primary/20">
          <Building2 className="w-5 h-5 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
            Brand Context
          </h2>
          <h3 className="text-xl font-black text-white uppercase tracking-tight italic">
            Studio Identity
          </h3>
          <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
            This name identifies your workspace in the switcher and defines the
            environment for all AI ad generations.
          </p>
        </div>
      </div>

      <div className="lg:col-span-8 p-[1px] rounded-[2.5rem] bg-gradient-to-br from-white/[0.08] to-transparent shadow-2xl">
        <div className="bg-[#050505]/60 backdrop-blur-3xl p-8 rounded-[2.4rem] border border-white/[0.02]">
          <form onSubmit={handleSubmit} className="space-y-8 max-w-xl">
            <div className="space-y-6">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-3"
                  >
                    <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 ml-1">
                      Display Name
                    </FieldLabel>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Sparkles className="w-4 h-4 text-zinc-600 group-focus-within:text-primary transition-colors" />
                      </div>
                      <Input
                        {...field}
                        placeholder="e.g. Maverick Agency"
                        className="pl-11 bg-white/[0.02] border-white/[0.08] focus:border-primary/50 focus:ring-primary/20 transition-all rounded-2xl h-14 text-sm font-medium"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError
                        errors={[{ message: fieldState.error?.message }]}
                      />
                    )}
                  </Field>
                )}
              />

              <div className="space-y-3 opacity-50">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 ml-1">
                  Reference ID
                </span>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                  <Input
                    value={tenant?.id || "WS-772-X"}
                    disabled
                    className="pl-11 bg-zinc-900 border-white/[0.05] rounded-2xl h-14 font-mono text-[11px] tracking-wider"
                  />
                </div>
                <p className="text-[9px] uppercase tracking-widest font-bold text-zinc-700 ml-1">
                  Immutable unique identifier
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="h-12 px-8 rounded-xl font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  "Apply Changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
