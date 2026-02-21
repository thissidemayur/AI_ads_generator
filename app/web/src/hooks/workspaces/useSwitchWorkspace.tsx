import { useWorkspaceStore } from "@/store/workspaceStore";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import {  type UserRole } from "@project/shared/client";
import { Tenant } from "@project/shared/server";

export const useSwitchWorkspace = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setActiveWorkspace, currentWorkspace } = useWorkspaceStore();

  const switchWorkspace = (tenant: Tenant, role: UserRole) => {
    if (tenant.id === currentWorkspace?.id) return;

    try {

        setActiveWorkspace(tenant,role)

      toast.success(`Switched to ${tenant.name}`);

      // refresh or Redirect
      if (pathname.includes("/dashboard/projects/")) {
        router.push("/dashboard");
      } else {
        router.refresh(); //refresh the current page to load the current tenat data
      }
    } catch (error) {
      toast.error("Failed to switch workspace context");
    }
  };

  return { switchWorkspace, activeId: currentWorkspace?.id };
};
