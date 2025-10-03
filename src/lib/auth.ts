// src/lib/auth.ts
import { cookies } from "next/headers";
import { verifyJWT } from "./jwt";
import { UserPayload } from "@/types/auth";

/**
 * Ambil user dari cookie JWT di server component
 * @returns { user, error } - user sudah typed UserPayload
 */
export async function getAuthData(): Promise<{
  user: UserPayload | null;
  error: number | null;
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return { user: null, error: 401 };

    const payload = verifyJWT(token);
    if (!payload || typeof payload === "string")
      return { user: null, error: 401 };

    // mapping ke UserPayload
    const user: UserPayload = {
      id: payload.id,

      role: payload.role,
      email: payload.email,
    };

    return { user, error: null };
  } catch (err) {
    console.error("Auth decode error:", err);
    return { user: null, error: 500 };
  }
}
