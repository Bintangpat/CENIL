// app/api/auth/logout/route.ts
import { cookieOptions } from "@/lib/CookieOptions";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logout berhasil" });

    // hapus cookie "token"
    response.cookies.set("token", "", {
      ...cookieOptions,
      expires: new Date(0), // expired
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Gagal logout" }, { status: 500 });
  }
}
