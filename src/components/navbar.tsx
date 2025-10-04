"use client";

import { useAuth } from "@/context/AuthContext";
import { ModeToggle } from "@/components/ui/themetoggle";
import Link from "next/link";
import { useEffect, useState } from "react";

// Asumsi: Anda perlu membuat file-file ini
// import { useAuth } from "@/context/AuthContext";
// import { ModeToggle } from "@/components/ui/themetoggle";

const Navbar = () => {
  // Mockup hook untuk demonstrasi, ganti dengan implementasi Anda
  const { user, logout } = useAuth() || {
    user: null,
    logout: () => console.log("logout"),
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set state menjadi true jika posisi scroll lebih dari 10px
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup listener saat komponen di-unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="navbar"
      // PERBAIKAN: Menghapus tanda kutip ekstra, memperbaiki 'ease-linear', dan menyederhanakan logika transisi
      className={`top-0 z-30 flex w-full items-center justify-between p-3 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-accent/90 fixed shadow-md backdrop-blur-md"
          : "bg-accent/100 sticky"
      }`}
    >
      <div className="text-accent-foreground cursor-pointer text-lg font-bold">
        <Link href="/">CENIL</Link>
      </div>

      <div className="flex items-center justify-end">
        <nav className="flex items-center justify-center gap-4 text-sm font-medium">
          {/* Logika kondisional ini sudah benar, dengan asumsi 'user' adalah null/undefined saat logout */}
          {!user ? (
            <Link
              href="/auth/login"
              className="hover:shadow-fixed bg-sidebar text-accent-foreground w-fit rounded-md border-zinc-200 px-4 py-2 transition-shadow"
            >
              Log-in
            </Link>
          ) : (
            <button
              onClick={logout}
              className="hover:shadow-fixed bg-sidebar text-accent-foreground w-fit rounded-md border-zinc-200 px-4 py-2 transition-shadow"
            >
              Log-out
            </button>
          )}
          <ModeToggle />
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
