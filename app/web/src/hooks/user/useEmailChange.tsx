// hooks/user/useConfirmEmailChange.ts
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import {
  RequestEmailChangeDTO,
  requestEmailChangeSchema,
} from "@project/shared/client";
import {
  ConfirmEmailChangeDTO,
  confirmEmailChangeSchema,
} from "@project/shared/client";
import { userService } from "@/services/user.service";

export const useRequestEmailChange = () => {
  const form = useForm<RequestEmailChangeDTO>({
    resolver: zodResolver(requestEmailChangeSchema),
    defaultValues: { newEmail: "" },
  });

  const onSubmit = async (data: RequestEmailChangeDTO) => {
    try {
      const response = await userService.RqstEmailChange(data);
      toast.success(response.data.message || "Verification code sent to your new email.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to request email change");
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

export const useConfirmEmailChange = () => {
  const router = useRouter();
  const { user, tenant, setAuth, accessToken } = useAuthStore();

  const form = useForm<ConfirmEmailChangeDTO>({
    resolver: zodResolver(confirmEmailChangeSchema),
    defaultValues: { otp: "" },
  });

  const onSubmit = async (data: ConfirmEmailChangeDTO) => {
    try {
      const response = await userService.confirmEmailChange(data);
      const updatedEmail = response.data.data?.email;

      if (user && updatedEmail && tenant && accessToken) {
        setAuth({ ...user, email: updatedEmail }, tenant, accessToken);
      }

      toast.success("Email updated successfully.");
      router.push("/dashboard/settings/profile");

    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Invalid or expired OTP");
      }
    }
  };

  return {
    form,
    isSubmitting: form.formState.isSubmitting,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    register: form.register
  };
};

