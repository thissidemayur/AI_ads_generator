import express from "express"
import cookieParser from "cookie-parser"
import { authRouter } from "./routes/auth.routes"
import cors from "cors"
import { env } from "./config/env"
import { errorMiddleware } from "./middlewares/ErrorHandler.middleware"
import { userRouter } from "./routes/user.routes"
import type { createContainer } from "./container"
import { workspaceRouter } from "./routes/workspace.route"

export const createApp = (container:ReturnType<typeof createContainer>) =>{
    const app = express()

    // use middleware
    app.use(cors({
        origin:env.FRONTEND_URL,
        credentials:true // allow cookies to be sent/recieved
    }))
    app.use(express.json())
    app.use(cookieParser())

    app.use("/api/auth", authRouter(container.authController));
    app.use("/api/user",userRouter(container.userController,container.authenticate))
    app.use("/api/workspaces",workspaceRouter(container.workspaceController,container.authenticate));
    // global Error handler
    app.use(errorMiddleware)
    return app
}