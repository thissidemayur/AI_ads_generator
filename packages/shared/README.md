```
/packages/shared
├── /prisma
│   └── schema.prisma     # The "Source of Truth" for your DB
├── /src
│   ├── /http
│   │   ├── apiError.ts   # Error class you just tested
│   │   ├── apiResponse.ts
│   │   └── asyncHandler.ts
│   ├── /types
│   │   ├── auth.types.ts # User & Tenant Interfaces
│   │   └── index.ts      # Export all types
│   ├── /database
│   │   └── index.ts      # Exports the generated Prisma Client
│   └── index.ts          # MAIN EXPORT BARREL
├── package.json
└── tsconfig.json

```