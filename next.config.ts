import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/ipl-schedule',
        destination: 'https://ipl-okn0.onrender.com/ipl-2025-schedule',
      },
    ];
  },
};

export default nextConfig;
