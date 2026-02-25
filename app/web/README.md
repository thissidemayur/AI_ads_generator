# 🚀 Overview

A professional, high-performance dashboard built with **Next.js (App Router)** and **Tailwind CSS**. This application serves as a "context-aware" interface for AI Ad generation, optimized for **Core Web Vitals (Lighthouse)** and **SEO** through aggressive server-side pre-population.

---

# 🏗️ Architecture: Performance & Logic Separation

### 1. The Server-First Handshake

We utilize **Next.js Server Actions** for all authentication and workspace mutations. This allows our `DashboardLayout` to be pre-populated on the server.

* **SEO & UX:** Users never see "loading spinners" for their profile or workspace data; the HTML arrives fully formed.
* **Lighthouse:** Minimizes **Total Blocking Time (TBT)** and **Largest Contentful Paint (LCP)** by reducing client-side fetching.

### 2. Form Logic: The "Hook-Action" Pattern

To maintain a clean codebase, we decouple UI from Business Logic using custom hooks:

* **The Component:** Only cares about fields and layout ([Shadcn/UI](https://ui.shadcn.com)).
* **The Hook:** A custom wrapper around `useForm` ([React Hook Form](https://react-hook-form.com)) that handles the `onSubmit` logic, validation ([Zod](https://zod.dev)), and triggers the Server Action.
* **The Action:** Communicates with the Backend Express API and manages the cookie store.

---

# 📁 Directory Structure

```plaintext
/src
  ├── /app               # Next.js App Router (Layouts, Pages, Server-side Redirects)
  ├── /components        # Atomic UI components (Shadcn/UI, Shared design tokens)
  ├── /features          # Domain-Specific Modules (The "Feature-Based" Pattern)
  │   ├── /auth          # Auth forms, auth-specific hooks, and Server Actions
  │   ├── /dashboard     # Sidebar, Header, and Workspace-aware layouts
  │   └── /ads           # Ad generator logic (Business Logic + AI Forms)
  ├── /hooks             # Reusable RHF wrappers and UI logic
  ├── /lib               # api-server (fetchServer), env.ts, and core utilities
  ├── /services          # API client wrappers for client-side interactions
  ├── /store             # Zustand stores (Client-side UI state only)
  └── /middleware.ts     # Global Session & Multi-tenant context protection
