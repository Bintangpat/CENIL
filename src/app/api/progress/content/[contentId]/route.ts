// src/app/api/progress/content/[contentId]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UserProgress } from "@/models/userProgress";
import { getAuthData } from "@/lib/auth";
import mongoose from "mongoose";

export async function PUT(
  req: Request,
  context: { params: { contentId: string } },
) {
  await connectDB();

  const { user } = await getAuthData();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ tunggu params sebelum menggunakannya
  const { contentId } = await context.params;

  try {
    const updated = await UserProgress.findOneAndUpdate(
      {
        contentId: new mongoose.Types.ObjectId(contentId),
        userId: new mongoose.Types.ObjectId(user.id),
      },
      {
        isCompleted: true,
        completedAt: new Date(),
      },
      { new: true },
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Progress not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      id: String(updated._id),
      courseId: String(updated.courseId),
      contentId: String(updated.contentId),
      isCompleted: updated.isCompleted,
      completedAt: updated.completedAt,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 },
    );
  }
}
