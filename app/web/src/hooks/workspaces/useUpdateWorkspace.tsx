import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { workspaceService } from "@/services/workspace.service";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Tenant } from "@project/shared/server";

const schema = z.object({
  name: z.string().min(2, "Name is too short").max(32, "Name is too long"),
});

export const useUpdateWorkspace = (tenant: Tenant) => {
  const { currentWorkspace, setCurrentWorkspace, workspaces, setWorkspaces } =
    useWorkspaceStore();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: tenant?.name || "" },
  });

  useEffect(() => {
    if (tenant?.name) {
      form.reset({ name: tenant.name });
    }
  }, [tenant, form]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await workspaceService.updateWorkspaceName(data.name);

      if (currentWorkspace) {
        setCurrentWorkspace({ ...currentWorkspace, name: data.name });
      }

      const updatedList = workspaces.map((w) =>
        w.id === currentWorkspace?.id ? { ...w, name: data.name } : w,
      );
      setWorkspaces(updatedList);

      toast.success("Studio identity updated successfully");
      form.reset(data); // Mark form as "clean"
    } catch (error) {
      toast.error("Failed to update studio name");
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
  };
};
