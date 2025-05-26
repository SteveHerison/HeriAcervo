import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["heriacervobd-production.up.railway.app"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "heriacervobd-production.up.railway.app",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
