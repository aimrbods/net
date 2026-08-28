import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export untuk Cloudflare Pages / hosting statis
  output: 'export',

  // Hindari konflik file/directory saat proses export
  trailingSlash: true,

  // React
  reactStrictMode: true,

  // Security / header
  poweredByHeader: false,

  // Static export tidak mendukung image optimization server-side
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
