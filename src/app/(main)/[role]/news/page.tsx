"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardNews, CardNewsProps } from "@/components/cardnews";
import Link from "next/link";

interface UserProps {
  params: { role: string };
}

const DashboardNews: React.FC<UserProps> = ({ params }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [newsData, setNewsData] = useState<CardNewsProps[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push("/auth/login");
      }
    }
    fetchUser();
  }, [router]);

  useEffect(() => {
    // fetch berita
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
        {newsData.map((news, i) => (
          <CardNews key={i} {...news} />
        ))}
      </div>
    </div>
  );
};

export default DashboardNews;
