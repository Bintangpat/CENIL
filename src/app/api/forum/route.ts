// app/api/forum/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/post";
import ChatRoom from "@/models/chatroom";

export async function GET() {
  try {
    await connectDB();

    // Ambil postingan
    const postingan = await Post.find().sort({ createdAt: -1 });
    const postWithImage = postingan.map((item) => ({
      ...item.toObject(),
      gambar: item.gambar
        ? `data:${item.gambarType};base64,${item.gambar.toString("base64")}`
        : null,
    }));

    // Ambil chatroom
    const chatrooms = await ChatRoom.find().sort({ createdAt: -1 });

    // Gabungkan response
    return NextResponse.json(
      {
        posts: postWithImage,
        chatrooms,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Forum Error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data forum" },
      { status: 500 },
    );
  }
}
