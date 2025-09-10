// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/user";
import { cookies } from "next/headers";
import { comparePassword, signJWT } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Untuk keamanan, berikan pesan error yang umum
      return NextResponse.json(
        { error: "Email atau password salah." },
        { status: 401 },
      );
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Email atau password salah." },
        { status: 401 },
      );
    }
    console.log("Creating token for user:", user.email);
    const token = await signJWT({
      name: user.name,
      id: user._id,
      email: user.email,
      role: user.role,
      phonenumber: user.phonenumber,
    });

    // Buat respons sukses dan tambahkan cookie httpOnly
    const response = NextResponse.json(
      {
        message: "Login berhasil",
        user: {
          role: user.role,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 hari
    });

    return response;
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
