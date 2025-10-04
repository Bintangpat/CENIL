// src/models/berita.ts
import mongoose, { Schema, Document, Types } from "mongoose";

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
  updatedAt: Date;
  status: "unread" | "pending" | "done"; // ENUM / String
  isDeleted: Boolean; // optional: untuk soft delete
  createdBy: Types.ObjectId;
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
  status: {
    type: String,
    enum: ["belum dibaca", "dalam proses", "selesai"],
    required: true,
  },
  updatedAt: { type: Date, required: true },
  isDeleted: { type: Boolean, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "user", requirerd: true },
});

const Report =
  mongoose.models.Laporan || mongoose.model<ILaporan>("Laporan", ReportSchema);

export default Report;
