## 📁 Project Structure

### `1. High-Level Overview`
The API acts as the "Chef," validating identity and pushing heavy lifting to the queue.

```

/ai-ads-platform (Root)
├── /apps
│   ├── /web            # Next.js (App Router) Professional Dashboard
│   ├── /api            # Express.js (Producer) - Request Orchestration
│   └── /worker         # Node.js (Consumer) - AI/Heavy Processing
├── /packages
│   ├── /shared         # Prisma Schema, Zod DTOs, Shared Types & Utils
│   └── /langchain-core # Unified AI logic and prompt engineering
├── docker-compose.yml  # Local Infrastructure (Redis, PostgreSQL)
└── package.json        # Workspace orchestration (Bun/pnpm/npm)

```

### `2. Implementation Details`

### 🟢 /apps/api (The Orchestrator)
```
/src
  ├── /config            # env.ts (Zod validation), redis.ts, passport/auth config
  ├── /middlewares       # THE SECURITY GATE
  │   ├── auth.middleware.ts      # JWT verification & Identity check
  │   ├── authorize.middleware.ts # Role-based access (OWNER, ADMIN, etc.)
  │   ├── errorHandler.ts         # Centralized error/401/403 catching
  │   └── validate.middleware.ts   # Zod schema validation for DTOs
  ├── /controllers       # Incoming request handling
  │   ├── auth.controller.ts      # Register, Login, Refresh, VerifyEmail
  │   ├── user.controller.ts      # Profile management (/me)
  │   └── workspace.controller.ts # Multi-tenant management & Member logic
  ├── /services          # Business logic layers
  │   ├── auth.service.ts         # Hash verification & Session logic
  │   ├── token.service.ts        # JWT signing & Verification
  │   ├── workspace.service.ts    # Tenant isolation logic
  │   └── queue.service.ts        # Pushing jobs to BullMQ
  ├── /repositories      # Data Access Layer (Prisma)
  └── /routes            # Endpoint definitions (/api/auth, /api/user, etc.)

  ```

### `🟡 /apps/worker (The Consumer)`
The Worker is the "Laborer," listening to Redis and executing long-running tasks.
```
/src
  ├── /processors        # Job handlers
  │   └── ad.processor.ts # LangChain execution & AI Ad generation
  ├── /services          # External integrations
  │   ├── s3.service.ts   # Asset storage
  │   └── mail.service.ts # Transactional emails (Verification/Job Status)
  └── worker.ts          # BullMQ Worker entry point

```


## 🔐 Multi-Tenant Security Philosophy
Every request within Maya AI undergoes a strict validation handshake:

1. `Authentication Layer: ` Verifies the accessToken and checks against a Redis-based blacklist/versioning system for instant session revocation.
2. `Context Layer: ` Extract x-tenant-id from the header. This header is bridged from the activeTenantId cookie by the Next.js `fetchServer` utility.
3. `Authorization Layer: ` Verifies that the authenticated userId has an active Membership in the requested tenantId with the required Role.


---

## 🛠️ Getting Started

### Prerequisites

- Bun (Recommended) or Node.js v20+
- Docker & Docker Compose

### Development Setup

1. Clone the repo
2. Environment Variables: Create .env files in apps/api, apps/web, and apps/worker based on the provided .env.example templates.
3. Start Infrastructure:
```

docker-compose up -d  # Starts  Redis CLI and insight

```
4. Install Dependencies:
```
bun install
```
5. Database Migration:
```
cd packages/shared
bunx prisma migrate dev
```
6. Run All Services:
```
bun dev  # Runs frontend, api, and worker in parallel
```

## 📜 Handover Notes for Future Expansion

### 🏗️ The "Middleman Protocol" (Architecture Philosophy)
In our monorepo, Next.js acts as a Trusted Middleman between the User's Browser and the Express API. Because Server Components and Server Actions run on the server, they don't naturally share the same state as the browser. We use two specific patterns to bridge this gap:

### 1. The Proxy Pattern (Auth Handover)

- The Concept: When a user logs in, the request flows: Browser -> Next.js Action -> Express API.
- The Challenge: Express sends back Set-Cookie headers. However, these are received by the Next.js Server, not the user's browser.
- The Rule: You must manually Proxy these tokens. In loginAction and verifyEmailAction, extract the tokens from the API response and explicitly call cookieStore.set().
- Why: Without this manual "hand-delivery," the browser never receives the cookies, causing the frontend to "forget" the user immediately after a successful login.

### 2. The fetchServer Utility (Identity Proof)

- The Concept: When a Server Component (Layout/Page) needs data, it calls the Express API directly (Next.js Server -> Express API).
- The Challenge: Server-to-server calls do not automatically include cookies like a browser does. The request arrives at Express "empty-handed."
- The Rule: Always use the custom fetchServer utility for internal API calls. It manually pulls the accessToken and activeTenantId from the Next.js cookie store and injects them into the Authorization and x-tenant-id headers.
- Why: This satisfies the Express authMiddleware. Without it, the backend returns a 401 Unauthorized, triggering an infinite redirect loop.
