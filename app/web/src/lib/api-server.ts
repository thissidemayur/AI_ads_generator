"use server"
import { cookies } from "next/headers";
import { env } from "@/lib/env";

export async function fetchServer<T>(endpoint: string): Promise<{ data: T }> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const tenantId = cookieStore.get("activeTenantId")?.value;

  const cookieHeader = [
    accessToken ? `accessToken=${accessToken}` : "",
    refreshToken ? `refreshToken=${refreshToken}` : "",
    tenantId ? `activeTenantId=${tenantId}` : "",
  ]
    .filter(Boolean)
    .join("; ");

  const response = await fetch(`${env.NEXT_INTERNAL_EXPRESS_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, 
      Cookie: cookieHeader,
      "x-tenant-id": tenantId || "",
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    console.error(`[fetchServer] 401 Unauthorized at ${endpoint}`);
    throw new Error("AUTH_REQUIRED");
  }

  if (response.status === 403) throw new Error("FORBIDDEN");

  if (!response.ok) {
    throw new Error(`Server Fetch Failed: ${response.statusText}`);
  }

  return response.json();
}
