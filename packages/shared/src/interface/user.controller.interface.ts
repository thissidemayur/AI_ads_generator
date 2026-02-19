import type { RequestHandler } from "express";

export interface IUserController {
  getMe: RequestHandler;
  updateMe: RequestHandler;
  updatePassword: RequestHandler;
  terminateSessions: RequestHandler;
  deleteAccount: RequestHandler;
  requestEmailChange: RequestHandler;
  emailChange: RequestHandler;
}