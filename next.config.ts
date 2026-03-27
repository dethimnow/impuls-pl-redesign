import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "impuls.pl", pathname: "/wp-content/**" },
      { protocol: "https", hostname: "impuls.pl", pathname: "/wp-content/**" },
    ],
  },
};

export default nextConfig;
