"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type NewsDetailData = {
  _id: string;
  judul: string;
  penulis: string;
  deskripsi: string;
  isi: string;
  gambar?: string;
  createdAt?: string;
};

export default function NewsDetail() {
  const router = useRouter();
  const params = useParams();
  const { id, role } = params as { id: string; role: string };

  const [user, setUser] = useState<any>(null);
  const [newsData, setNewsData] = useState<NewsDetailData | null>(null);
  const [loadingNews, setLoadingNews] = useState(true);

  // Ambil data user
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push("/auth/login");
      }
    }
    fetchUser();
  }, [router]);

  // Ambil detail berita
  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`/api/news/${id}`);
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
    if (id) fetchNews();
  }, [id]);

  if (loadingNews) return <div>Loading...</div>;
  if (!newsData) return <div>Berita tidak ditemukan.</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{newsData.judul}</h1>
      <p className="mt-1 text-gray-700">Oleh {newsData.penulis}</p>

      {newsData.gambar && (
        <img
          src={newsData.gambar}
          alt={newsData.judul}
          className="mt-4 rounded-lg object-cover"
        />
      )}

      <p className="mt-4 leading-relaxed">{newsData.isi}</p>

      <div className="mt-6 text-sm text-gray-500">
        <span>Role: {role}</span> | <span>ID: {newsData._id}</span>
      </div>
    </div>
  );
}
