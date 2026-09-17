import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  images: {
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
