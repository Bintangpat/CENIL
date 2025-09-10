"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardReport, CardReportProps } from "@/components/cardreport";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const DashboardReport: React.FC = () => {
  const { user, loading } = useAuth();
  const [reportData, setReportData] = useState<CardReportProps[]>([]);
  const [loadingReport, setLoadingReport] = useState(true);

  useEffect(() => {
    // fetch berita
    async function fetchReport() {
      try {
        const res = await fetch("/api/report");
        if (res.ok) {
          const data = await res.json();
          setReportData(data);
        }
      } catch (err) {
        console.error("Gagal fetch berita:", err);
      } finally {
        setLoadingReport(false);
      }
    }
    fetchReport();
  }, []);
  if (loading)
    return (
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <h1 className="text-accent-foreground text-2xl font-bold">
          Loading data
        </h1>
        <p className="text-accent-foreground text-base">Mohon tunggu</p>
      </div>
    );
  if (!user)
    return (
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <h1 className="text-accent-foreground text-2xl font-bold">
          Loading data
        </h1>
        <p className="text-accent-foreground text-base">Mohon tunggu</p>
      </div>
    );

  return (
    <div className="flex h-auto w-full flex-col gap-4 p-4">
      <h1 className="text-xl font-bold">
        Selamat datang {user.role}, {user.name}
      </h1>
      <div className="grid h-20 w-auto grid-cols-2 gap-4">
        <Link href={`/${user.role}/report/form`} passHref>
          <Button variant="outline" className="h-full w-full p-0">
            Buat Laporan Warga
          </Button>
        </Link>
        {user.role === "admin" && (
          <Link href={`/${user.role}/report/form`} passHref>
            <Button variant="outline" className="h-full w-full p-0">
              Buat Laporan Warga
            </Button>
          </Link>
        )}
      </div>
      <div className="mt-6 flex h-fit w-full flex-col gap-4">
        {reportData.map((report, i) => (
          <CardReport key={i} {...report} />
        ))}
      </div>
    </div>
  );
};

export default DashboardReport;
