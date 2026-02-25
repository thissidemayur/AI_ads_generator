"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterDTO } from "@project/shared/client";
import { z } from "zod";
import { registerAction } from "@/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RegisterInput = z.input<typeof registerSchema>;
type RegisterOutput = z.output<typeof registerSchema>;

export const useRegister = () => {
  const router = useRouter();

  const form = useForm<RegisterInput, any, RegisterOutput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      workspaceName: "ABC",
    },
  });

  const onSubmit = async (values: RegisterOutput) => {
    const result = await registerAction(values as RegisterDTO);

    if (result.success) {
      toast.success(result.message);
      router.push(`/auth/verify-email?email=${encodeURIComponent(values.email)}`);
    } else {
      toast.error(result.message);
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
  };
};
