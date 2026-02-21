import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // extract cookies
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const activeTenantId = req.cookies.get("activeTenantId")?.value;

  // define path
  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/verify-email") ||
    pathname.startsWith("/forget-password") || 
    pathname.startsWith("/reset-password");
    
    const isProtectedPage = pathname.startsWith("/dashboard")

    // Case1: user is not logged in but trying to access dashboard
    if(!refreshToken && isProtectedPage){
        const loginUrl = new URL('/login',req.url)
        loginUrl.searchParams.set("callbackUrl",pathname)
        return NextResponse.redirect(loginUrl)
    }

    //Case2:  authenticated user try to access auth page
    if(refreshToken && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Case3: Logged in but missing Tenant Context on a protected route
    // we allow request to continue , and the Server Fetcher or layout
    // will handle setting the default cookie if its truly missing



    return NextResponse.next()    
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/forget-password",
    "/reset-password",
    "/verify-email"
  ],
};
