import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authPages = ["/login", "/register/customer", "/register/provider", "/admin/login", "/admin/verify-otp", "/forgot-password"];

const adminPages = ["/admin/dashboard", "/admin/users", "/admin/reports", "/admin/categories", "/admin/audit-logs"];


const publicPages = ["/", "/jobs", "/providers"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");

  // Check cookies
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const adminToken = isAdminRoute ? request.cookies.get("admin_refresh_token")?.value : undefined;

  // Redirect logged-in users away from auth pages
  if (authPages.some((path) => pathname.startsWith(path))) {
    if (adminToken && isAdminRoute) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    if (refreshToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protect admin pages
  if (adminPages.some((path) => pathname.startsWith(path))) {
    if (!adminToken) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("admin_refresh_token");
      return response;
    }
    return NextResponse.next();
  }

  // Public pages - allow all
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};