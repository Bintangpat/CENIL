// src/models/courseContent.ts
import mongoose, { Schema, models } from "mongoose";

const courseContentSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["video", "quiz", "article"], required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
});

export const CourseContent =
  models.CourseContent || mongoose.model("CourseContent", courseContentSchema);
