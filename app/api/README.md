```
/apps/api
├── /src
│   ├── /config
│   │   ├── env.ts          # Zod validation for process.env
│   │   └── redis.ts        # Redis client initialization
│   ├── /controllers
│   │   ├── auth.controller.ts
│   │   └── ad.controller.ts
│   ├── /middlewares
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts # Uses shared ApiError
│   │   
│   ├── /routes
│   │   ├── index.ts        # Main router assembly
│   │   ├── auth.routes.ts
│   │   └── ad.routes.ts
│   ├── /services
│   │   ├── auth.service.ts
│   │   ├── token.service.ts # JWT logic
│   │   └── queue.service.ts # Pushes jobs to BullMQ
│   ├── /utils
│   │   └── cookieOptions.ts
│   ├── container.ts       # DI Container (Manual wiring)
│   ├── app.ts             # Express setup logic
│   └── index.ts           # Entry point (Bun.serve or app.listen)
├── package.json
└── tsconfig.json

```



// backend/src/middleware/validate.middleware.ts
import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // We parse req.body against the schema.
      // This works even if the schema doesn't have the "body" key.
      const validatedData = await schema.parseAsync(req.body);

      // Replace req.body with the validated (and potentially transformed/trimmed) data
      req.body = validatedData; 
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};
