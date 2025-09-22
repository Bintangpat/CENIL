import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ChatRoom from "@/models/chatroom";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, createdBy } = await req.json();

    if (!name || !createdBy) {
      return NextResponse.json(
        { error: "Nama obrolan dan pembuat wajib diisi" },
        { status: 400 },
      );
    }

    // buat obrolan baru
    const room = await ChatRoom.create({
      name,
      createdBy,
      members: [createdBy],
    });

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error("API ChatRoom Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat membuat obrolan" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const rooms = await ChatRoom.find();
    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil daftar obrolan" },
      { status: 500 },
    );
  }
}
