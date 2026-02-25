import { useAuthStore } from "@/store/authStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { api } from "@/lib/axios";

export const useLogout = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearWorkspace = useWorkspaceStore((state) => state.clearWorkspace);
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    try {
      await api.post("/auth/logout");

      clearAuth();
      clearWorkspace();
      // cookieStore.delete("activeTenantId");

      toast.success("Logged out successfully");

      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      clearAuth();
      clearWorkspace();
      router.replace("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
};
