import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin/helpers") || pathname.startsWith("/admin/maids")) {
    const session = request.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // Keep legacy URL working but remove "maids" from the admin path.
    if (pathname.startsWith("/admin/maids")) {
      return NextResponse.redirect(new URL("/admin/helpers", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/helpers/:path*", "/admin/maids/:path*"],
};

