"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CardProgressProps {
  courseContentTitle: string;
  completed: number;
  total: number;
  courseId: string;
  contentIdList: string[];
  onProgressUpdate?: () => void; // callback setelah update
}

export default function CardProgress({
  courseContentTitle,
  completed,
  total,
  contentIdList,
  onProgressUpdate,
}: CardProgressProps) {
  const [localCompleted, setLocalCompleted] = useState(completed);

  const percentage = total > 0 ? (localCompleted / total) * 100 : 0;

  const markComplete = async (contentId: string) => {
    try {
      const res = await fetch(`/api/progress/content/${contentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: true }),
      });

      if (res.ok) {
        setLocalCompleted((prev) => prev + 1);
        onProgressUpdate?.();
      } else {
        console.error("Failed to update progress", await res.json());
      }
    } catch (err) {
      console.error("Failed to update progress:", err);
    }
  };

  return (
    <Card className="rounded-lg p-4 shadow-md">
      <CardHeader>
        <CardTitle>{courseContentTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground mb-2 text-sm">
          Progress: {localCompleted} / {total}
        </div>
        <Progress value={percentage} className="mb-4" />
        <div className="flex flex-wrap gap-2">
          {contentIdList.map((id) => (
            <button
              key={id}
              onClick={() => markComplete(id)}
              className="rounded bg-indigo-500 px-2 py-1 text-white hover:bg-indigo-600"
            >
              Tandai selesai ({id.slice(-4)})
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
