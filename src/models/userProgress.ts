// models/UserProgress.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  contentId: mongoose.Types.ObjectId;
  status: "not_started" | "in_progress" | "completed";
  completedAt?: Date;
}

const UserProgressSchema = new Schema<IUserProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    contentId: {
      type: Schema.Types.ObjectId,
      ref: "CourseContent",
      required: true,
    },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },
    completedAt: { type: Date },
  },
  { timestamps: true },
);

UserProgressSchema.index({ userId: 1, contentId: 1 }, { unique: true });

export default mongoose.models.UserProgress ||
  mongoose.model<IUserProgress>("UserProgress", UserProgressSchema);
