"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterDTO } from "@project/shared/client";
import { z } from "zod";
import { registerAction } from "@/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// 1. Explicitly define the Schema types to bridge the .default() gap
type RegisterInput = z.input<typeof registerSchema>;
type RegisterOutput = z.output<typeof registerSchema>;

export const useRegister = () => {
  const router = useRouter();

  // 2. Pass both Input and Output types to useForm
  const form = useForm<RegisterInput, any, RegisterOutput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      workspaceName: "ABC", // This satisfies the 'string' requirement
    },
  });

  const onSubmit = async (values: RegisterOutput) => {
    // 'values' is now strictly RegisterOutput (workspaceName is guaranteed string)
    const result = await registerAction(values as RegisterDTO);

    if (result.success) {
      toast.success(result.message);
      router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
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
