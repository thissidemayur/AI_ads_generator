## Directory Structre
```
/apps/web (Next.js - :3000)
├── /src
│   ├── /app
│   │   ├── /(auth)/login/page.tsx   # Login Page (Server Component)
│   │   ├── /(dashboard)/layout.tsx  # Dashboard Wrapper (Server Component)
│   ├── /actions
│   │   └── auth.ts                  # ⚡ The "Bridge" (Server Actions)
│   ├── /features/auth
│   │   ├── /components/LoginForm.tsx
│   │   ├── /hooks/useLogin.ts       # React Hook Form + Zustand
│   │   └── auth.service.ts          # Universal API caller
│   ├── /store/authStore.ts          # Zustand (In-Memory AccessToken)
│   └── middleware.ts                # The Security Guard

```

```
// apps/web/app/(dashboard)/layout.tsx
"use client";

import { useEffect } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { api } from "@/lib/axios";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { setWorkspaces, setActiveWorkspace, currentWorkspace } = useWorkspaceStore();

  useEffect(() => {
    const initWorkspaces = async () => {
      const { data } = await api.get("/workspaces/my");
      setWorkspaces(data.workspaces);

      // If no workspace is active, set the first one as default
      if (!currentWorkspace && data.workspaces.length > 0) {
        setActiveWorkspace(data.workspaces[0].tenant, data.workspaces[0].role);
      }
    };

    initWorkspaces();
  }, []);

  return <div className="flex h-screen">{children}</div>;
}

```
```
// apps/web/app/(dashboard)/layout.tsx
"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    // If user is logged in but hasn't set their name yet, force them to onboarding
    if (user && !user.firstName) {
      router.replace("/onboarding");
    }
  }, [user, router]);

  return <>{children}</>;
}
```
