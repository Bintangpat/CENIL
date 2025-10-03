//src/app/api/progress/course/[courseId]/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthData } from "@/lib/auth";
import { getUserCourseProgress } from "@/lib/progressbar";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  await connectDB();

  const { user } = await getAuthData();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const progress = await getUserCourseProgress(user.id, params.courseId);

  return NextResponse.json(progress);
}
