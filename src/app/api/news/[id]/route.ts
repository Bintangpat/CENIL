import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import News from "@/models/news";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const berita = await News.findById(params.id);

    if (!berita) {
      return NextResponse.json(
        { error: "Berita tidak ditemukan." },
        { status: 404 },
      );
    }

    const beritaWithImage = {
      ...berita.toObject(),
      gambar: berita.gambar
        ? `data:${berita.gambarType};base64,${berita.gambar.toString("base64")}`
        : null,
    };

    return NextResponse.json(beritaWithImage, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal mengambil detail berita." },
      { status: 500 },
    );
  }
}
