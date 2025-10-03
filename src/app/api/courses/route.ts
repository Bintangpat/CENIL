// src/app/api/courses/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CourseContent } from "@/models/courseContent";

export async function GET() {
  await connectDB();

  try {
    const courses = await CourseContent.find().lean();

    // Normalisasi data supaya tidak ada undefined
    const safeCourses = courses.map((c) => ({
      _id: String(c._id),
      title: c.title ?? "Untitled",
      contentIds: [String(c._id)], // fallback, tiap content = 1 step
    }));

    return NextResponse.json(safeCourses);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}
