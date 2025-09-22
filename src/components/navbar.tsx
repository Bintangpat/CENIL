"use client";

import { ModeToggle } from "@/components/ui/themetoggle";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div
      id="navbar"
      className="ease-linier bg-accent sticky top-0 z-30 flex h-9 w-full flex-row items-center justify-between overflow-hidden p-6 shadow-sm transition-all duration-500"
    >
      <div className="text-accent-foreground w-fit cursor-pointer font-bold md:flex">
        <Link href="/">CENIL</Link>
      </div>

      <div className="flex h-fit items-center justify-end">
        <nav className="flex w-fit items-center justify-center gap-4 text-sm font-medium">
          {!user ? (
            <Link
              href="/auth/login"
              className="hover:shadow-fixed bg-sidebar text-accent-foreground w-fit rounded-sm border-zinc-200 px-4 py-2"
            >
              Log-in
            </Link>
          ) : (
            <button
              onClick={logout}
              className="hover:shadow-fixed bg-sidebar text-accent-foreground w-fit rounded-sm border-zinc-200 px-4 py-2"
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
