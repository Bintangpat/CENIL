import { NextResponse } from "next/server";
import { CourseContent } from "@/models/courseContent";
import { UserProgress } from "@/models/userProgress";
import { connectDB } from "@/lib/db";
import { getAuthData } from "@/lib/auth";
import { UserPayload } from "@/types/auth";

export async function GET(
  req: Request,
  { params }: { params: { courseId?: string } },
) {
  await connectDB();

  const { user } = await getAuthData();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const courseId = params.courseId;
  if (!courseId) {
    return NextResponse.json({ error: "courseId required" }, { status: 400 });
  }

  if (!/^[0-9a-fA-F]{24}$/.test(courseId)) {
    return NextResponse.json(
      { error: "Invalid courseId format" },
      { status: 400 },
    );
  }

  const totalContent = await CourseContent.countDocuments({ courseId });
  const completed = await UserProgress.countDocuments({
    userId: user.id, // ✅ konsisten dengan payload
    isCompleted: true,
    courseId,
  });

  const progress = totalContent > 0 ? (completed / totalContent) * 100 : 0;

  return NextResponse.json({
    courseId,
    userId: user.id, // ✅ pakai id, bukan _id
    progress,
    completed,
    total: totalContent,
  });
}
