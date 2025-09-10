import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/user";
import { hashPassword } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password, role, phonenumber } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(password);

    console.log("Creating user:", { name, email });
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phonenumber,
    });
    console.log("User created:", newUser._id);

    return NextResponse.json(
      {
        message: "User berhasil dibuat",
        user: { id: newUser._id, email: newUser.email },
      },
      { status: 201 },
    );
  } catch (err: any) {
    console.error("Signup error:", err); // <-- penting
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
