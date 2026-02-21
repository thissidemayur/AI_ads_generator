import { useAuthStore } from "@/store/authStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

import {
  ChangePasswordDTO,
  changePasswordSchema,
} from "@project/shared/client";
import { userService } from "@/services/user.service";

import { z } from "zod";

const localSchema = changePasswordSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const useChangePassword = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearWorkspace = useWorkspaceStore((state) => state.clearWorkspace);

  const form = useForm<z.infer<typeof localSchema>>({
    resolver: zodResolver(localSchema),
    defaultValues: {
      newPassword: "",
      currentPassword: "",
      confirmPassword:""
    },
  });

  const onSubmit = async (data: ChangePasswordDTO) => {
    try {
      const response = await userService.changePassword(data);
      toast.success(
        response.data?.message || "Password updated. Please log in again.",
      );
      clearAuth();
      clearWorkspace();
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg =
          error.response?.data?.message || "Failed to update password";
        toast.error(msg);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return {
    form,
    isSubmitting: form.formState.isSubmitting,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    register: form.register,
  };
};
