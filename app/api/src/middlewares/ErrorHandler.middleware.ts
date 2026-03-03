// apps/api/src/middlewares/error.middleware.ts
import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ApiError } from "@project/shared";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isApiError =
    err instanceof ApiError ||
    err.name === "ApiError" ||
    err.isOperational === true;

  if (isApiError) {
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: any[] = [];

  // handle Zod
  if (err instanceof ZodError || err.name === "ZodError") {
    statusCode = 400;
    message = "Validation Failed";
    errors = err.issues.map((issue:any) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
  }
  // handle Prisma (Unique Constraint)
  else if (err.code === "P2002") {
    statusCode = 409;
    message = "Resource already exists.";
  }
  // handle JWT Expiry
  else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Session expired. Please login again.";
  }

  //  logging ( for debugging)
  console.error(`[ERROR][${req.method}] ${req.url}:`, {
    message: err.message,
    code: err.code,
    stack: err.stack,
  });

  return res.status(statusCode).json({
    success: false,
    message: message,
    errors: errors.length > 0 ? errors : undefined,
  });
};
