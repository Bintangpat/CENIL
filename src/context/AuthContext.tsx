// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { UserPayload } from "@/types/auth"; // hanya id, email, role

interface FullUser extends UserPayload {
  name: string;
  phonenumber?: string;
}

interface AuthContextProps {
  user: FullUser | null;
  loading: boolean;
  setUser: (user: FullUser | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({
  children,
  initialUser, // payload dari server (id, email, role)
}: {
  children: React.ReactNode;
  initialUser: UserPayload | null;
}) => {
  const [user, setUser] = useState<FullUser | null>(
    initialUser ? { ...initialUser, name: "" } : null,
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          // merge payload (id/email/role) dengan data lengkap dari server
          setUser((prev) => ({ ...prev, ...data.user }));
        }
      } catch (err) {
        console.error("Gagal fetch user", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // hanya fetch kalau ada initialUser (berarti sudah login)
    if (initialUser) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [initialUser]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
