import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard/settings",
        destination: "/dashboard/settings",
        permanent:true
      },
    ];
  }
};

export default nextConfig;
