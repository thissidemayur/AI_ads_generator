"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordDTO, resetPasswordSchema } from "@project/shared/client";
import { resetPasswordAction } from "@/actions/auth.action";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";


export const useResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const form = useForm<resetPasswordDTO>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token,
      newPassword: "",
    },
  });

  const onSubmit = async (values: resetPasswordDTO) => {
    if (!values.token) {
      toast.error("Reset token is missing. Please check your email link.");
      return;
    }

    const result = await resetPasswordAction(values);

    if (result.success) {
      toast.success("Password updated successfully! Please login.");
      router.push("/login");
    } else {
      toast.error(result.message);
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    tokenExists: !!token,
  };
};
