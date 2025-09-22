//src/api/news/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; // pastikan kamu sudah punya helper connectDB
import Report from "@/models/report";

export async function GET() {
  try {
    await connectDB();
    const report = await Report.find().sort({ createdAt: -1 });

    const newsWithImage = report.map((item) => ({
      ...item.toObject(),
      gambar: item.gambar
        ? `data:${item.gambarType};base64,${item.gambar.toString("base64")}`
        : null,
    }));

    return NextResponse.json(newsWithImage, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal mengambil laporan." },
      { status: 500 },
    );
  }
}
