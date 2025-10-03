import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "@/lib/utils";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // kalau tidak ada token
  if (!token) {
    return pathname.startsWith("/api")
      ? NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      : NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // verifikasi token
  const decoded: any = verifyJWT(token);
  if (!decoded) {
    return pathname.startsWith("/api")
      ? NextResponse.json({ message: "Invalid Token" }, { status: 401 })
      : NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // cek role admin
  if (pathname.startsWith("/admin") && decoded.role !== "admin") {
    return pathname.startsWith("/api")
      ? NextResponse.json({ message: "Forbidden" }, { status: 403 })
      : NextResponse.redirect(new URL("/403", req.url)); // bikin page 403
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/api/auth/me",
    "/api/admin/:path*",
  ],
};
