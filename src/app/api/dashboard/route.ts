import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; // fungsi connect ke MongoDB
import Laporan from "@/models/report";
import Berita from "@/models/news";
import Postingan from "@/models/post";

export async function GET() {
  await connectDB();

  const laporanTotal = await Laporan.countDocuments();
  const laporanUnread = await Laporan.countDocuments({ status: "unread" });
  const laporanPending = await Laporan.countDocuments({ status: "pending" });
  const laporanDone = await Laporan.countDocuments({ status: "done" });

  const beritaTotal = await Berita.countDocuments();

  const postinganTotal = await Postingan.countDocuments();

  return NextResponse.json({
    laporan: {
      total: laporanTotal,
      unread: laporanUnread,
      pending: laporanPending,
      done: laporanDone,
    },
    berita: { total: beritaTotal },

    postingan: { total: postinganTotal },
  });
}
