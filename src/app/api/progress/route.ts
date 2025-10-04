// src/app/api/progress/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { getAuthData } from "@/lib/auth";
import Course from "@/models/course";
import CourseContent from "@/models/courseContent";

export async function GET() {
  await connectDB();

  const { user, error } = await getAuthData();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Aggregate per Course: total contents & completed by this user
    const objectUserId = new mongoose.Types.ObjectId(user.id);

    const pipeline = [
      // Start from Course collection
      {
        $lookup: {
          from: "coursecontents",
          localField: "_id",
          foreignField: "courseId",
          as: "contents",
        },
      },
      {
        $addFields: {
          total: { $size: "$contents" },
        },
      },
      // Lookup completed user progress for this course
      {
        $lookup: {
          from: "userprogresses",
          let: { courseId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$courseId", "$$courseId"] },
                    { $eq: ["$userId", objectUserId] },
                    { $eq: ["$isCompleted", true] },
                  ],
                },
              },
            },
          ],
          as: "userCompleted",
        },
      },
      {
        $addFields: {
          completed: { $size: "$userCompleted" },
        },
      },
      {
        $project: {
          _id: 0,
          courseId: { $toString: "$_id" },
          title: "$title",
          description: "$description",
          total: 1,
          completed: 1,
          progress: {
            $cond: [
              { $gt: ["$total", 0] },
              { $multiply: [{ $divide: ["$completed", "$total"] }, 100] },
              0,
            ],
          },
        },
      },
    ];

    const rows = await Course.aggregate(pipeline);

    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/progress error:", err);
    return NextResponse.json([], { status: 500 });
  }
}
