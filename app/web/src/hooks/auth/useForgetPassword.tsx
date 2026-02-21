"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordDTO, forgetPasswordSchema } from "@project/shared/client";
import { forgetPasswordAction } from "@/actions/auth.action";
import { toast } from "sonner";

// Infer the type from your shared schema

export const useForgetPassword = () => {
  const [isSent, setIsSent] = useState(false);

  const form = useForm<forgetPasswordDTO>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: forgetPasswordDTO) => {
    const result = await forgetPasswordAction({email:values.email});

    if (result.success) {
      setIsSent(true);
      toast.success(result.message || "Reset link sent to your email!");
    } else {
      toast.error(result.message);
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
    isSent, // Use this to show a "Check your email" success screen
    setIsSent,
  };
};
