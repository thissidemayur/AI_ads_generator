// apps/api/src/middlewares/error.middleware.ts
import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { env } from "../config/env";
import { ApiError } from "@project/shared";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors: any[] = [];

   if (err instanceof ApiError) {
     return res.status(err.statusCode).json({
       success: false,
       message: err.message,
       errors: err.errors,
       stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
     });
   }

  // 1. Handle Zod Validation Errors
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Failed";
    errors = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
  }

  // 2. Handle Prisma Database Errors (e.g., Unique constraint failed)
  if (err.code === "P2002") {
    statusCode = 409;
    const target = err.meta?.target as string[];
    message = `Duplicate entry: ${target ? target.join(", ") : "record"} already exists.`;
  }

  // 3. Handle JWT/Auth specific errors if they aren't ApiErrors
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

 

  // Log the error for the developer (Internal logging)
  console.error(
    `[${new Date().toISOString()}] ${req.method} ${req.url} - ${message}`,
  );
  if (statusCode === 500) console.error(err);

  // Send the standardized JSON response
  // 3. Fallback for unhandled "Unknown" errors
  
  console.error("🔥 Unhandled Error:", err);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};;
