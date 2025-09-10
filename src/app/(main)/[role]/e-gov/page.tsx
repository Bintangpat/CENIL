"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalWebsite } from "@/config/ExternalWebsite";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const DashboardEgov: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4">
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
    </div>
  );
};

export default DashboardEgov;
