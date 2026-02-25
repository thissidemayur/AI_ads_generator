#  Backend API (`apps/api`)

## 🚀 Overview
A high-performance, multi-tenant Express.js API designed to orchestrate advertising data and act as a Producer for AI generation tasks. This service handles the "Brain" of the operation: authentication, workspace isolation, and job queuing


## 🧱 Layered Architecture

To ensure scalability and testability, we follow a strict **Controller-Service-Repository** pattern:

1. **Routes:** Defines endpoints and attaches middleware.
2. **Middlewares:** Handles JWT verification (`auth`), RBAC (`authorize`), and Schema Validation (`validate`).
3. **Controllers:** Parses requests and returns `ApiResponse` or `ApiError`.
4. **Services:** Contains the core business logic (e.g., Auth logic, Workspace calculations).
5. **Queues:** Producers that hand off heavy AI tasks to Redis/BullMQ.
6. **Repositories:** Direct Prisma interactions (Data Access Layer).

## 🔐 Authentication & Multi-Tenancy

### Identity Verification

* **JWT Strategy:** Uses Access Tokens (short-lived) and Refresh Tokens (long-lived).
* **Session Revocation:** Redis-backed versioning (`user:version:<id>`) allows for instant logout across all devices.

### Workspace Context

* **Mandatory Header:** Every protected route (except `/user/me`) requires the `x-tenant-id` header.
* **Security Handshake:** The `authenticate` middleware populates `req.authUser` with both the `userId` and the validated `tenantId`.

## 📡 API Namespaces

| Prefix | Responsibility | Key Endpoints |
| :--- | :--- | :--- |
| `/api/auth` | Identity & Session | `/login`, `/register`, `/refresh` |
| `/api/user` | Profile & Settings | `/me`, `/change-password` |
| `/api/workspaces` | Tenant Management | `/current`, `/my`, `/members` |
| `/api/ads` | AI Ad Generation | `/generate` (Future), `/history` |

## 🚀 Producer Logic (BullMQ)

The API does not perform AI generation. It validates the request and pushes a job to the `ad-generation` queue.
* **Queue Service:** `src/services/queue.service.ts`
* **Redis Config:** `src/config/redis.ts`

## 🔐 The Multi-Tenant Security Handshake
The API operates on a **Stateless Identity / Stateful Context** model:

1. **Identity**: Verified via `accessToken` (JWT) passed in the `Authorization` header.
2. **Context**: Verified via `x-tenant-id` passed in the headers.

The `authenticate` middleware populates `req.authUser` with both the userId and the `tenantId`. Every workspace-specific route performs a membership check to ensure the user actually belongs to the requested tenant.

## 📁 Directory Structure
```
/src
  ├── /config            # Environment (Zod), Redis
  ├── /middlewares       # auth.middleware, authorize.middleware, validate.middleware
  ├── /controllers       # AuthController, UserController, WorkspaceController
  ├── /services          # AuthService, TokenService, WorkspaceService, QueueService
  ├── /repositories      # Database access logic
  ├── /routes            # auth.routes, user.routes, workspace.routes
  ├── /queues            # BullMQ connection and Producer setup
  └── server.ts          # Express application entry point

```