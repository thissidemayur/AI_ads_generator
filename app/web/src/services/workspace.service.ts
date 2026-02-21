import { api } from "@/lib/axios"
import { AddMemberDTO, CreateWorkspaceDTO } from "@project/shared/client";

export const workspaceService = {
   createWorkspace(data: CreateWorkspaceDTO) {
    return api.post("/workspaces", data);
  },
   getWorkspaces() {
    return api.get("/workspaces/my");
  },
   currentWorkspace() {
    return api.post("/workspaces/current");
  },
   AddMembersOfWorkspace(data: AddMemberDTO) {
    return api.post("/workspaces/members", data);
  },
   getAllMembersOfWorkspace() {
    return api.get("/workspaces/members");
  },
   deleteCurrentWorkspace() {
    return api.delete("/wokspaces/current");
  },

   purgeAllWorkspaces() {
    return api.delete("/workspaces/purge-all");
  },
   updateWorkspaceName(newName: string) {
    return api.patch("/workspaces/current", { name: newName });
  },
};