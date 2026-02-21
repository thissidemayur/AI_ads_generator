"use server"

import { workspaceService } from "@/services/workspace.service";
import { AddMemberDTO, CreateWorkspaceDTO } from "@project/shared/client";
import axios from "axios";

export async function createWorkspaceAction(data:CreateWorkspaceDTO) {
    try {
      const response = await workspaceService.createWorkspace(data)
      const { workspace  } = response.data.data
      console.log("Workspace created: ",workspace)
  
      return {
          success:true,
          workspace,
          message:response.data?.message
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          message: error.response?.data?.message || "Registration failed",
        };
      }
      return {
        success: false,
        message: "Something went wrong on our end.",
      };
    }
}

export async function getWorkspacesAction() {
   try {
     const response = await workspaceService.getWorkspaces()
   const { workspace  } = response.data.data
     console.log("Workspace getWorkspace: ",workspace)
       return {
         success: true,
         workspace,
       };
   } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
    return {
      success: false,
      message: "Something went wrong on our end.",
    };
   }
}

export async function currentWorkspaceAction(){
   try {
     const response = await workspaceService.currentWorkspace() 
       const { workspace  } = response.data.data
     console.log("Workspace current: ",workspace)
   return {
     success: true,
     workspace,
   };
   } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
    return {
      success: false,
      message: "Something went wrong on our end.",
    };
   }
}

export async function AddMembersOfWorkspaceAction(data: AddMemberDTO) {
   try {
     const response = await workspaceService.AddMembersOfWorkspace(data)
     const { member } = response.data.data;
     console.log("Workspace member created: ", member);
   return {
     success: true,
     member,
   };
   } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
    return {
      success: false,
      message: "Something went wrong on our end.",
    };
   }
}

export async function getAllMembersOfWorkspaceW() {
        try {
          const response = await workspaceService.getAllMembersOfWorkspace();
          const { members } = response.data.data;
          console.log("Workspace members: ", members);
           return {
             success: true,
             members,
           };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            return {
              success: false,
              message: error.response?.data?.message || "Registration failed",
            };
          }
          return {
            success: false,
            message: "Something went wrong on our end.",
          };
        }

}

export async function purgeAllWorkspacesAction() {
    try {
      const response = await workspaceService.purgeAllWorkspaces()
      console.log("purge all workspace: ",response.data)
      return {
        success:true,
        message: response.data?.message
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          message: error.response?.data?.message || "Registration failed",
        };
      }
      return {
        success: false,
        message: "Something went wrong on our end.",
      };
    }
}


export const deleteCurrentWorkspaceAction = async() =>{
  try {
    const response = await workspaceService.deleteCurrentWorkspace();
    console.log("delete current: ", response.data);
    return {
      success: true,
      message: response.data?.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
    return {
      success: false,
      message: "Something went wrong on our end.",
    };
  }
}

