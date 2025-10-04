import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Report from "@/models/report";

// GET detail laporan
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();

    const { id } = params;
    const laporan = await Report.findById(id);

    if (!laporan) {
      return NextResponse.json(
        { error: "Laporan tidak ditemukan." },
        { status: 404 },
      );
    }

    const laporanWithImage = {
      ...laporan.toObject(),
      gambar: laporan.gambar ? laporan.gambar : null,
      gambarType: laporan.gambarType || null,
    };

    return NextResponse.json(laporanWithImage, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil detail laporan." },
      { status: 500 },
    );
  }
}

// PUT update status laporan
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const { id } = params;

    const body = await req.json();
    const { status } = body;

    // validasi status
    const allowedStatus = ["belum dibaca", "dalam proses", "selesai"];
    if (!status || !allowedStatus.includes(status)) {
      return NextResponse.json(
        { error: "Status tidak valid." },
        { status: 400 },
      );
    }

    const updated = await Report.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Laporan tidak ditemukan." },
        { status: 404 },
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengubah status laporan." },
      { status: 500 },
    );
  }
}
