import express from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.routes";
import cors from "cors";
import { env } from "./config/env";
import { errorMiddleware } from "./middlewares/ErrorHandler.middleware";
import { userRouter } from "./routes/user.routes";
import type { createContainer } from "./container";
import { workspaceRouter } from "./routes/workspace.route";
import { adsRouter } from "./routes/ad.routes";

export const createApp = (container: ReturnType<typeof createContainer>) => {
  const app = express();

  app.use(
    cors({
      origin: env.FRONTEND_URL,
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(cookieParser());

  app.use("/api/auth", authRouter(container.authController));
  app.use(
    "/api/user",
    userRouter(container.userController, container.authenticate),
  );
  app.use(
    "/api/workspaces",
    workspaceRouter(container.workspaceController, container.authenticate),
  );
  app.use(
    "/api/ads",
    adsRouter(container.adController, container.authenticate),
  );
  // global Error handler
  app.use(errorMiddleware);
  return app;
};
