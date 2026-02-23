import { ApiError } from "@project/shared";
import { asyncHandler, type Role } from "@project/shared/server";
import type { NextFunction, Request, Response } from "express";

export const authorize = (allowedRole:Role[]) =>{
    return asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        if(!req.authUser) {
            return next(new ApiError(401,"Authentication required"))
        }

        // check user role exist
        const hasPermission = allowedRole.includes(req.authUser.role)
        if(!hasPermission) {
            throw new ApiError(
              403,
              `Access denied. Requires one of ${allowedRole.join(", ")}`,
            );
        }

        next()
    })
}