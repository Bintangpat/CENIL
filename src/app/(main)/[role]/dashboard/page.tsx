"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserProps {
  params: { role: string };
}

const DashboardUser: React.FC<UserProps> = ({ params }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push("/auth/login");
      }
    }
    fetchUser();
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1>status anda {user.role}</h1>
      <h1 className="text-xl font-bold">Selamat datang, {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default DashboardUser;
