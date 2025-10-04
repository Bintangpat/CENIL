// models/CourseContent.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICourseContent extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  type: "video" | "article" | "quiz"; // opsional
  order: number; // urutan dalam course
}

const CourseContentSchema = new Schema<ICourseContent>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["video", "article", "quiz"],
      default: "article",
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.models.CourseContent ||
  mongoose.model<ICourseContent>("CourseContent", CourseContentSchema);
