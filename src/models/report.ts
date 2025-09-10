// src/models/berita.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ILaporan extends Document {
  judul: string;
  penulis: string;
  deskripsi: string;
  isi: string;
  gambar?: Buffer;
  lokasi: string;
  gmapsLink: string;
  gambarType?: string;
  createdAt: Date;
}

const ReportSchema = new Schema<ILaporan>({
  judul: { type: String, required: true },
  penulis: { type: String, required: true },
  deskripsi: { type: String, required: true },
  isi: { type: String, required: true },
  gambar: { type: Buffer },
  lokasi: { type: String, required: true },
  gmapsLink: { type: String, required: true },
  gambarType: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Report =
  mongoose.models.Laporan || mongoose.model<ILaporan>("Laporan", ReportSchema);

export default Report;
