"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface FormNews {
  judul: string;
  penulis: string;
  deskripsi: string;
  gambar: File | null;
  isi: string;
}

const BeritaFormMaker: React.FC = () => {
  const router = useRouter();

  const [formNews, setFormNews] = useState<FormNews>({
    judul: "",
    penulis: "",
    deskripsi: "",
    gambar: null,
    isi: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Handler untuk mengelola perubahan input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "gambar" && e.target instanceof HTMLInputElement) {
      const files = e.target.files;
      setFormNews((prev) => ({
        ...prev,
        gambar: files && files.length > 0 ? files[0] : null,
      }));
    } else {
      setFormNews((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit berita
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("judul", formNews.judul);
      formData.append("penulis", formNews.penulis);
      formData.append("deskripsi", formNews.deskripsi);
      formData.append("isi", formNews.isi);

      if (formNews.gambar) {
        formData.append("gambar", formNews.gambar);
      }

      const response = await fetch("/api/news/form", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Berita berhasil diposting!");
        router.push("/admin/news");
      } else {
        alert(result.error || "Terjadi kesalahan saat memposting berita.");
      }
    } catch (error) {
      console.error("Gagal posting berita:", error);
      alert("Gagal mengirim data berita.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="font-Intertight text-accent-foreground relative flex h-fit w-full flex-col gap-2 rounded-2xl px-12 py-12"
      autoComplete="off"
      spellCheck="false"
    >
      <h1 className="mb-6 text-lg font-bold">Buat Berita</h1>

      {/* Header Section */}
      <section className="mb-8 flex flex-col md:flex-row md:items-start md:gap-8">
        <h2 className="flex w-1/6 font-semibold">Header</h2>
        <div className="flex w-full flex-1 flex-col gap-4">
          <div>
            <label htmlFor="judul" className="mb-6 block w-full text-sm">
              Judul berita
            </label>
            <input
              name="judul"
              value={formNews.judul}
              onChange={handleChange}
              placeholder="Ketik Judul"
              type="text"
              className="bg-card h-12 w-full rounded-lg px-3"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="gambar" className="cursor-pointer">
              <div className="bg-card flex h-fit w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 py-24 text-2xl font-light">
                +
                <div className="bg-accent mt-2 rounded-sm px-12 py-6 text-base">
                  {formNews.gambar ? formNews.gambar.name : "pilih gambar"}
                </div>
              </div>
            </label>
            <input
              name="gambar"
              type="file"
              id="gambar"
              onChange={handleChange}
              className="hidden"
              accept="image/*"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="penulis" className="mb-6 block w-full text-sm">
              Penulis berita
            </label>
            <input
              name="penulis"
              value={formNews.penulis}
              onChange={handleChange}
              placeholder="Ketik Penulis"
              type="text"
              className="bg-card h-12 w-full rounded-lg px-3"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
      </section>

      {/* Deskripsi Section */}
      <section className="mb-8 flex flex-col md:flex-row md:items-start md:gap-8">
        <h2 className="flex w-1/6 font-semibold">Deskripsi</h2>
        <div className="flex flex-1 flex-col gap-4">
          <div>
            <label htmlFor="deskripsi" className="mb-6 block text-sm">
              Deskripsi singkat
            </label>
            <input
              name="deskripsi"
              value={formNews.deskripsi}
              onChange={handleChange}
              placeholder="Ketik Deskripsi"
              type="text"
              className="bg-card h-12 w-full rounded-lg px-3"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
      </section>

      {/* Isi Berita Section */}
      <section className="mb-8 flex flex-col md:flex-row md:items-start md:gap-8">
        <h2 className="flex w-1/6 font-semibold">Isi</h2>
        <div className="flex flex-1 flex-col">
          <label htmlFor="isi" className="mb-6 block text-sm">
            Isi berita
          </label>
          <textarea
            name="isi"
            value={formNews.isi}
            onChange={handleChange}
            placeholder="Ketik Berita"
            className="bg-card h-24 w-full rounded-lg px-3"
            required
            disabled={isSubmitting}
          />
        </div>
      </section>

      <div className="flex h-fit w-full justify-end-safe">
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-800 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 md:w-fit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Memposting..." : "Posting"}
        </button>
      </div>
    </form>
  );
};

export default BeritaFormMaker;
