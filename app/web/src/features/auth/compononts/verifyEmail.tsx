"use client";

import { Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useVerifyEmail } from "../../../hooks/auth/useVerifyEmail";

export function VerifyEmailForm() {
  const { form, onVerify, onResend, cooldown, isSubmitting } = useVerifyEmail();

  return (
    <Card className="w-full sm:max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Verify Your Account</CardTitle>
        <CardDescription>
          We&apos;ve sent a 6-digit code to your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* The ID matches the button's 'form' attribute in the footer */}
        <form id="verify-form" onSubmit={onVerify}>
          <FieldGroup>
            <Controller
              name="otp"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Verification Code</FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    placeholder="000000"
                    // Ensure we pass a number to the Zod Schema
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="text-center text-lg tracking-widest"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          form="verify-form"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : (
            "Verify Account"
          )}
        </Button>

        <div className="text-sm text-center">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            // 🛡️ Pass the event to prevent flickering
            onClick={(e) => onResend(e)}
            disabled={cooldown > 0}
            className="text-indigo-600 hover:underline font-medium disabled:text-gray-400 disabled:no-underline"
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
