"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  Lock,
  ShieldCheck,
  Loader2,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";
import * as z from "zod";
import * as React from "react";

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
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters.")
      .max(32, "Password is too long."),
    confirmPassword: z.string().min(1, "Please confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

// 🛠️ UI Only Component
export function PasswordForm() {
  const [showPass, setShowPass] = React.useState(false);

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Placeholder for logic
  const onSubmit = async (data: ChangePasswordValues) => {
    console.log("Password change requested:", data);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Informational Header inside the form area */}
      <div className="flex items-start gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
        <div className="p-2 bg-primary/10 rounded-xl">
          <KeyRound className="w-5 h-5 text-primary" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white tracking-tight">
            Security Protocol
          </h4>
          <p className="text-[11px] text-zinc-500 leading-relaxed">
            Updating your password will terminate all other active sessions for
            this account.
          </p>
        </div>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-xl"
      >
        <FieldGroup className="space-y-6">
          {/* Current Password */}
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-3">
                <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                  Verification
                </FieldLabel>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-zinc-600 group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter current password"
                    className="pl-11 bg-white/[0.02] border-white/[0.08] focus:border-primary/50 focus:ring-primary/20 transition-all rounded-2xl h-14 text-sm"
                    aria-invalid={fieldState.invalid}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/[0.05]" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black text-zinc-700">
              <span className="bg-[#050505] px-4 italic font-bold text-zinc-600">
                New Credentials
              </span>
            </div>
          </div>

          {/* New Password & Confirm Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-3">
                  <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                    New Password
                  </FieldLabel>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <ShieldCheck className="w-4 h-4 text-zinc-600 group-focus-within:text-primary transition-colors" />
                    </div>
                    <Input
                      {...field}
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-11 bg-white/[0.02] border-white/[0.08] focus:border-primary/50 rounded-2xl h-14 text-sm"
                      aria-invalid={fieldState.invalid}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                    >
                      {showPass ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <FieldDescription className="text-[10px] ml-1">
                    Entropy: High fidelity required (min 8 char).
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-3">
                  <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                    Confirm Match
                  </FieldLabel>
                  <Input
                    {...field}
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-white/[0.02] border-white/[0.08] focus:border-primary/50 rounded-2xl h-14 text-sm"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </FieldGroup>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 active:scale-[0.98] transition-all w-full md:w-auto"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Protocols...
              </>
            ) : (
              "Apply New Password"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
