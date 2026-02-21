import { UserRole } from "@project/shared/client";
import { Tenant } from "@project/shared/server";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface IWorkspaceStore {
    currentWorkspace: Tenant | null
    userRole: UserRole | null
    workspaces: Tenant[]
    isLoading:boolean

    // actions
    setWorkspaces: (workspaces:Tenant[])=>void
    setActiveWorkspace:(workspace:Tenant, role:UserRole) => void
    clearWorkspace: ()=>void
}


export const useWorkspaceStore = create < IWorkspaceStore>()(
    persist(
        (set)=>({
            currentWorkspace:null,
            userRole:null,
            workspaces:[],
            isLoading:false,

            setWorkspaces:(workspaces) => set({workspaces}),
            setActiveWorkspace:(workspace,role)=>set({
                currentWorkspace:workspace,
                userRole:role
            }),

            clearWorkspace:()=>set({
                workspaces:[],
                currentWorkspace:null,
                userRole:null
            }),
        }),{
            name:'workspace-storage',
            storage:createJSONStorage(()=>localStorage),
        }
    )
)