// hooks/workspaces/usePurgeAllWorkspaces.ts
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";
import { workspaceService } from "@/services/workspace.service";

const purgeSchema = z
  .object({
    confirmText: z.string(),
  })
  .refine((data) => data.confirmText === "PURGE ALL", {
    message: "Please type 'PURGE ALL' to confirm",
    path: ["confirmText"],
  });

type PurgeInput = z.infer<typeof purgeSchema>;

export const usePurgeAllWorkspaces = () => {
  const router = useRouter();
  const { clearWorkspace, setWorkspaces } = useWorkspaceStore();

  const form = useForm<PurgeInput>({
    resolver: zodResolver(purgeSchema),
    defaultValues: { confirmText: "" },
  });

  const onSubmit = async () => {
    try {
      const response = await workspaceService.purgeAllWorkspaces();

      setWorkspaces([]); 
      clearWorkspace(); 

      toast.success(
        response.data?.message ||
          "All owned workspaces have been permanently deleted.",
      );

      router.push("/dashboard/onboarding");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to purge workspaces",
        );
      }
    }
  };

  return {
    form,
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    isValid: form.watch("confirmText") === "PURGE ALL",
  };
};
