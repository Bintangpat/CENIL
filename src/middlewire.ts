// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "@/lib/utils";

const protectedRoutes = ["/dashboard", "/profile", "/api/auth/me"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // cek token
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) ||
    pathname.startsWith("/admin")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const decoded: any = verifyJWT(token);
    if (!decoded) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }

    // otorisasi role
    if (pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*", // <— tambahkan
    "/api/auth/me",
    "/api/admin/:path*",
  ],
};
