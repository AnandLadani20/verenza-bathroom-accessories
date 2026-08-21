import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/jwt";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  return handleAdminGate(request, pathname);
}

function handleAdminGate(request, pathname) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const payload = token ? verifyAdminToken(token) : null;
  const isLoginPath = pathname === "/admin/login" || pathname === "/api/admin/login";

  if (pathname.startsWith("/api/admin")) {
    if (!isLoginPath && !payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (isLoginPath) {
    if (payload) return NextResponse.redirect(new URL("/admin", request.url));
    return NextResponse.next();
  }

  if (!payload) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
