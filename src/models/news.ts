// src/models/berita.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IBerita extends Document {
  judul: string;
  penulis: string;
  deskripsi: string;
  isi: string;
  gambar?: Buffer;
  gambarType?: string;
  createdAt: Date;
}

const BeritaSchema = new Schema<IBerita>({
  judul: { type: String, required: true },
  penulis: { type: String, required: true },
  deskripsi: { type: String, required: true },
  isi: { type: String, required: true },
  gambar: { type: Buffer },
  gambarType: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Berita =
  mongoose.models.Berita || mongoose.model<IBerita>("Berita", BeritaSchema);

export default Berita;
