import { useQuery } from "@tanstack/react-query";

interface DashboardData {
  laporan: { total: number; unread: number; pending: number; done: number };
  berita: { total: number };

  postingan: { total: number };
}

export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard");
      if (!res.ok) throw new Error("Failed to fetch dashboard data");
      return res.json();
    },
    staleTime: 1000 * 60, // cache 1 menit
  });
}
