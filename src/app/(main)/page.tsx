//src/app/page.tsx

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import CarouselLayout from "@/components/carousel";

export default function Home() {
  return (
    <div className="relative">
      <CarouselLayout className="h-120 w-full md:h-[80vh]" />
    </div>
  );
}
