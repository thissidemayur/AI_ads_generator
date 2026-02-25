import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname, searchParams } = req.nextUrl;

  const isAuthRoute = pathname.startsWith("/auth");
  const isProtectedRoute = pathname.startsWith("/dashboard");
  const hasError = searchParams.has("error");

  if (isAuthRoute) {
    if (accessToken && !hasError) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (!isProtectedRoute) return NextResponse.next();

  // only refresh if access is missing but refresh is present
  if (!accessToken && refreshToken) {
    try {
      const response = await fetch(
        `${process.env.NEXT_INTERNAL_EXPRESS_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `refreshToken=${refreshToken}`,
          },
        },
      );

      if (response.ok) {
        const result = await response.json();
        const nextResponse = NextResponse.next();
        nextResponse.cookies.set("accessToken", result.data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 15 * 60,
          path: "/",
        });
        return nextResponse;
      }
    } catch (e) {
      console.error("Refresh failed", e);
    }
  }

  // 3. Absolute Fallback
  if (!accessToken && !refreshToken) {
    const loginURL = new URL("/auth/login", req.url);
    loginURL.searchParams.set("error", "session_expired");
    return NextResponse.redirect(loginURL);
  }

  return NextResponse.next();
}
