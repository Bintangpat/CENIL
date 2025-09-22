"use client";

import { useAuth } from "@/context/AuthContext";
import { Progress } from "@/components/ui/progress";

export default function DashboardEducation() {
  const { user } = useAuth();
  return (
    <div className="p-4">
      none
      <Progress value={45} color="" className="w-56" />
    </div>
  );
}
