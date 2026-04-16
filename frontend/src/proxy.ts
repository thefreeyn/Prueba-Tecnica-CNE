import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAMES, ROUTES } from "@/lib/constants";

const PROTECTED_ROUTES = [ROUTES.DASHBOARD, ROUTES.ME];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtected && !accessToken) {
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === ROUTES.LOGIN && accessToken) {
    const dashboardUrl = new URL(ROUTES.DASHBOARD, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/me/:path*", "/login"],
};
