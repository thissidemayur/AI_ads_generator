"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyEmailSchema, type verifyEmailDTO } from "@project/shared/client";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { verifyEmailAction, resendOtpAction } from "@/actions/auth.action";
import { useAuthStore } from "@/store/authStore";

export const useVerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [cooldown, setCooldown] = useState(0);
  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const form = useForm<verifyEmailDTO>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email,
      otp: "" as unknown as number, // Keeps input empty initially but satisfies Zod number type
    },
  });

  const onVerify = async (values: verifyEmailDTO) => {
    const result = await verifyEmailAction(values);
    if (result.success) {
      setAuth(result.user, result.tenant, result.accessToken);
      toast.success(`Welcome back, ${result.user?.firstName || "User"}`);
      router.push("/dashboard");
    } else {
      toast.error(result.message);
    }
  };

  const onResend = async (e?: React.MouseEvent) => {
    // 🛡️ STOP the form flicker/submission
    e?.preventDefault();
    e?.stopPropagation();

    if (cooldown > 0 || !email) return;

    const result = await resendOtpAction({email});
    if (result.success) {
      toast.success(result.message);
      setCooldown(60);
    } else {
      toast.error(result.message);
    }
  };

  return {
    form,
    onVerify: form.handleSubmit(onVerify),
    onResend,
    cooldown,
    isSubmitting: form.formState.isSubmitting,
  };
};
