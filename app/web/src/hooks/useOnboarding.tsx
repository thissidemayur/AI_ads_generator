// hooks/useOnboardingRefinement.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import { userService } from "@/services/user.service";
import { workspaceService } from "@/services/workspace.service";
import { useAuthStore } from "@/store/authStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { toast } from "sonner";

interface RefinementData {
  firstName: string;
  lastName: string;
  workspaceName: string;
}

export const useOnboardingRefinement = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { user, accessToken, setAuth, tenant } = useAuthStore();
  const { currentWorkspace, setActiveWorkspace, setWorkspaces, workspaces } =
    useWorkspaceStore();

  const completeOnboarding = async (data: RefinementData) => {
    setLoading(true);
    try {
      await userService.updateMe({
        firstName: data.firstName,
        lastName: data.lastName,
      });

      const wsResponse = await workspaceService.updateWorkspaceName(
         data.workspaceName,
      );

      const updatedWorkspace = wsResponse.data.data;

      if (user && accessToken) {
        setAuth(
          { ...user, firstName: data.firstName, lastName: data.lastName },
          updatedWorkspace,
          accessToken,
        );
      }

      const updatedList = workspaces.map((w) =>
        w.id === updatedWorkspace.id ? updatedWorkspace : w,
      );
      setWorkspaces(updatedList);
      setActiveWorkspace(updatedWorkspace, "OWNER");

      toast.success("Profile and Workspace updated!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Onboarding refinement failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return { completeOnboarding, loading };
};
