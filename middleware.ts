import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect legacy admin URL
  if (pathname.startsWith("/admin/maids")) {
    return NextResponse.redirect(new URL("/admin/helpers", request.url));
  }

  // Protect admin routes
  if (pathname.startsWith("/admin/helpers")) {
    const session = request.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/maids/:path*", "/admin/helpers/:path*"],
};

