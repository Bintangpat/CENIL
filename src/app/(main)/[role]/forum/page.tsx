"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardNews, CardNewsProps } from "@/components/cardnews";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface UserProps {
  params: { role: string };
}

const DashboardForum: React.FC<UserProps> = ({ params }) => {
  const router = useRouter();

  const [newsData, setNewsData] = useState<CardNewsProps[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const { user, loading } = useAuth();

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
      <h1>Selamat datang di forum desa, {user.name}</h1>
      <div className="massage h-12 w-full">
        <Link id="" href={`/${user.role}/forum/grup`}>
          <Button>buat obrolan</Button>
        </Link>
      </div>
      <div
        id="global post"
        className="bg-background h-[90vh] rounded-2xl"
      ></div>
    </div>
  );
};

export default DashboardForum;
