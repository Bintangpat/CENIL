import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import News from "@/models/report";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ tunggu params
    const berita = await News.findById(id);

    if (!berita) {
      return NextResponse.json(
        { error: "Berita tidak ditemukan." },
        { status: 404 },
      );
    }

    // findById hasilnya cuma 1 dokumen, bukan array
    const beritaWithImage = {
      ...berita.toObject(),
      gambar: berita.gambar ? berita.gambar : null,
      gambarType: berita.gambarType || null,
    };

    return NextResponse.json(beritaWithImage, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal mengambil detail berita." },
      { status: 500 },
    );
  }
}
