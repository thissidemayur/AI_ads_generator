"use client";

import { Controller } from "react-hook-form";
import { Loader2, Mail, Lock, AlertCircle, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useLogin } from "../../../hooks/auth/useLogin";

interface LoginFormProps {
  errorMessage?: string;
}

export function LoginForm({ errorMessage }: LoginFormProps) {
  const { handleSubmit, isSubmitting, form } = useLogin();

  return (
    <Card className="w-full sm:max-w-md mx-auto border-white/[0.08] bg-zinc-950/50 backdrop-blur-xl shadow-2xl">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80">
            Welcome Back
          </span>
        </div>
        <CardTitle className="text-2xl font-black tracking-tight text-white">
          Sign In
        </CardTitle>
        <CardDescription className="text-zinc-500">
          Enter your credentials to access your Studio.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Session Expired Alert */}
        {errorMessage === "session_expired" && (
          <div className="mb-6 flex items-center gap-3 p-3 text-[11px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl animate-in fade-in slide-in-from-top-1 uppercase tracking-wider">
            <AlertCircle className="h-4 w-4" />
            <span>Session expired. Please re-authenticate.</span>
          </div>
        )}

        <form id="login-form" onSubmit={handleSubmit}>
          <FieldGroup className="space-y-4">
            {/* Email Field */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-zinc-400 text-[11px] uppercase tracking-wider font-bold">
                    Email Address
                  </FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-600" />
                    <Input
                      {...field}
                      id="login-email"
                      type="email"
                      className="pl-10 bg-white/[0.02] border-white/[0.08] focus:border-primary/50 transition-all"
                      placeholder="mayur@lpu.in"
                      autoComplete="email"
                      disabled={isSubmitting}
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password Field */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel className="text-zinc-400 text-[11px] uppercase tracking-wider font-bold">
                      Password
                    </FieldLabel>
                    <Link
                      href="/auth/forget-password"
                      className="text-[10px] text-primary/60 hover:text-primary transition-colors font-bold uppercase tracking-tight"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-600" />
                    <Input
                      {...field}
                      id="login-password"
                      type="password"
                      className="pl-10 bg-white/[0.02] border-white/[0.08] focus:border-primary/50 transition-all"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      disabled={isSubmitting}
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11 bg-primary text-black font-black uppercase tracking-widest hover:bg-primary/90 transition-all mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </FieldGroup>
        </form>

        <div className="mt-6 text-center border-t border-white/[0.05] pt-6">
          <p className="text-xs text-zinc-500 font-medium">
            New to AdGenAI?{" "}
            <Link
              href="/auth/register"
              className="text-primary hover:text-primary/80 font-bold transition-colors underline-offset-4 hover:underline"
            >
              Create Studio Account
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
