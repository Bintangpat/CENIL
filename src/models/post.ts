import mongoose, { Schema, Document } from "mongoose";

export interface IPostingan extends Document {
  isi: string;
  penulis: string;
  gambar?: Buffer;
  gambarType?: string;
  createdAt: Date;
}

const PostinganSchema = new Schema<IPostingan>({
  isi: { type: String, required: true },
  penulis: { type: String, required: true },
  gambar: { type: Buffer }, // ✅ simpan binary
  gambarType: { type: String }, // ✅ simpan type MIME (misalnya "image/png")
  createdAt: { type: Date, default: Date.now },
});

const Post =
  mongoose.models.Postingan ||
  mongoose.model<IPostingan>("Postingan", PostinganSchema);

export default Post;
