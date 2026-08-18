import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/jwt";

const VISITOR_COOKIE = "vz_vid";
const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function proxy(request, event) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/admin") || pathname.startsWith("/admin")) {
    return handleAdminGate(request, pathname);
  }

  return handleVisitorTracking(request, event, pathname);
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

function handleVisitorTracking(request, event, pathname) {
  const response = NextResponse.next();

  let visitorId = request.cookies.get(VISITOR_COOKIE)?.value;
  const isNewVisitor = !visitorId;
  if (isNewVisitor) {
    visitorId = crypto.randomUUID();
    response.cookies.set(VISITOR_COOKIE, visitorId, {
      maxAge: VISITOR_COOKIE_MAX_AGE,
      sameSite: "lax",
      path: "/",
    });
  }

  const trackUrl = new URL("/api/track", request.url);
  event.waitUntil(
    fetch(trackUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": request.headers.get("x-forwarded-for") || "",
        "x-real-ip": request.headers.get("x-real-ip") || "",
        "user-agent": request.headers.get("user-agent") || "",
        referer: request.headers.get("referer") || "",
      },
      body: JSON.stringify({ path: pathname, visitorId, isNewVisitor }),
    }).catch((err) => console.error("Visitor tracking request failed:", err))
  );

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|admin|products/|images/|pdf/|file.svg|globe.svg|next.svg|vercel.svg|window.svg).*)",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
