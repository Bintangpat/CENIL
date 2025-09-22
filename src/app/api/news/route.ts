//src/api/news/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; // pastikan kamu sudah punya helper connectDB
import News from "@/models/news";

export async function GET() {
  try {
    await connectDB();
    const berita = await News.find().sort({ createdAt: -1 });

    const newsWithImage = berita.map((item) => ({
      ...item.toObject(),
      gambar: item.gambar
        ? `data:${item.gambarType};base64,${item.gambar.toString("base64")}`
        : null,
    }));

    return NextResponse.json(newsWithImage, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal mengambil post." },
      { status: 500 },
    );
  }
}
