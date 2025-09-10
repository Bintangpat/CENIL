"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface formReport {
  judul: string;
  penulis: string;
  deskripsi: string;
  gambar: File | null;
  isi: string;
  lokasi: string;
  gmapsLink: string;
}

const ReportFormMaker: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Browser kamu tidak mendukung geolocation");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setLocation(coords);
      },
      (err) => {
        console.error(err);
        alert("Gagal mengambil lokasi");
      },
    );
  };
  const [formReport, setformReport] = useState<formReport>({
    judul: "",
    penulis: "",
    deskripsi: "",
    gambar: null,
    isi: "",
    lokasi: "",
    gmapsLink: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Handler untuk mengelola perubahan input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "gambar" && e.target instanceof HTMLInputElement) {
      const files = e.target.files;
      setformReport((prev) => ({
        ...prev,
        gambar: files && files.length > 0 ? files[0] : null,
      }));
    } else {
      setformReport((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit berita
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!location) {
      alert("Tolong ambil lokasi dulu");
      return;
    }
    const gmapsLink = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    try {
      const formData = new FormData();
      formData.append("judul", formReport.judul);
      formData.append("penulis", formReport.penulis);
      formData.append("deskripsi", formReport.deskripsi);

      formData.append("isi", formReport.isi);
      formData.append("lokasi", `${location.lat},${location.lng}`);

      // simpan link gmaps otomatis
      formData.append("gmapsLink", gmapsLink);

      if (formReport.gambar) {
        formData.append("gambar", formReport.gambar);
      }

      const response = await fetch("/api/report/form", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Laporan Berhasil diposting!");
        const role = user?.role || "user";
        router.push(`/${role}/report`);
      } else {
        alert(result.error || "Terjadi kesalahan saat memposting laporan.");
      }
    } catch (error) {
      console.error("Gagal posting laporan:", error);
      alert("Gagal mengirim data laporan.");
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
      <h1 className="mb-6 text-lg font-bold">Buat Laporan</h1>

      {/* Header Section */}
      <section className="mb-8 flex flex-col md:flex-row md:items-start md:gap-8">
        <h2 className="flex w-1/6 font-semibold">Header</h2>
        <div className="flex w-full flex-1 flex-col gap-4">
          <div>
            <label htmlFor="judul" className="mb-6 block w-full text-sm">
              Judul Laporan
            </label>
            <input
              name="judul"
              value={formReport.judul}
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
                  {formReport.gambar ? formReport.gambar.name : "pilih gambar"}
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
          <button
            type="button"
            onClick={handleGetLocation}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Ambil Lokasi Sekarang
          </button>

          {location && (
            <p className="text-sm">
              Lokasi:{" "}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Buka di Google Maps
              </a>
            </p>
          )}

          <div>
            <label htmlFor="penulis" className="mb-6 block w-full text-sm">
              Penulis Laporan
            </label>
            <input
              name="penulis"
              value={formReport.penulis}
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
              value={formReport.deskripsi}
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
            Isi Laporan
          </label>
          <textarea
            name="isi"
            value={formReport.isi}
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
          className="w-full rounded-lg bg-blue-800 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50 md:w-fit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Memposting..." : "Posting"}
        </button>
      </div>
    </form>
  );
};

export default ReportFormMaker;
