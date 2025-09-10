// src/app/api/proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url)
    return NextResponse.json({ error: "URL required" }, { status: 400 });

  const res = await fetch(url);
  const body = await res.text();

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/html",
      // sengaja tidak meneruskan X-Frame-Options
    },
  });
}
