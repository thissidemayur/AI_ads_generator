import type {  RequestHandler } from "express";

export interface IWorkspaceControllerInterface {
  create: RequestHandler;
  getMyWorkspace: RequestHandler;
  getWorkspaceById: RequestHandler;
  addMemberToWorkspace: RequestHandler;
  getMembers: RequestHandler;
  deleteCurrentWorkspace: RequestHandler;
  purgeAllWorkspaces: RequestHandler;
  update:RequestHandler
}