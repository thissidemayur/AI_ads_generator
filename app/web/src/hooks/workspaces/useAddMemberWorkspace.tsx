import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import { addMemberSchema, type AddMemberDTO } from "@project/shared/client";
import { workspaceService } from "@/services/workspace.service";

// we are using onSuccess callback bcz useAddMember hook doesnot have access to add member in member table
// by using onSuccess callback we said once user will update then refresh the member table by calling method
export const useAddMember = (onSuccess?: () => void) => {
  const form = useForm<AddMemberDTO>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      targetUserId: "",
      role: "VIEWER", 
    },
  });

  const onSubmit = async (data: AddMemberDTO) => {
    try {
      const response = await workspaceService.AddMembersOfWorkspace(data);
      toast.success(response.data?.message || "Member added to team");

      form.reset();

      if (onSuccess) onSuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Failed to add member";
        toast.error(msg);
      }
    }
  };

  return {
    form,
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    setValue: form.setValue,
  };
};
