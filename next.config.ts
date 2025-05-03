import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Completely ignore ESLint during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
