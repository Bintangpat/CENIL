"use client";
import { useEffect, useState } from "react";
import CardCourse from "@/components/card/cardcourse";

interface Course {
  courseId: string;
  title: string;
  description: string;
  total: number;
  completed: number;
  progress: number;
}

export default function DashboardEducation() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/progress");
        const data = await res.json();
        console.log("Courses data:", data);
        setCourses(data || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-2xl font-bold">📚 Dashboard Education</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {courses.map((course) => (
          <CardCourse
            key={course.courseId}
            courseId={course.courseId}
            title={course.title}
            description={course.description}
            total={course.total}
            completed={course.completed}
          />
        ))}
      </div>
    </div>
  );
}
