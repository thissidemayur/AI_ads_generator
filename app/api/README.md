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
│   │   └── tenant.middleware.ts
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