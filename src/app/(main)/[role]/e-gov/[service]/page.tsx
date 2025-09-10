//src/app/(main)/[role]/e-gov/[service]/page.tsx

import { ExternalWebsite } from "@/config/ExternalWebsite";

interface ExternalPageProps {
  params: { service: string };
}

export default function ExternalServicePage({ params }: ExternalPageProps) {
  const { service } = params;
  const config = ExternalWebsite[service]?.[0];

  if (!config) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Layanan tidak ditemukan</h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="border-b p-4">
        <h1 className="text-xl font-bold">{config.title}</h1>
      </div>
      <iframe
        src={`/api/proxy?url=${encodeURIComponent(config.url ?? "")}`}
        className="w-full flex-1 border-0"
        title={config.title}
      />
    </div>
  );
}
