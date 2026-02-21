import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { UpdateUserDTO, updateUserSchema } from "@project/shared/client";
import { updateMeUserAction } from "@/actions/user.actions";

export const useUpdateProfile = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
    },
  });

  const onSubmit = async (data: UpdateUserDTO) => {
    const result = await updateMeUserAction(data);
    if (result.success) {
      // const user = {firstName:result.user?.firstName,lastName:result.user?.lastName}
      // setAuth(user,)

      toast.success(result.message);
      router.push("/dashboard/settings/profile");
    } else {
      toast.error(result.message);
      router.push("/dashboard/settings/profile");
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
