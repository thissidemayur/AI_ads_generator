# Backend Worker Service (`apps/worker`)

The **Worker** is a dedicated Consumer service responsible for handling long-running, resource-intensive, or asynchronous tasks. By offloading these tasks from the main Express API, we ensure that the user interface remains snappy and the API remains responsive.

---

## 🏗️ Role in the Ecosystem

The Worker operates on a **Producer-Consumer** model using **BullMQ** and **Redis**:

1. **Producer (API):** Validates the request and pushes a "Job" into the queue.
2. **Broker (Redis):** Stores the job safely until a worker is available.
3. **Consumer (Worker):** Picks up the job and executes the heavy lifting (Emailing/AI).

---

## 📁 Directory Structure

```
/apps/worker
├── /src
│   ├── /config             # Infrastructure & Client initialization
│   │   ├── env.ts          # Zod-validated environment variables
│   │   ├── redis.ts        # Connection logic for BullMQ/IORedis
│   │   └── resend.ts       # Resend.com SDK configuration
│   ├── /consumers          # Queue Listeners & Logic (One folder per queue)
│   │   ├── /email          # Handles OTP, Verification, & Welcome mails
│   │   │   ├── email.consumer.ts   # The "Listener" (BullMQ Worker instance)
│   │   │   └── email.processor.ts  # The "Doer" (Business logic execution)
│   │   ├── /ads            # (Planned) AI Ad generation logic
│   │   │   ├── ads.consumer.ts
│   │   │   └── ads.processor.ts
│   │   └── index.ts        # Centralized export/startup for all consumers
│   ├── /templates          # Dynamic HTML/Text content builders
│   │   └── email.template.ts 
│   ├── worker.ts           # Base Worker class/wrapper
│   └── index.ts            # Entry point: Connects and starts the process
├── package.json
└── tsconfig.json
```

---

## 🧩 The "Consumer" vs. "Processor" Pattern

We decouple the communication from the execution to ensure the code is testable and resilient.

* **Consumer (`email.consumer.ts`):** This is the **Listener**. It connects to BullMQ and manages the lifecycle of the job (logging, progress tracking, and error events).
* **Processor (`email.processor.ts`):** This is the **Doer**. It contains the actual business logic (e.g., calling the Resend API).

> **Architectural Benefit:** This separation allows you to test your business logic (the Processor) in isolation without needing a live Redis connection or BullMQ environment.

---

## 📩 Current Implementation: Email Service

The Worker currently handles transactional email delivery via **Resend**.

* **Job Types:** `SEND_OTP`, `WELCOME_EMAIL`, `VERIFICATION_LINK`.
* **Resiliency:** If the Resend API is down, BullMQ handles the retry logic (exponential backoff) automatically, ensuring no user ever misses a verification code.

---

## 🤖 The Scalability Plan (AI Ad Generation)

When we implement the AI Ad Generator, we follow the same predictable flow:

1. **The Producer (API):** Pushes the ad prompt and parameters to the `ads-queue`.
2. **The Consumer (Worker):** Picks up the job and passes it to a specialized **LangChain** processor.
3. **The Persistence:** Once the AI finishes, the worker updates the database with the result and notifies the user via WebSockets or Email.
