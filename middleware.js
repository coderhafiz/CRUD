import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (
    req.nextUrl.pathname.startsWith("/dashboard/admin") &&
    req.auth.user.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/dashboard/:path*"], // Protects all routes under /dashboard
};
