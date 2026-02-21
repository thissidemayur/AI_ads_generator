## Directory Strucutre:
```
/apps/worker
├── /src
│   ├── /config             # Redis connection & Env vars
│   │   ├── env.ts
│   │   └── redis.ts
│   ├── /consumers          # The "Mailmen" (One folder per queue)
│   │   ├── /email          # Current: Handles OTP & Welcomes
│   │   │   ├── email.consumer.ts
│   │   │   └── email.processor.ts
│   │   └── /ads            # Future: Handles AI Ads Generation
│   │       ├── ads.consumer.ts
│   │       └── ads.processor.ts
│   ├── /templates          # HTML/Email templates
│   ├── index.ts            # Entry point: Starts all consumers
│   └── worker.ts           # Base Worker class/wrapper
├── package.json
└── tsconfig.json

```

###  Why "Consumer" vs "Processor"?

Consumer(email.consumer.ts): this is the "Listener". It connect to BullMQ and says listening for jobs on the email-que

2. Processor(`email.processor.ts`): This is the "Doer". It contains the actual logic(eg: calling the resend api )

The Benefit: If you want to test your email logic without actually connecting to Redis, you can just test the Processor in isolation.

---

##  The Scalability Plan (Future Tasks)
When you want to add AI Ads Generation (which is heavy and slow):
- Producer (API): Your /apps/api pushes a job to ads-queue.
- Broker (Redis): Holds the prompt and user data.
- Consumer (Worker): Your /apps/worker has an ads.consumer.ts that picks it up, calls your LangChain logic, and saves the result to the DB.
