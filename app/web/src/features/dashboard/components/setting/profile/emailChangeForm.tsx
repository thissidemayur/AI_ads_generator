"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";
import { Mail, Hash, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { useConfirmEmailChange, useRequestEmailChange } from "@/hooks/user/useEmailChange";


export function EmailChangeForm() {
  const [step, setStep] = useState<"request" | "verify">("request");
  const [pendingEmail, setPendingEmail] = useState("");

  const { form: requestForm, handleSubmit: handleRequestSubmit } =
    useRequestEmailChange();

  const { form: verifyForm, handleSubmit: handleVerifySubmit } =
    useConfirmEmailChange();

  const onRequestSubmit = async (data: { newEmail: string }) => {
    await handleRequestSubmit();

    if (Object.keys(requestForm.formState.errors).length === 0) {
      setPendingEmail(data.newEmail);
      setStep("verify");
    }
  };

  const onVerifySubmit = async () => {
    await handleVerifySubmit();
  };

  if (step === "verify") {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
        <form onSubmit={onVerifySubmit} className="space-y-6 max-w-md">
          {/* Status Indicator */}
          <div className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-primary/5 border border-primary/10">
            <div className="p-2 bg-primary/10 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                Verification Sent
              </span>
              <p className="text-xs text-white font-medium">{pendingEmail}</p>
            </div>
          </div>

          <Controller
            name="otp"
            control={verifyForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-3">
                <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 ml-1">
                  6-Digit Security Code
                </FieldLabel>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Hash className="w-4 h-4 text-zinc-600 group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input
                    {...field}
                    placeholder="000000"
                    className="pl-11 bg-white/[0.02] border-white/[0.08] focus:border-primary/50 rounded-2xl h-14 tracking-[0.8em] font-mono text-lg text-center"
                    aria-invalid={fieldState.invalid}
                    maxLength={6}
                  />
                </div>
                <FieldDescription className="text-[10px] ml-1">
                  Check your spam folder if the code doesn&apos;t arrive.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError
                    errors={[{ message: fieldState.error?.message }]}
                  />
                )}
              </Field>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="submit"
              className="flex-[2] h-14 rounded-2xl font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-white"
              disabled={verifyForm.formState.isSubmitting}
            >
              {verifyForm.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Verify Identity"
              )}
            </Button>
            <Button
              variant="ghost"
              type="button"
              onClick={() => setStep("request")}
              className="flex-1 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white"
            >
              Back
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <form
      onSubmit={requestForm.handleSubmit(onRequestSubmit)}
      className="space-y-8 max-w-md animate-in fade-in duration-500"
    >
      <Controller
        name="newEmail"
        control={requestForm.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="space-y-3">
            <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 ml-1">
              Updated Email Address
            </FieldLabel>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-zinc-600 group-focus-within:text-primary transition-colors" />
              </div>
              <Input
                {...field}
                type="email"
                placeholder="mayur@agency.com"
                className="pl-11 bg-white/[0.02] border-white/[0.08] focus:border-primary/50 rounded-2xl h-14 text-sm font-medium"
                aria-invalid={fieldState.invalid}
              />
            </div>
            {fieldState.invalid && (
              <FieldError errors={[{ message: fieldState.error?.message }]} />
            )}
          </Field>
        )}
      />

      <Button
        type="submit"
        className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest bg-white text-black hover:bg-zinc-200 transition-all gap-3"
        disabled={requestForm.formState.isSubmitting}
      >
        {requestForm.formState.isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Next Step <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
