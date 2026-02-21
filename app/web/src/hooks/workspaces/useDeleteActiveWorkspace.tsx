import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import { z } from "zod";

import { workspaceService } from "@/services/workspace.service";
import { useWorkspaceStore } from "@/store/workspaceStore";

const deleteConfirmSchema = z.object({
  workspaceName: z.string().min(1, "Confirmation is required"),
});

type DeleteConfirmInput = z.infer<typeof deleteConfirmSchema>;

export const useDeleteActiveWorkspace = () => {
  const router = useRouter();

  const { currentWorkspace, clearWorkspace, workspaces, setWorkspaces } =
    useWorkspaceStore();

  const form = useForm<DeleteConfirmInput>({
    resolver: zodResolver(deleteConfirmSchema),
    defaultValues: {
      workspaceName: "",
    },
  });

  const onSubmit = async (data: DeleteConfirmInput) => {
    if (data.workspaceName !== currentWorkspace?.name) {
      form.setError("workspaceName", {
        message: "Name does not match active workspace",
      });
      return;
    }

    try {
    const response = await workspaceService.deleteCurrentWorkspace();

      // remove the deleted workspace from the local list
      const updatedList = workspaces.filter(
        (w) => w.id !== currentWorkspace.id,
      );
      setWorkspaces(updatedList);

      // clear activeWorkspace
      clearWorkspace();

      toast.success(response.data?.message || "Workspace purged successfully.");
      router.push("/dashboard/onboarding");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to delete workspace",
        );
      }
    }
  };

  return {
    form,
    currentWorkspaceName: currentWorkspace?.name,
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    isValid: form.watch("workspaceName") === currentWorkspace?.name,
  };
};
