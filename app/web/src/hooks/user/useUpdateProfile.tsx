import { useAuthStore } from "@/store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { UpdateUserDTO, updateUserSchema } from "@project/shared/client";
import { updateMeUserAction } from "@/actions/user.actions";

import { useEffect } from "react";

export const useUpdateProfile = (initialData?: UpdateUserDTO) => {
  const { user, tenant, accessToken, setAuth } = useAuthStore();

  const form = useForm<UpdateUserDTO>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);


  const onSubmit = async (data: UpdateUserDTO) => {
    const result = await updateMeUserAction(data);
    
    if (result.success) {
      if (user && tenant && accessToken) {
        setAuth(
          { 
            ...user, 
            firstName: data.firstName || user.firstName, 
            lastName: data.lastName || user.lastName 
          }, 
          tenant, 
          accessToken
        );
      }
      toast.success(result.message);
      
      // Reset to current state to clear the "isDirty" flag
      form.reset(data); 
    } else {
      toast.error(result.message);
    }
  };

  return {
    form,
    isSubmitting: form.formState.isSubmitting,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
