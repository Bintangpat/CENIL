import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3proxy.cdn-zlib.sk",
      },
      {
        protocol: "https",
        hostname: "id.z-library.sk", // Hostname ini perlu ditambahkan
      },
      {
        protocol: "https",
        hostname: "covers.zlibcdn.com",
      },
    ],
  },
};

export default nextConfig;
