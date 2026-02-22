import { useState } from "react"; // 👈 Don't forget this!
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
  const [isTerminating, setIsTerminating] = useState(false);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearWorkspace = useWorkspaceStore((state) => state.clearWorkspace);

  const handleTerminate = async () => {
    setIsTerminating(true);
    try {
      const response = await userService.terminateSessions();
      // We clear everything because terminating other sessions
      // often invalidates the current token in many security architectures
      clearAuth();
      clearWorkspace();
      toast.success(
        response.data?.message ||
          "Other sessions terminated. Please log back in.",
      );
      router.push("/login");
    } catch (error) {
      const msg = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Failed to terminate sessions";
      toast.error(msg);
    } finally {
      setIsTerminating(false);
    }
  };

  return { handleTerminate, isTerminating };
};

export const useDeleteUser = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearWorkspace = useWorkspaceStore((state) => state.clearWorkspace);

  const form = useForm<DeleteAccountInput>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: { confirmation: "" },
  });

  const onSubmit = async (data: DeleteAccountInput) => {
    if (data.confirmation !== "DELETE") {
      form.setError("confirmation", { message: "Validation mismatch." });
      return;
    }

    try {
      const response = await userService.deleteUser();

      // Cleanup
      clearAuth();
      clearWorkspace();

      toast.success(response.data?.message || "Account successfully deleted.");
      router.push("/");
    } catch (error) {
      const msg = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Deletion failed";
      toast.error(msg);
    }
  };

  return {
    form,
    isSubmitting: form.formState.isSubmitting,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};