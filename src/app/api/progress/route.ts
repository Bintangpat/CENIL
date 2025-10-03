//srv/app/api/progress/route.ts

import { NextResponse } from "next/server";
import { connectDB as dbConnect } from "@/lib/db";
import { UserProgress } from "@/models/userProgress";
import { getAuthData } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  try {
    const { user } = await getAuthData();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const progresses = await UserProgress.aggregate([
      { $match: { userId: user.id } },
      {
        $group: {
          _id: "$courseId",
          completed: { $sum: { $cond: ["$isCompleted", 1, 0] } },
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          courseId: "$_id",
          completed: 1,
          total: 1,
          _id: 0,
        },
      },
    ]);

    return NextResponse.json(progresses);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}
