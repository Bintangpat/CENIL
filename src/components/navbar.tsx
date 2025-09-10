"use client";

import { ModeToggle } from "@/components/ui/themetoggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <div
      id="navbar"
      className="ease-linier bg-accent sticky top-0 z-30 flex h-9 w-full flex-row items-center justify-between overflow-hidden p-6 shadow-sm transition-all duration-500"
    >
      <div className="text-accent-foreground w-fit cursor-pointer font-bold md:flex">
        <Link href="/">CENIL</Link>
      </div>

      <div className="flex h-fit items-center justify-end">
        <nav className="w-fit items-center justify-center text-sm font-medium md:flex">
          <Link
            href="/auth/login"
            className="hover:shadow-fixed bg-sidebar-accent text-accent-foreground w-fit rounded-sm border-zinc-200 px-2"
          >
            Log-in
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
