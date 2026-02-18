import type { RequestContext } from "@project/shared";

declare global {
    namespace Express {
        interface Request {
          authUser: RequestContext;
        }
    }
}