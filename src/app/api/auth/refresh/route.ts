import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refreshsecret";

export async function POST(request: Request) {
  try {
    const refreshToken = request.headers
      .get("cookie")
      ?.match(/refreshToken=([^;]+)/)?.[1];
    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token tidak ada" },
        { status: 401 },
      );
    }

    // Verifikasi refresh token
    let payload;
    try {
      payload = jwt.verify(refreshToken, REFRESH_SECRET) as any;
    } catch (err) {
      return NextResponse.json(
        { error: "Refresh token tidak valid" },
        { status: 403 },
      );
    }

    // Buat access token baru
    const newAccessToken = jwt.sign(
      { id: payload.id, name: payload.name, role: payload.role },
      JWT_SECRET,
      { expiresIn: "15m" },
    );

    const response = NextResponse.json({ accessToken: newAccessToken });

    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15, // 15 menit
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Gagal refresh token" }, { status: 500 });
  }
}
