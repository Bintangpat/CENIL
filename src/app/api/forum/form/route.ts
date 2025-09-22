import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/post";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    const penulis = formData.get("penulis") as string;
    const isi = formData.get("isi") as string;
    const gambar = formData.get("gambar") as File | null;

    if (!penulis || !isi) {
      return NextResponse.json(
        { error: "Semua field harus diisi." },
        { status: 400 },
      );
    }

    let gambarBuffer: Buffer | undefined;
    let gambarType: string | undefined;

    if (gambar) {
      const bytes = await gambar.arrayBuffer();
      gambarBuffer = Buffer.from(bytes);
      gambarType = gambar.type;
    }

    const post = await Post.create({
      penulis,
      isi,
      gambar: gambarBuffer,
      gambarType,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Post berhasil dibuat", post },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error POST /api/forum/form:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
