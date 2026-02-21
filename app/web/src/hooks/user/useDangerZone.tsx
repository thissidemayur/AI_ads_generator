import { useAuthStore } from "@/store/authStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";
import { userService } from "@/services/user.service";

const deleteAccountSchema = z.object({
  confirmation: z.string().refine((val) => val === "DELETE", {
    message: "You must type DELETE in all caps to confirm.",
  }),
});

type DeleteAccountInput = {
  confirmation: string;
};

export const useTerminateSessions = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearWorkspace = useWorkspaceStore((state) => state.clearWorkspace);

  const form = useForm<DeleteAccountInput>({
    resolver: zodResolver(deleteAccountSchema),
  });

  const onSubmit = async (data: DeleteAccountInput) => {
if (data.confirmation !== "DELETE") {
  form.setError("confirmation", { message: "You must type DELETE" });
  return;
}
    try {
      const response = await userService.terminateSessions();
      clearAuth();
      clearWorkspace();
      toast.success(response.data?.message || "All sessions terminated.");
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to terminate sessions",
        );
      }
    }
  };

  return {
    form,
    register: form.register,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};


export const useDeleteUser = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearWorkspace = useWorkspaceStore((state) => state.clearWorkspace);

  const form = useForm<DeleteAccountInput>({
    resolver: zodResolver(deleteAccountSchema),
  });

  const onSubmit = async (data: DeleteAccountInput) => {
    if (data.confirmation !== "DELETE") {
      form.setError("confirmation", { message: "You must type DELETE" });
      return;
    }
    try {
      const response = await userService.deleteUser();
      clearAuth();
      clearWorkspace();

      toast.success(response.data?.message || "Account successfully deleted.");
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to delete account",
        );
      }
    }
  };

  return {
    form,
    register: form.register,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
