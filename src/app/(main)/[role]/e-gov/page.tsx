"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalWebsite } from "@/config/ExternalWebsite";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const DashboardEgov: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold">Selamat datang, {user.name}</h1>
      <p className="mb-6">Status: {user.role}</p>

      <h2 className="mb-3 text-lg font-semibold">Layanan E-Gov</h2>
      <ul className="grid grid-cols-2 gap-4">
        {Object.entries(ExternalWebsite).map(([key, items]) =>
          items.map((item, i) => (
            <li key={`${key}-${i}`} className="">
              <Link href={`/${user.role}/e-gov/${key}`}>
                <Button
                  variant="outline"
                  className="bitems-center flex h-fit w-full gap-2 p-6"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Button>
              </Link>
            </li>
          )),
        )}
      </ul>
      <div className="bg-accent-foreground text-accent grid grid-cols-2 items-center-safe justify-items-center rounded-2xl p-10">
        <div className="flex flex-col gap-4">
          <p className="text-4xl">
            Hubungi nomor dibawah ini{" "}
            <span className="line-clamp-1">untuk pertanyaan lebih lanjut</span>
          </p>
          <Link className="w-fit" href="https://wa.link/n8qyed">
            <Button className="bg-accent hover:bg-sidebar-ring text-accent-foreground w-fit px-6 py-6">
              Hubungi Perangkat Desa
            </Button>
          </Link>
        </div>
        <div className="relative flex w-full flex-col items-center-safe justify-center-safe">
          <div className="absolute flex h-fit w-full justify-end-safe">
            <Image src="/Logo_Pringsewu.webp" alt="" width={50} height={50} />
          </div>
          <div className="flex w-fit items-center-safe justify-center-safe overflow-hidden rounded-2xl shadow">
            <Image src="/waqr.png" width={200} height={200} alt="wr"></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEgov;
