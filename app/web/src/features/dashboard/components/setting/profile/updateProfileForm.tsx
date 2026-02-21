"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { User, Sparkles, Loader2, BadgeCheck } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldDescription,
} from "@/components/ui/field";

// 🛡️ Schema
export const updateProfileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

interface ProfileFormProps {
  initialData: UpdateProfileValues;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: initialData,
  });

  // Placeholder for logic
  async function onSubmit(data: UpdateProfileValues) {
    console.log("Updating profile...", data);
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 🏎️ Identity Badge Section */}
      <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sparkles className="w-12 h-12 text-primary" />
        </div>

        <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-inner">
          <User className="w-8 h-8 text-primary" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-black text-white uppercase tracking-widest">
              Personal Identity
            </h4>
            <BadgeCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">
            Verified User Profile • Active since 2026
          </p>
        </div>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-2xl"
      >
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-3">
                <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 ml-1">
                  Given Name
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="John"
                  className="bg-white/[0.02] border-white/[0.08] focus:border-primary/50 rounded-2xl h-14 text-sm font-medium transition-all"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Last Name */}
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-3">
                <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 ml-1">
                  Family Name
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Doe"
                  className="bg-white/[0.02] border-white/[0.08] focus:border-primary/50 rounded-2xl h-14 text-sm font-medium transition-all"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="pt-4 flex items-center justify-between border-t border-white/[0.05]">
          <p className="text-[10px] text-zinc-600 italic font-medium max-w-[280px]">
            Ensure your name matches your billing information to avoid inference
            interruptions.
          </p>

          <Button
            type="submit"
            className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              "Save Profile"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
