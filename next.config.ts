import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Product images from the swag store API/CDN
        // If images come from a different domain, Next.js will throw an error
        // with the exact hostname to add here
        protocol: "https",
        hostname: "vercel-swag-store-api.vercel.app",
      },
      {
        protocol: "https",
        hostname: "i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com",
      }
    ],
  },
};

export default nextConfig;
