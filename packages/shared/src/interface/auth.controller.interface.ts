import type {  RequestHandler } from "express";

export interface IAuthController {
  register: RequestHandler;
  login: RequestHandler;
  verifyEmail:RequestHandler;
  
  refresh: RequestHandler;
  logout: RequestHandler;
  forgetPassword: RequestHandler;
  resetPassword: RequestHandler;
  resendVerification: RequestHandler;
}