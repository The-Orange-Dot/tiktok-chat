import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.240"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.com",
      },
      {
        protocol: "https",
        hostname: "*.net",
      },
    ],
  },
};

export default nextConfig;

//p16-sign-sg.tiktokcdn.com
//    remotePatterns: ["new URL("https://p16-sign-va.tiktokcdn.com"), "p16-sign-sg.tiktokcdn.com""],
// ibytedtos.com
