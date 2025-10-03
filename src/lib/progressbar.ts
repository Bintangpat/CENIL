import { CourseContent } from "@/models/courseContent";
import { UserProgress } from "@/models/userProgress";
import mongoose from "mongoose";

export async function getUserCourseProgress(userId: string, courseId: string) {
  const objectUserId = new mongoose.Types.ObjectId(userId);
  const objectCourseId = new mongoose.Types.ObjectId(courseId);

  const result = await UserProgress.aggregate([
    // 1️⃣ Filter progress berdasarkan user dan course
    {
      $match: {
        userId: objectUserId,
        courseId: objectCourseId,
      },
    },
    // 2️⃣ Hitung berapa yang sudah complete
    {
      $group: {
        _id: "$courseId",
        completed: {
          $sum: {
            $cond: [{ $eq: ["$isCompleted", true] }, 1, 0],
          },
        },
      },
    },
    // 3️⃣ Tambahkan total content dengan lookup ke CourseContent
    {
      $lookup: {
        from: "coursecontents", // nama collection di MongoDB (lowercase & plural biasanya)
        localField: "_id",
        foreignField: "courseId",
        as: "contents",
      },
    },
    // 4️⃣ Hitung total dari contents
    {
      $addFields: {
        total: { $size: "$contents" },
      },
    },
    // 5️⃣ Hitung persentase
    {
      $addFields: {
        progress: {
          $cond: [
            { $gt: ["$total", 0] },
            { $multiply: [{ $divide: ["$completed", "$total"] }, 100] },
            0,
          ],
        },
      },
    },
    // 6️⃣ Format hasil
    {
      $project: {
        _id: 0,
        courseId: "$_id",
        completed: 1,
        total: 1,
        progress: 1,
      },
    },
  ]);

  return result[0] || { courseId, completed: 0, total: 0, progress: 0 };
}
