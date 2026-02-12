

export interface ISessionRepository{
    create(data:{refreshToken:string; userId:string; expiresAt:Date}):Promise<void>
    deleteByUserId(userId:string): Promise<void>
    deleteByToken(hashedToken:string):Promise<void>
}

