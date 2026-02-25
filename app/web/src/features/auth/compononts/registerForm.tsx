"use client";

import * as React from "react";
import { Controller } from "react-hook-form";
import { Loader2, Mail, Lock, Sparkles, UserPlus } from "lucide-react";
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
import { useRegister } from "../../../hooks/auth/useRegister";

export function RegisterForm() {
  const { form, handleSubmit, isSubmitting } = useRegister();

  return (
    <Card className="w-full sm:max-w-md mx-auto border-white/[0.08] bg-zinc-950/50 backdrop-blur-xl shadow-2xl overflow-hidden">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80">
            Start Your Journey
          </span>
        </div>
        <CardTitle className="text-2xl font-black tracking-tight text-white italic">
          Create <span className="text-primary">Studio</span> Account
        </CardTitle>
        <CardDescription className="text-zinc-500 text-xs">
          Join the next generation of AI-powered ad creation.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} id="register-form">
          <FieldGroup className="space-y-5">
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-zinc-400 text-[11px] uppercase tracking-widest font-bold">
                      First Name
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder="Mayur"
                      className="bg-white/[0.02] border-white/[0.08] focus:border-primary/50 transition-all h-11"
                      aria-invalid={fieldState.invalid}
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-zinc-400 text-[11px] uppercase tracking-widest font-bold">
                      Last Name
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder="Kumar"
                      className="bg-white/[0.02] border-white/[0.08] focus:border-primary/50 transition-all h-11"
                      aria-invalid={fieldState.invalid}
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Email Field */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-zinc-400 text-[11px] uppercase tracking-widest font-bold">
                    Email Address
                  </FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-zinc-600" />
                    <Input
                      {...field}
                      className="pl-10 bg-white/[0.02] border-white/[0.08] focus:border-primary/50 transition-all h-11"
                      type="email"
                      placeholder="mayur@lpu.in"
                      aria-invalid={fieldState.invalid}
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
                  <FieldLabel className="text-zinc-400 text-[11px] uppercase tracking-widest font-bold">
                    Security Key
                  </FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-zinc-600" />
                    <Input
                      {...field}
                      className="pl-10 bg-white/[0.02] border-white/[0.08] focus:border-primary/50 transition-all h-11"
                      type="password"
                      placeholder="••••••••"
                      aria-invalid={fieldState.invalid}
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
              className="w-full h-11 bg-primary text-black font-black uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(var(--primary),0.3)]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Create Account</span>
                </div>
              )}
            </Button>
          </FieldGroup>
        </form>

        <div className="mt-8 pt-6 border-t border-white/[0.05] text-center">
          <p className="text-xs text-zinc-500 font-medium tracking-tight">
            Already a resident?{" "}
            <Link
              href="/auth/login"
              className="font-black text-primary hover:text-primary/80 transition-colors uppercase tracking-widest ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
