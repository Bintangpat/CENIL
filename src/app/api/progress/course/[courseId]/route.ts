// src/app/api/progress/course/[courseId]/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { getAuthData } from "@/lib/auth";
import CourseContent from "@/models/courseContent";
import UserProgress from "@/models/userProgress";

export async function GET(
  req: Request,
  context: { params: { courseId: string } },
) {
  await connectDB();

  const { user } = await getAuthData();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { courseId } = await context.params;
  if (!courseId || !/^[0-9a-fA-F]{24}$/.test(courseId)) {
    return NextResponse.json({ error: "Invalid courseId" }, { status: 400 });
  }

  try {
    const objCourseId = new mongoose.Types.ObjectId(courseId);
    const objUserId = new mongoose.Types.ObjectId(user.id);

    // Get course contents and left join progress for this user
    const pipeline = [
      { $match: { courseId: objCourseId } },
      {
        $lookup: {
          from: "userprogresses",
          let: { contentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$contentId", "$$contentId"] },
                    { $eq: ["$userId", objUserId] },
                  ],
                },
              },
            },
            { $project: { isCompleted: 1, completedAt: 1, _id: 0 } },
          ],
          as: "progress",
        },
      },
      {
        $project: {
          _id: { $toString: "$_id" },
          title: 1,
          type: 1,
          courseId: { $toString: "$courseId" },
          isCompleted: {
            $cond: [
              { $gt: [{ $size: "$progress" }, 0] },
              { $arrayElemAt: ["$progress.isCompleted", 0] },
              false,
            ],
          },
          completedAt: {
            $cond: [
              { $gt: [{ $size: "$progress" }, 0] },
              { $arrayElemAt: ["$progress.completedAt", 0] },
              null,
            ],
          },
        },
      },
    ];

    const items = await CourseContent.aggregate(pipeline);

    return NextResponse.json({ courseId, contents: items });
  } catch (err) {
    console.error("GET /api/progress/course/[courseId] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
