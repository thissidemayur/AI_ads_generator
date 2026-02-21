"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building2, Sparkles, Hash } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is too short").max(32, "Name is too long"),
});

export function WorkspaceIdentity({ tenant }: { tenant: any }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: tenant?.name || "" },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Updating Workspace Identity:", data);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 🧭 Label Section */}
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

      {/* 📝 Input Section */}
      <div className="lg:col-span-8 p-[1px] rounded-[2.5rem] bg-gradient-to-br from-white/[0.08] to-transparent shadow-2xl">
        <div className="bg-[#050505]/60 backdrop-blur-3xl p-8 rounded-[2.4rem] border border-white/[0.02]">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-xl"
          >
            <FieldGroup className="space-y-6">
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
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Read-only ID Field for context */}
              <Field className="space-y-3 opacity-50">
                <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 ml-1">
                  Reference ID
                </FieldLabel>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                  <Input
                    value={tenant?.id || "WS-772-X"}
                    disabled
                    className="pl-11 bg-zinc-900 border-white/[0.05] rounded-2xl h-14 font-mono text-[11px] tracking-wider"
                  />
                </div>
                <FieldDescription className="text-[9px] uppercase tracking-widest font-bold">
                  Immutable unique identifier
                </FieldDescription>
              </Field>
            </FieldGroup>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="h-12 px-8 rounded-xl font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Syncing..." : "Apply Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Internal Helper for Grouping
const FieldGroup = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;
