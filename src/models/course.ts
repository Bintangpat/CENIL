// models/Course.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  contents: mongoose.Types.ObjectId[]; // relasi ke CourseContent
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String },
    contents: [{ type: Schema.Types.ObjectId, ref: "CourseContent" }],
  },
  { timestamps: true },
);

export default mongoose.models.Course ||
  mongoose.model<ICourse>("Course", CourseSchema);
