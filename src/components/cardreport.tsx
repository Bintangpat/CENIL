import { ObjectId } from "mongoose";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export type CardReportProps = {
  _id: ObjectId;
  role: string;
  judul: string;
  penulis: string;
  deskripsi: string;
  isi: string;
  gambar?: string;
  lokasi: string;
  gmapsLink: string;
};

export function CardReport({
  _id,
  role,
  judul,
  penulis,
  deskripsi,
  isi,
  gambar,
  lokasi,
  gmapsLink,
}: CardReportProps) {
  const { user } = useAuth();
  return (
    <div className="bg-sidebar flex flex-col rounded-2xl">
      <div className="flex h-fit w-full flex-col gap-4 p-4 md:flex-row">
        <div className="flex max-h-50 w-full min-w-50 flex-none flex-row overflow-hidden rounded-2xl md:w-1/5 md:max-w-60">
          {gambar && (
            <img
              src={gambar}
              alt={judul}
              className="h-full w-full flex-shrink-0 rounded-lg object-cover"
            />
          )}
        </div>
        <div className="flex w-full flex-1 flex-col md:w-4/5">
          <h1 className="text-accent-foreground mb-2 h-fit max-h-20 w-auto truncate text-lg font-bold text-pretty md:text-2xl md:text-balance">
            {judul}
          </h1>
          <p className="text-accent-foreground mb-2 text-xs">
            Penulis • {penulis}
          </p>
          <p>{lokasi}</p>

          <Link href={gmapsLink}>
            <p className="text-blue-500">Lokasi linknya klik dinisi</p>
          </Link>
          <div className="flex h-fit flex-col gap-4">
            <p className="text-accent-foreground h-20 w-full truncate text-xs text-pretty text-ellipsis md:text-balance">
              {isi}
            </p>
            <Link href={`/${user?.role}/news/${_id}`}>
              <Button variant="outline" className="h-full w-full">
                Baca berita
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
