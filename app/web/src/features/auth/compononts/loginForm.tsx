"use client";

import { Controller } from "react-hook-form";
import { Loader2, Mail, Lock } from "lucide-react";

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
import Link from "next/link";

export function LoginForm() {
  // Use your existing hook that connects to the Server Action and Zustand
  const { register, handleSubmit, errors, isSubmitting, form } = useLogin();

  return (
    <Card className="w-full sm:max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your workspace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* We use the form ID to link the footer button to this form */}
        <form id="login-form" onSubmit={handleSubmit}>
          <FieldGroup>
            {/* Email Field using Shadcn v4 Controller Pattern */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-email">Email Address</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      id="login-email"
                      type="email"
                      className="pl-10"
                      aria-invalid={fieldState.invalid}
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

            {/* Password Field using Shadcn v4 Controller Pattern */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="login-password">Password</FieldLabel>
                    <Link
                      href="/forget-password"
                      // name="forgot-password"
                      className="text-xs text-indigo-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      id="login-password"
                      type="password"
                      className="pl-10"
                      aria-invalid={fieldState.invalid}
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
