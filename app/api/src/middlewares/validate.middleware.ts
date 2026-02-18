import { ApiError } from "@project/shared"
import type { NextFunction, Request, Response } from "express"
import { ZodError, type ZodObject } from "zod"; 

export const validate = (schema: ZodObject) => {
  return async(req: Request, res: Response, next: NextFunction) => {
    try {
        const validateData = await schema.parseAsync(req.body)
        req.body = validateData
        next()
    } catch (error) {
      if (error instanceof ZodError) {
        const msg = error.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join(", ");

        next(new ApiError(400, msg));
      } else {
        next();
      }
    }
  };
};