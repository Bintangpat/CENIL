// src/app/auth/login/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: controller.signal,
      }).finally(() => clearTimeout(timeout));
      const data = await res.json();

      if (!res.ok) {
        // Tangani kesalahan dari server
        setError(data.error || "Login gagal. Silakan coba lagi.");
        return; // Hentikan eksekusi
      }

      // Jika respons sukses, lakukan navigasi
      const role = data.user?.role || "user";
      router.push(`/${role}/dashboard`);
      router.refresh();
    } catch (err) {
      // Tangani kesalahan jaringan
      setError("Terjadi masalah jaringan. Silakan periksa koneksi Anda.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center py-24 transition-all duration-300 ease-out md:w-6/12 md:pl-[2rem] xl:pl-[8rem] 2xl:pl-[15rem]">
      <div className="flex w-full flex-col items-start">
        <div className="flex flex-col gap-3">
          <h2 className="text-accent-foreground mb-2 w-full text-left text-5xl font-normal">
            Selamat Datang Di Cenil
          </h2>
          <p className="text-accent-foreground mb-10 text-sm">
            Aplikasi yang siap sedia menerima laporan mu
          </p>
        </div>

        <form
          className="mt-10 w-full space-y-6 md:max-w-md"
          onSubmit={handleSubmit}
        >
          <label
            className="text-accent-foreground mb-3 block text-sm"
            htmlFor="username"
          >
            Silahkan masuk dengan data diri anda
          </label>
          <input
            name="email"
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email" // Gunakan tipe 'email' untuk validasi dasar
            placeholder="Email"
            className="focus:text-accent-foreground text-accent-foreground w-full rounded-lg border border-zinc-300 px-6 py-3 text-base placeholder-gray-400 focus:border-transparent focus:placeholder-black focus:ring-2 focus:ring-[#2e2acb] focus:outline-none"
            required
          />
          <input
            name="password"
            id="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            className="focus:text-accent-foreground text-accent-foreground w-full rounded-lg border border-zinc-300 px-6 py-3 text-base placeholder-gray-400 focus:border-transparent focus:placeholder-black focus:ring-2 focus:ring-[#2e2acb] focus:outline-none"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <p className="text-accent-foreground w-full text-right text-sm">
            Belum punya akun ?
            <Link
              href="/auth/signup"
              className="ml-3 cursor-pointer text-[#2e2acb]"
            >
              Sign-in
            </Link>
          </p>
          <button
            type="submit"
            className="text-accent mt-6 w-full rounded-lg bg-[#3729E0] py-3 text-center"
            disabled={isLoading} // Tombol dinonaktifkan saat loading
          >
            {isLoading ? "Memproses..." : "Log-in"}
          </button>
        </form>
      </div>
    </div>
  );
}
