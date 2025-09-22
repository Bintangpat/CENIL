"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardNews, CardNewsProps } from "@/components/card/cardnews";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface UserProps {
  params: { role: string };
}

const DashboardNews: React.FC<UserProps> = ({ params }) => {
  const { user, loading } = useAuth();
  const [newsData, setNewsData] = useState<CardNewsProps[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        if (res.ok) {
          const data = await res.json();
          setNewsData(data);
        }
      } catch (err) {
        console.error("Gagal fetch news:", err);
      } finally {
        setLoadingNews(false);
      }
    }
    fetchNews();
  }, []);

  // 1. Kalau masih loading user
  if (loading) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <h1 className="text-accent-foreground text-2xl font-bold">
          Loading data
        </h1>
        <p className="text-accent-foreground text-base">Mohon tunggu</p>
      </div>
    );
  }

  // 2. Kalau sudah selesai loading tapi user tidak ada
  if (!user) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <h1 className="text-accent-foreground text-2xl font-bold">
          Anda belum login
        </h1>
        <p className="text-accent-foreground text-base">
          Silakan login untuk melanjutkan
        </p>
      </div>
    );
  }

  // 3. Kalau user ada
  return (
    <div className="flex h-auto w-full flex-col gap-4 p-4">
      <h1 className="text-xl font-bold">
        Selamat datang {user.role}, {user.name}
      </h1>
      <div className="grid h-20 w-auto grid-cols-2 gap-4">
        <Link href={`/${user.role}/news/form`} passHref>
          <Button variant="outline" className="h-full w-full p-0">
            Buat berita
          </Button>
        </Link>
        <Link href={`/${user.role}/news/form`} passHref>
          <Button variant="outline" className="h-full w-full p-0">
            Buat berita
          </Button>
        </Link>
      </div>
      <div className="mt-6 flex h-fit w-full flex-col gap-4">
        {loadingNews ? (
          <p>Sedang memuat berita...</p>
        ) : (
          newsData.map((news, i) => <CardNews key={i} {...news} />)
        )}
      </div>
    </div>
  );
};

export default DashboardNews;
