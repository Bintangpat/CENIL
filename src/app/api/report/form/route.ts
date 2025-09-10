// src/app/api/berita/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Report from "@/models/report"; // mongoose model berita

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Ambil form data
    const formData = await req.formData();
    const judul = formData.get("judul") as string;
    const penulis = formData.get("penulis") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const isi = formData.get("isi") as string;
    const gambar = formData.get("gambar") as File | null;
    const lokasi = formData.get("lokasi") as string;
    const gmapsLink = formData.get("gmapsLink") as string;

    if (!judul || !penulis || !deskripsi || !isi) {
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

    // Simpan ke MongoDB
    const berita = await Report.create({
      judul,
      penulis,
      deskripsi,
      isi,
      gambar: gambarBuffer,
      lokasi,
      gmapsLink,
      gambarType,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Berita berhasil dibuat", berita },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error POST /api/berita:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const berita = await Report.find().sort({ createdAt: -1 });
    return NextResponse.json(berita, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal mengambil berita." },
      { status: 500 },
    );
  }
}
