import Image from "next/image";
import Link from "next/link";

// Definisikan tipe data untuk setiap e-book
interface Ebook {
  title: string;
  author: string;
  description: string;
  coverImageUrl: string;
  linkUrl: string;
  source: string;
}

const freeEbooks: Ebook[] = [
  {
    title: "Madilog",
    author: "Tan Malaka",
    description:
      "Sebuah karya fundamental yang memperkenalkan materialisme, dialektika, dan logika sebagai cara berpikir untuk membebaskan bangsa Indonesia dari 'logika mistika'.",
    coverImageUrl:
      "https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/c21e9e7bfc74408ae1587208478a6e89899eec4ab8bb537dd7bf5accfeafa46c.jpg",
    linkUrl:
      "https://id.z-library.sk/book/18350339/6c8692/tan-malaka-madilog.html?dsource=mostpopular",
    source: "Z-Library",
  },
  {
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    description:
      "Novel historis yang berlatar belakang awal abad ke-20, mengisahkan perjuangan Minke, seorang pribumi terpelajar, melawan ketidakadilan di era kolonial.",
    coverImageUrl:
      "https://s3proxy.cdn-zlib.sk/covers150/collections/foreignfiction/43461bb4788c11ae8ec54baf7f476a3778b5d0969fe7c6bb37ff76c6dab9d4b7.jpg",
    linkUrl: "https://id.z-library.sk/book/4290675/d8d2ff/bumi-manusia.html",
    source: "Z-Library",
  },
  {
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    description:
      "Kisah inspiratif tentang sepuluh anak dari keluarga miskin yang bersekolah di sebuah sekolah Muhammadiyah di Belitung dengan segala keterbatasannya.",
    coverImageUrl:
      "https://s3proxy.cdn-zlib.sk/covers400/collections/genesis/4dab218cbe22ada9dab7a3623c6f9484c69937788e8aa01f6e710fdbbcbfc628.jpg",
    linkUrl: "https://id.z-library.sk/book/964935/00e48c/laskar-pelangi.html",
    source: "Z-Library",
  },
  {
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    description:
      "Buku pengembangan diri yang mengadaptasi filsafat Stoisisme kuno untuk mengatasi emosi negatif dan hidup lebih tenang di era modern.",
    coverImageUrl:
      "https://s3proxy.cdn-zlib.sk/covers300/collections/userbooks/112597737ece89b760d02bcd4281f6ef5a31295957084ca385be9a1a368e3494.jpg",
    linkUrl:
      "https://id.z-library.sk/book/16383340/457edf/filosofi-teras.html?dsource=mostpopular",
    source: "Z-Library",
  },
];

export default function EbooksPage() {
  return (
    <div className="bg-light-bg text-dark-text min-h-screen w-full p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold">Galeri E-book Gratis</h1>
          <p className="text-subtle-text">
            Jelajahi koleksi literatur digital gratis untuk memperkaya wawasan
            Anda.
          </p>
        </div>

        {/* Grid untuk menampilkan e-book */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {freeEbooks.map((ebook, index) => (
            <div
              key={index}
              className="group bg-card flex flex-col overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={ebook.coverImageUrl}
                  alt={`Cover buku ${ebook.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-grow flex-col p-5">
                <h3 className="mb-1 text-lg font-bold">{ebook.title}</h3>
                <p className="text-accent-foreground mb-3 text-sm">
                  oleh {ebook.author}
                </p>
                <p className="text-subtle-text flex-grow text-sm">
                  {ebook.description}
                </p>
                <Link
                  href={ebook.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent hover:bg-accent-foreground text-accent-foreground hover:text-accent mt-4 inline-block w-full rounded-lg px-4 py-2 text-center font-semibold transition-colors"
                >
                  Baca Sekarang
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
