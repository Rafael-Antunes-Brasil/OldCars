import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['http://localhost:3000']
    }
  },
  images: {
    formats: ["image/webp", "image/avif"],
    domains: ["localhost", "api"],
  },
  productionBrowserSourceMaps: false,
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
};

export default nextConfig;
