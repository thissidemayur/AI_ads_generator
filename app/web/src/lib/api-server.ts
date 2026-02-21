import { cookies } from "next/headers";
import { env } from "@/lib/env";

export async function fetchServer<T>(endpoint: string): Promise<{ data: T }> {
  const cookieStore = await cookies();

  // Forward all cookies so Express sees the refreshToken and activeTenantId
  const cookieHeader = cookieStore.toString();
  const response = await fetch(`${env.INTERNAL_EXPRESS_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
      "Content-Type": "application/json",
      // We manually add the tenant header from the cookie for Strategy B
      "x-tenant-id": cookieStore.get("activeTenantId")?.value || "",
    },
    // Prevent Next.js from caching stale user data
    cache: "no-store",
  });

        console.log("Server Response: ");


 if (response.status === 401) {
   throw new Error("AUTH_REQUIRED");
 }
 if (response.status === 403) {
   throw new Error("FORBIDDEN");
 }


  if (!response.ok) {
    throw new Error(`Server Fetch Failed: ${response.statusText}`);
  }

  return response.json();
}
