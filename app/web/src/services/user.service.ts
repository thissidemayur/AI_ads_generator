import { api } from "@/lib/axios"
import { ChangePasswordDTO, ConfirmEmailChangeDTO, RequestEmailChangeDTO, UpdateUserDTO } from "@project/shared/client"


export const userService = {
    async getMe() {
        return api.get("/user/me")
    },

    async updateMe(data:UpdateUserDTO) {
        return api.post("/user/me",data)
    },
    async changePassword(data:ChangePasswordDTO){
        return api.post("/user/change-password",data);
    },

    async terminateSessions(){
        return api.post("/user/terminate-sessions")
    },

    async RqstEmailChange(data:RequestEmailChangeDTO) {
        return api.post("/user/request-email-change",data);
    },
    async confirmEmailChange(data:ConfirmEmailChangeDTO) {
        return api.post("/user/confirm-email-change",data);
    },

    async deleteUser() {
        return api.delete("/user/account")
    }
}