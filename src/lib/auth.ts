import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function getAuthData() {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { user: null, error: res.status };
    }

    return await res.json();
  } catch (error) {
    console.error("Auth data fetch error:", error);
    return { user: null, error: 500 };
  }
}
