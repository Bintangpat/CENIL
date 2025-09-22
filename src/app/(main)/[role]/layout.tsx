// src/app/[role]/layout.tsx
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { getAuthData } from "@/lib/auth";

interface LayoutParams {
  role: string;
}

export default async function RoleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LayoutParams>;
}) {
  const resolvedParams = await params;
  const user = await getAuthData();

  // Jika gagal autentikasi
  if (!user?.user) {
    return (
      <UnauthorizedLayout
        code="401"
        message="Unauthorized"
        subMessage="Anda harus login untuk mengakses halaman ini."
      />
    );
  }

  const userRole = user.user.role; // role dari JWT / API
  const routeRole = resolvedParams?.role; // role dari URL

  // Cocokkan role user dengan role di URL
  if (userRole !== routeRole) {
    return (
      <UnauthorizedLayout
        code="403"
        message="Forbidden"
        subMessage={`Halaman ini hanya untuk ${routeRole}, bukan untuk ${userRole}.`}
      />
    );
  }

  // Jika lolos semua validasi
  return <main>{children}</main>;
}

function UnauthorizedLayout({
  code,
  message,
  subMessage,
}: {
  code: string;
  message: string;
  subMessage: string;
}) {
  return (
    <div className="flex h-[92vh] w-full items-center justify-center">
      <div className="flex flex-col gap-4 md:flex-row md:gap-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-accent-foreground text-4xl font-bold md:text-9xl">
            {code}
          </h1>
          <p className="text-accent-foreground text-base">{message}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 md:items-start">
          <h1 className="text-accent-foreground text-2xl font-bold md:text-6xl">
            Oops!
          </h1>
          <p className="text-accent-foreground text-base">{subMessage}</p>
          <Button className="w-fit rounded-full">
            <a href="/auth/login">Silahkan Login</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
