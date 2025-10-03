// src/models/userProgress.ts
import mongoose, { Schema, models } from "mongoose";

const userProgressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  contentId: {
    type: Schema.Types.ObjectId,
    ref: "CourseContent",
    required: true,
  },
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date },
  courseId: { type: Schema.Types.ObjectId, ref: "Course" }, // ✅ tambahkan courseId biar query by course gampang
});

export const UserProgress =
  models.UserProgress || mongoose.model("UserProgress", userProgressSchema);
