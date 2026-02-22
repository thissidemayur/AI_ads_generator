"use client";
import { useQuery } from "@tanstack/react-query";
import { MembersTable } from "./members-table";
import { InviteMemberSheet } from "./addMemberToWorkspace";
import { workspaceService } from "@/services/workspace.service";

export function MemberManagement() {
  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["workspace-members"],
    queryFn: () => workspaceService.getAllMembersOfWorkspace(),
  });


  const membersList = response?.data?.data || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="space-y-1">
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
          Team
        </h2>
        <p className="text-xs text-zinc-500">
          Manage access levels and invite collaborators.
        </p>
      </div>
      <div className="lg:col-span-2 space-y-4">
        <div className="flex justify-end">
          <InviteMemberSheet onMemberAdded={refetch} />
        </div>
        <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950/30 overflow-hidden">
          <MembersTable members={membersList} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
