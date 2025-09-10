/** @format */

"use client";

import type { FC } from "react";
interface CarouselWelcomeProps {
  className?: string;
}
import { useState, useEffect } from "react";

const images = [
  "/Photoslider1.webp",
  "/Photoslider2.webp",
  "/Photoslider3.webp",
];
const Headers = [
  "Andal dan cepat",
  "Memberikan informasi terpercaya",
  "Selalu update berita terbaru",
];
const descriptions = [
  "Penyedia informasi tanpa penghalang jarak",
  "Berdasarkan sumber yang terbaik",
  "Persempit jarak pengetahuan dengan dunia",
];

const Carousel: FC<CarouselWelcomeProps> = ({ className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fungsi untuk pindah ke slide berikutnya
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Fungsi untuk pindah ke slide sebelumnya
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  // Auto slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="Carousel"
      className={`relative z-20 m-0 flex items-center justify-center overflow-hidden rounded-2xl ${className ?? ""}`}
    >
      <div id="wrapperslider" className="relative h-full w-screen">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Deskripsi gambar ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-1 top-1/2 left-32 flex h-fit flex-col gap-6 text-white transition-transform duration-700 md:left-32">
              <h5 className="animate-fade-in-up font-Intertight z-3 h-fit cursor-pointer text-left text-2xl font-bold md:text-3xl lg:text-4xl">
                {Headers[index]}
              </h5>
              <p className="font-Intertight z-3 h-fit">{descriptions[index]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute flex h-full w-full flex-row justify-between">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="h-full w-1/2 cursor-pointer transition-transform"
        ></button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="h-full w-1/2 cursor-pointer transition-transform"
        ></button>
      </div>
    </div>
  );
};

export default Carousel;
