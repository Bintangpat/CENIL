"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    phonenumber: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/auth/login");
    } else {
      const data = await res.json();
      setError(data.error || "Signup gagal");
    }
  }
  return (
    <div className="flex h-8/12 w-full flex-col items-center justify-center py-24 transition-all duration-300 ease-out md:w-8/12 md:pl-[2rem] xl:pl-[8rem] 2xl:pl-[15rem]">
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
          className="mt-10 flex w-full flex-col justify-center space-y-6 md:max-w-md"
          onSubmit={handleSubmit}
        >
          <label
            className="text-accent-foreground mb-3 block text-sm"
            htmlFor="username"
          >
            Silahkan masuk dengan data diri anda
          </label>
          <input
            name="name"
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nama Lengkap"
            className="focus:text-accent-foreground text-accent-foreground placeholder-accent-foreground w-full rounded-lg border border-zinc-300 px-6 py-3 text-base focus:border-transparent focus:placeholder-black focus:ring-2 focus:ring-[#2e2acb] focus:outline-none"
            required
          />
          <input
            name="email"
            id="email"
            type="text"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="focus:text-accent-foreground text-accent-foreground placeholder-accent-foreground w-full rounded-lg border border-zinc-300 px-6 py-3 text-base focus:border-transparent focus:placeholder-black focus:ring-2 focus:ring-[#2e2acb] focus:outline-none"
            required
          />
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            className="focus:text-accent-foreground text-accent-foreground placeholder-accent-foreground w-full rounded-lg border border-zinc-300 px-6 py-3 text-base focus:border-transparent focus:placeholder-black focus:ring-2 focus:ring-[#2e2acb] focus:outline-none"
            required
          />
          {/*
<input
  id="No_HP"
  name="No_HP"
  type="telephone"
  placeholder="Nomor HP"
  className="focus:text-accent-foreground text-accent-foreground placeholder-accent-foreground w-full rounded-lg border border-zinc-300 px-6 py-3 text-base focus:border-transparent focus:placeholder-black focus:ring-2 focus:ring-[#2e2acb] focus:outline-none"
/>
*/}
          <p className="text-accent-foreground w-full text-right text-sm">
            Belum punya akun ?
            <Link
              href="/auth/login"
              className="ml-3 cursor-pointer text-[#2e2acb]"
            >
              Log-in
            </Link>
          </p>
          <button
            type="submit"
            className="text-accent-foreground mt-6 w-full rounded-lg bg-[#3729E0] py-3 text-center"
          >
            Sign-in
          </button>
        </form>
      </div>
    </div>
  );
}
