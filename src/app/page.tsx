import Image from "next/image";
import Link from "next/link";
import FaqItem from "@/components/FaqItem";
import CarouselLayout from "@/components/carousel";

// Komponen Ikon sederhana
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export default function HomePage() {
  const faqs = [
    {
      question: "Apa itu aplikasi CENIL?",
      answer:
        "CENIL adalah aplikasi mobile yang dirancang untuk menjadi jembatan digital antara pemerintah desa dan warganya. Tujuannya adalah mempermudah akses informasi, menyederhanakan layanan, dan meningkatkan partisipasi warga dalam e-Government.",
    },
    {
      question: "Apakah data pribadi saya aman di aplikasi ini?",
      answer:
        "Tentu. Keamanan adalah prioritas kami. CENIL menggunakan autentikasi via NIK dan nomor HP yang terverifikasi, enkripsi data end-to-end, serta sistem otorisasi berbasis peran untuk memastikan hanya pihak yang berwenang yang dapat mengakses data sensitif.",
    },
    {
      question: "Siapa saja yang dapat menggunakan aplikasi CENIL?",
      answer:
        "Aplikasi ini dirancang untuk seluruh warga desa yang terdaftar secara administratif, serta perangkat desa yang bertugas. Setiap pengguna akan memiliki hak akses yang berbeda sesuai dengan perannya.",
    },
    {
      question: "Apakah aplikasi ini berbayar?",
      answer:
        "Tidak. Aplikasi CENIL disediakan secara gratis untuk seluruh masyarakat desa sebagai bagian dari program peningkatan layanan publik dan e-Government.",
    },
    {
      question: "Bagaimana cara saya melapor jika menemukan masalah?",
      answer:
        "Anda dapat menggunakan fitur 'Lapor Warga' di dalam aplikasi. Cukup tulis laporan Anda, lampirkan foto jika perlu, dan lokasi Anda akan terdeteksi otomatis. Laporan akan langsung diteruskan ke perangkat desa yang berwenang.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="text-accent-foreground relative flex h-[90vh] min-h-[600px] items-center justify-center-safe">
        <CarouselLayout className="h-full w-full" />
      </section>

      {/* Latar Belakang Section */}
      <section
        id="latar-belakang"
        className="ease-outbg-dark-bg py-20 transition-all duration-500 md:py-32"
      >
        <div className="container mx-auto grid items-center gap-12 px-6 md:grid-cols-2">
          <div className="relative h-80 w-full overflow-hidden rounded-lg md:h-full">
            {/* Ganti gambar ini dengan yang lebih relevan, misal: suasana balai desa */}
            <Image
              src="/Photoslider1.webp"
              alt="Masyarakat desa sedang mengikuti sosialisasi program pemerintah"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-400">
              Solusi Digital untuk Desa
            </span>
            <h2 className="text-accent-foreground mt-2 mb-6 text-3xl font-bold md:text-4xl">
              Mengatasi Kesenjangan Informasi & Partisipasi.
            </h2>
            <p className="text-accent-foreground mb-6">
              Partisipasi masyarakat desa dalam e-Government sering terkendala
              oleh akses informasi, literasi digital, dan ketiadaan saluran
              komunikasi dua arah. CENIL hadir untuk meruntuhkan hambatan
              tersebut.
            </p>
            <blockquote className="my-6 border-l-4 border-gray-500 py-2 pl-4">
              <p className="text-accent-foreground italic">
                "Dengan CENIL, kami berharap semua warga bisa lebih mudah
                mendapatkan informasi, mengurus administrasi, dan menyuarakan
                aspirasinya. Ini adalah langkah besar menuju desa digital yang
                transparan dan partisipatif."
              </p>
              <cite className="mt-2 block text-gray-400 not-italic">
                - Kepala Desa Makmur Jaya
              </cite>
            </blockquote>
            <Link
              href="#fitur"
              className="text-accent-foreground hover:text-accent-foreground font-semibold transition-colors"
            >
              Lihat semua fitur &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics/Impact Section */}
      <section className="bg-dark-bg pb-20 md:pb-32">
        <div className="container mx-auto px-6">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-accent-foreground text-3xl font-bold">
              Dampak Nyata, Proses Efisien.
            </h2>
            <Link
              href="#"
              className="text-accent-foreground hover:text-accent-foreground text-sm font-semibold"
            >
              Ikut Bergabung &rarr;
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-dark-card rounded-lg p-8">
              <p className="text-accent-foreground mb-2 text-4xl font-bold">
                50%
              </p>
              <h3 className="text-accent-foreground mb-2 font-semibold">
                Waktu Layanan Lebih Cepat
              </h3>
              <p className="text-sm text-gray-400">
                Memangkas waktu tunggu pengurusan surat dan layanan administrasi
                lainnya secara signifikan.
              </p>
            </div>
            <div className="bg-dark-card rounded-lg p-8">
              <p className="text-accent-foreground mb-2 text-4xl font-bold">
                1 Menit
              </p>
              <h3 className="text-accent-foreground mb-2 font-semibold">
                Untuk Mengirim Laporan
              </h3>
              <p className="text-sm text-gray-400">
                Laporkan jalan rusak atau keluhan layanan dengan mudah, lengkap
                dengan foto dan lokasi GPS.
              </p>
            </div>
            <div className="bg-dark-card rounded-lg p-8">
              <p className="text-accent-foreground mb-2 text-4xl font-bold">
                100%
              </p>
              <h3 className="text-accent-foreground mb-2 font-semibold">
                Transparansi Dana Desa
              </h3>
              <p className="text-sm text-gray-400">
                Akses informasi anggaran, realisasi, dan detail proyek
                pembangunan desa kapan saja.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fitur Unggulan Section */}
      <section id="fitur" className="bg-light-bg text-dark-text py-20 md:py-32">
        <div className="container mx-auto grid items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Fitur Lengkap, Dirancang untuk Kemudahan.
            </h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <CheckIcon className="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-green-600" />
                <span>
                  <strong>Layanan Desa Online:</strong> Ajukan surat keterangan
                  dan lacak status permohonan secara real-time.
                </span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-green-600" />
                <span>
                  <strong>Lapor Warga Interaktif:</strong> Kirim laporan
                  kejadian lengkap dengan foto dan lokasi untuk tindak lanjut
                  cepat.
                </span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-green-600" />
                <span>
                  <strong>Forum & Voting Warga:</strong> Berdiskusi, sampaikan
                  saran, dan ikut serta dalam pengambilan keputusan komunitas.
                </span>
              </li>
            </ul>
            <Link
              href="#"
              className="text-dark-text mt-8 inline-block font-semibold transition-colors hover:text-gray-600"
            >
              Lihat Detail Fitur &rarr;
            </Link>
          </div>
          <div className="relative h-96 w-full overflow-hidden rounded-lg">
            {/* Ganti dengan gambar antarmuka aplikasi CENIL */}
            <Image
              src="/Photoslider3.webp"
              alt="Tangan memegang smartphone yang menampilkan antarmuka aplikasi CENIL"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Semua Fitur Section */}
      <section className="bg-light-bg text-dark-text pb-20 md:pb-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Semua yang Anda Butuhkan dalam Satu Aplikasi
            </h2>
            <p className="text-subtle-text mt-4">
              Dari informasi terbaru hingga layanan darurat, CENIL menyediakan
              platform terintegrasi untuk semua kebutuhan warga desa.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                🏠
              </div>
              <h3 className="text-lg font-bold">Beranda Dinamis</h3>
              <p className="text-subtle-text text-sm">
                Lihat pengumuman, agenda, dan layanan terkini.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                📢
              </div>
              <h3 className="text-lg font-bold">Lapor Warga</h3>
              <p className="text-subtle-text text-sm">
                Aduan jalan rusak, banjir, atau pelayanan buruk.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                💰
              </div>
              <h3 className="text-lg font-bold">Info Dana Desa</h3>
              <p className="text-subtle-text text-sm">
                Transparansi anggaran dan realisasi pembangunan.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                💬
              </div>
              <h3 className="text-lg font-bold">Forum Diskusi</h3>
              <p className="text-subtle-text text-sm">
                Ruang diskusi dan voting untuk keputusan bersama.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section
        id="keamanan"
        className="text-dark-text bg-accent py-20 md:py-32"
      >
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Keamanan dan Privasi Terjamin
            </h2>
            <p className="text-subtle-text mt-4">
              Kami menerapkan standar keamanan tertinggi untuk melindungi data
              dan privasi Anda sebagai warga negara.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-light-bg rounded-lg border border-gray-200 p-8">
              <h3 className="mb-2 text-lg font-bold">
                Autentikasi NIK & No. HP
              </h3>
              <p className="text-subtle-text text-sm">
                Setiap pengguna diverifikasi melalui NIK dan nomor HP untuk
                memastikan identitas yang valid.
              </p>
            </div>
            <div className="bg-light-bg rounded-lg border border-gray-200 p-8">
              <h3 className="mb-2 text-lg font-bold">Enkripsi Data Pribadi</h3>
              <p className="text-subtle-text text-sm">
                Semua data pribadi Anda dienkripsi baik saat transmisi maupun
                saat disimpan di server kami.
              </p>
            </div>
            <div className="bg-light-bg rounded-lg border border-gray-200 p-8">
              <h3 className="mb-2 text-lg font-bold">
                Otorisasi Berbasis Peran
              </h3>
              <p className="text-subtle-text text-sm">
                Sistem hak akses memastikan setiap pengguna (admin, warga,
                perangkat desa) hanya bisa melihat data yang relevan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-sidebar text-dark-text py-20 md:py-32">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Pertanyaan Umum
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="text-accent-foreground relative py-20 text-center md:py-32">
        <div className="absolute inset-0">
          {/* Ganti dengan gambar yang relevan: Peta desa digital atau gotong royong */}
          <Image
            src="/Photoslider2.webp"
            alt="Warga desa bergotong royong membangun infrastruktur"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative container mx-auto px-6">
          <h2 className="text-accent mb-4 text-3xl font-bold md:text-4xl">
            Mulai Berpartisipasi Sekarang
          </h2>
          <p className="text-accent mx-auto mb-8 max-w-xl">
            Jadilah bagian dari perubahan. Download aplikasi CENIL dan ikut
            serta dalam membangun desa yang lebih baik, transparan, dan modern.
          </p>
          <div className="flex justify-center">
            <Link
              href="#"
              className="text-dark-text bg-accent rounded-lg px-8 py-3 font-semibold transition-colors hover:bg-gray-200"
            >
              Download Aplikasi CENIL
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
