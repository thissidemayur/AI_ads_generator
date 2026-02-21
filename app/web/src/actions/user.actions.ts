"use server"

import { userService } from "@/services/user.service"
import { ChangePasswordDTO, ConfirmEmailChangeDTO, RequestEmailChangeDTO, UpdateUserDTO } from "@project/shared/client"
import axios from "axios"

export async function getMeUserAction() {
    try {
        const response = await userService.getMe()
        const {user}= response.data.data
        console.log("get me user: ",user)
        return {
            success:true,
            user,
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

export async function updateMeUserAction(data: UpdateUserDTO) {
   try {
     const response = await userService.updateMe(data)
     const {updatedUser} = response.data.data 
         console.log("updated me user: ", updatedUser);
    return {
        success:true,
        user:updatedUser,
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

export async function changePasswordUserAction(data:ChangePasswordDTO) {
  try {
      const response  = await userService.changePassword(data)
      const msg = response.data.message
          console.log("message change password : ", msg);
      return {
          success:true,
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

export async function terminateSessionsUserAction() {
   try {
     const response = await userService.terminateSessions()
         const msg = response.data.message;
     console.log("message terminate sessions: ", msg);
     return {
         success:true,
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

export async function requestEmailChangeUserAction(data:RequestEmailChangeDTO) {
   try {
     const response = await userService.RqstEmailChange(data)
     console.log("message email request: ",response.data.message)

     return {
        success:true,
        message:response.data.message
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

export async function confirmEmailChangeUserAction(data:ConfirmEmailChangeDTO) {
    try {
        const response = await userService.confirmEmailChange(data)
        const message = response.data.message
        console.log("confirm email: ",message)
        return {
            success:true,
            message
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


export async function deleteUserUserAction() {
    try {
        const response = await userService.deleteUser()
            console.log("response delete Account: ",response)
        return{
            success:true,
            message:response.data.message
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

