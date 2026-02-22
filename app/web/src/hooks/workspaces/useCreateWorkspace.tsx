import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

import {
  CreateWorkspaceDTO,
  createWorkspaceSchema,
  USER_ROLES,
} from "@project/shared/client";
import { workspaceService } from "@/services/workspace.service";
import { useWorkspaceStore } from "@/store/workspaceStore";

export const useCreateWorkspace = () => {
  const router = useRouter();
  const { setActiveWorkspace, setWorkspaces, workspaces } = useWorkspaceStore();
  const form = useForm<CreateWorkspaceDTO>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateWorkspaceDTO) => {
    try {
      const response = await workspaceService.createWorkspace(data);
      const newWorkspace = response.data.data; // Assuming your API returns the Tenant object

      setWorkspaces([...workspaces, newWorkspace]);
      setActiveWorkspace(newWorkspace, USER_ROLES[0]);
      toast.success(`Workspace "${newWorkspace.name}" created successfully!`);
      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to create workspace",
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return {
    form,
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  };
};
