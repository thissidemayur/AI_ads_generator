## 1. High-Level Directory Structure (The "Big Picture")
```
/ai-ads-platform (Root)
├── /apps
│   ├── /client          # React Frontend (Vite/Next.js)
│   ├── /api             # Fast API (Producer) - Just handles requests
│   └── /worker          # Heavy Worker (Consumer) - Does the AI work
├── /packages
│   ├── /shared          # Shared Types, DB Schema, and Utils
│   └── /langchain-core  # Your unified AI logic (The "Brain")
├── docker-compose.yml   # Starts Redis (for BullMQ) and PostgreSQL
└── package.json         # Orchestrates all folders
```


## 2. Low-Level Directory Structure (The Implementation)
### **/apps/api**
```
/src
  ├── /config            # Environment variables & Passport/Auth config
  ├── /middleware        # THE SECURITY GATE
  │   ├── auth.ts        # JWT verification logic
  │   ├── isVerified.ts  # Checks if 'email_verified' is true in DB
  │   └── rateLimiter.ts # Prevents API abuse
  ├── /controllers       # Business logic
  │   ├── authController.ts  # Register, Login, VerifyEmail logic
  │   └── genController.ts   # "Create Ad" logic (Pushes to Queue)
  ├── /routes
  │   ├── authRoutes.ts  # /api/v1/auth/*
  │   └── adRoutes.ts    # /api/v1/ads/* (Protected by middleware)
  ├── /queues            # BullMQ connection
  │   └── adQueue.ts     # The producer instance
  └── server.ts          # Entry point (App configuration)
```

### **/apps/worker (The Consumer)**
```
/src
  ├── /processors        # The "Laborers"
  │   └── adProcessor.ts # Imports LangChain to do the work
  ├── /services          # Helper services (S3 upload, Email sending)
  │   └── mailService.ts # Sends the "Job Complete" or "Verify Email" mails
  └── worker.ts          # The BullMQ Worker listener
```
