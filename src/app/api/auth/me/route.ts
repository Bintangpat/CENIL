import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/user";
import { verifyJWT } from "@/lib/utils";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    await connectDB();
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Token tidak ditemukan" },
        { status: 401 },
      );
    }

    const payload = verifyJWT(token) as { id: string; email: string };
    if (!payload) {
      return NextResponse.json({ error: "Token tidak valid" }, { status: 401 });
    }

    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({ user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
