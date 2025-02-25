// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const authToken = req.cookies.get("authToken")?.value;

  if (!authToken && req.nextUrl.pathname.startsWith("/manage")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manage/:path*"],
};
