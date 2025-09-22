"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import CardTask from "@/components/card/cardtask";

const DashboardUser: React.FC = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <div className="text-accent-foreground rounded-2xl p-4">
        <h1 className="text-primary leading-tighter max-w-2xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
          Selamat datang, {user.role} {user.name}
        </h1>
      </div>
      <div className="grid h-fit w-full gap-4 pt-4">
        <CardTask />
      </div>
    </div>
  );
};

export default DashboardUser;
