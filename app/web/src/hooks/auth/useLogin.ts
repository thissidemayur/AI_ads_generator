"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type loginDTO } from "@project/shared/client";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { loginAction } from "@/actions/auth.action";

export const useLogin = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (credentials: loginDTO) => {
    const result = await loginAction(credentials);
    console.log("Result useLogin: ",result)
    if (result.success) {
      setAuth(result.user, result.tenant, result.accessToken);

      toast.success(`Welcome Back, ${result.user?.name || "User"}`);
      router.push("/dashboard")
    } else {
      console.log("Error useLogin: ",result.message)
      toast.error(result?.message);
    }
  };

  return {
    form, // Return the whole form object
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  };
};
