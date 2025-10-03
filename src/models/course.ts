// src/models/course.ts
import mongoose, { Schema, models } from "mongoose";

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Course = models.Course || mongoose.model("Course", courseSchema);
