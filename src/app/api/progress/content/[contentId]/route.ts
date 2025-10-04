// src/app/api/progress/content/[contentId]/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { getAuthData } from "@/lib/auth";
import UserProgress from "@/models/userProgress";
import CourseContent from "@/models/courseContent";

export async function PUT(
  req: Request,
  context: { params: Promise<{ contentId: string }> }, // ✅ params harus async
) {
  await connectDB();

  const { user } = await getAuthData();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ tunggu params
  const { contentId } = await context.params;
  if (!contentId || !/^[0-9a-fA-F]{24}$/.test(contentId)) {
    return NextResponse.json({ error: "Invalid contentId" }, { status: 400 });
  }

  const body = await req.json();

  try {
    // pastikan contentId valid di CourseContent
    const content = await CourseContent.findById(contentId);
    if (!content) {
      return NextResponse.json(
        { error: "Course content not found" },
        { status: 404 },
      );
    }

    // update progress untuk user ini
    const updated = await UserProgress.findOneAndUpdate(
      {
        contentId: new mongoose.Types.ObjectId(contentId),
        userId: new mongoose.Types.ObjectId(user.id),
      },
      {
        isCompleted: body.isCompleted ?? true,
        completedAt: body.isCompleted ? new Date() : null,
      },
      { new: true, upsert: true }, // ✅ upsert biar kalau belum ada, dibuat
    );

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("PUT /progress/content error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
