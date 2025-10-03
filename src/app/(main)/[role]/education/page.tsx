"use client";

import { useEffect, useState } from "react";
import CardProgress from "@/components/card/cardprogress";

interface Course {
  _id: string;
  title: string;
  contentIds: string[];
}

interface Progress {
  courseId: string;
  completed: number;
  total: number;
}

export default function DashboardEducation() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [progresses, setProgresses] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setCourses([]);
    }
  };

  const fetchProgresses = async () => {
    try {
      const res = await fetch("/api/progress");
      const data = await res.json();
      setProgresses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching progress:", err);
      setProgresses([]);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchCourses(), fetchProgresses()]);
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => {
        const progress = progresses.find((p) => p.courseId === course._id);

        return (
          <CardProgress
            key={course._id}
            courseTitle={course.title ?? "Tanpa Judul"}
            completed={progress?.completed ?? 0}
            total={progress?.total ?? course.contentIds?.length ?? 0}
            courseId={course._id}
            contentIdList={course.contentIds ?? []}
            onProgressUpdate={fetchProgresses} // callback untuk refresh
          />
        );
      })}
    </div>
  );
}
