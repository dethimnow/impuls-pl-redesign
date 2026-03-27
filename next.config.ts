import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "impuls.pl", pathname: "/wp-content/**" },
      { protocol: "https", hostname: "impuls.pl", pathname: "/wp-content/**" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/cdn-wp/:path*",
        destination: "http://impuls.pl/wp-content/:path*",
      },
    ];
  },
};

export default nextConfig;
