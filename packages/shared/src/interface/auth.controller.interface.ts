import type { NextFunction, Request, Response } from "express";

export interface IAuthController {
  register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;

  login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;
  verifyEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;
  refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;
  logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;
  forgetPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;
  resetPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;
  resendVerifcation(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;
}