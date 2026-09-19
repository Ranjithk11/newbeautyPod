import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  images: {
    dangerouslyAllowSVG: true,
  },
  outputFileTracingIncludes: {
    "/api/enquiry": [
      "./src/assets/beautypod-brochure.jpg",
      "./public/beautypod-brochure.jpg",
    ],
  },
};

export default nextConfig;
