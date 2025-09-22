// app/(main)/[role]/forum/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardPost, CardPostProps } from "@/components/card/cardpost";
import {
  CardChatRoom,
  CardChatRoomProps,
} from "@/components/card/cardchatroom";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface UserProps {
  params: { role: string };
}

interface PostForm {
  isi: string;
  gambar: File | null;
}

const DashboardForum: React.FC<UserProps> = ({ params }) => {
  const router = useRouter();
  const { user } = useAuth();

  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [openChatroomDialog, setOpenChatroomDialog] = useState(false);

  const [roomName, setRoomName] = useState("");
  const [chatroomData, setChatroomData] = useState<CardChatRoomProps[]>([]);
  const [newsData, setNewsData] = useState<CardPostProps[]>([]);
  const [loadingForum, setLoadingForum] = useState(true);

  const [form, setForm] = useState<PostForm>({ isi: "", gambar: null });
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // 🔹 Ambil semua postingan & chatroom
  const fetchForum = async () => {
    try {
      setLoadingForum(true);
      const res = await fetch("/api/forum");
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setNewsData(data.posts || []);
      setChatroomData(data.chatrooms || []);
    } catch (err) {
      console.error("Error fetch:", err);
    } finally {
      setLoadingForum(false);
    }
  };

  useEffect(() => {
    fetchForum();
  }, []);

  // 🔹 Input teks
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, isi: e.target.value });
  };

  // 🔹 File upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, gambar: file });
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // 🔹 Submit postingan baru
  const handleSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("penulis", user.name);
      formData.append("isi", form.isi);
      if (form.gambar) {
        formData.append("gambar", form.gambar);
      }

      const res = await fetch("/api/forum/form", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Gagal: " + err.error);
        return;
      }

      alert("Postingan berhasil dibuat!");
      setForm({ isi: "", gambar: null });
      setPreview(null);
      setOpenPostDialog(false);
      fetchForum();
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // 🔹 Submit chatroom baru
  const handleSubmitChatroom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/forum/chatroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: roomName,
          createdBy: user.name,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Gagal: " + err.error);
        return;
      }

      alert("Obrolan berhasil dibuat!");
      setRoomName("");
      setOpenChatroomDialog(false);
      fetchForum();
    } catch (err) {
      console.error("Error membuat obrolan:", err);
    } finally {
      setSubmitting(false);
    }
  };

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
    <div className="flex w-full flex-row gap-4 p-4">
      {/* 🔹 Kiri: Postingan */}
      <div className="relative h-full w-full gap-4">
        <div className="flex h-auto w-full flex-col gap-4">
          <h1>Selamat datang di forum desa, {user.name}</h1>

          {/* Form Postingan */}
          <div className="h-fit w-full">
            <Dialog open={openPostDialog} onOpenChange={setOpenPostDialog}>
              <DialogTrigger asChild>
                <Button className="w-full" variant="outline">
                  Posting sesuatu
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-120">
                <DialogHeader>
                  <DialogTitle>Buat Postingan</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleSubmitPost}
                  className="grid h-100 gap-4 overflow-y-auto"
                >
                  <div className="grid gap-3">
                    <Label htmlFor="isi">Isi</Label>
                    <Textarea
                      value={form.isi}
                      onChange={handleChange}
                      placeholder="Isi"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Tambahkan Gambar</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {preview && (
                      <Image
                        src={preview}
                        alt="Preview"
                        width={200}
                        height={200}
                        className="rounded-lg object-cover"
                      />
                    )}
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? "Menyimpan" : "Posting"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col gap-4">
            {loadingForum ? (
              <p>Sedang memuat berita...</p>
            ) : (
              newsData.map((news, i) => <CardPost key={i} {...news} />)
            )}
          </div>
        </div>
      </div>

      {/* 🔹 Kanan: Chatroom */}
      <div className="bg-sidebar absolute -right-100 flex h-[86vh] w-100 flex-col overflow-y-auto rounded-2xl transition-all duration-500 ease-out md:relative md:-right-0">
        {/* Header sticky */}
        <div className="bg-background sticky top-0 z-10 w-full rounded-2xl px-4 py-4">
          <p className="text-center font-semibold">Grup Obrolan</p>
          <Dialog
            open={openChatroomDialog}
            onOpenChange={setOpenChatroomDialog}
          >
            <DialogTrigger asChild>
              <Button className="w-full" variant="outline">
                Buat Obrolan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-120">
              <DialogHeader>
                <DialogTitle>Buat Obrolan</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleSubmitChatroom}
                className="grid h-100 gap-4 overflow-y-auto"
              >
                <div className="grid gap-3">
                  <Label htmlFor="room">Nama obrolan</Label>
                  <Input
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Nama obrolan"
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Membuat obrolan" : "Buat"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* List chatroom */}
        <div className="flex flex-1 flex-col gap-4 p-2">
          {loadingForum ? (
            <p>Sedang memuat obrolan...</p>
          ) : (
            chatroomData.map((chatroom, i) => (
              <CardChatRoom key={i} {...chatroom} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardForum;
