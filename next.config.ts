import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.com",
      },
      // {
      //   protocol: "https",
      //   hostname: "*.tiktokcdn-eu.com",
      // },
      // {
      //   protocol: "https",
      //   hostname: "*.ibytedtos.com",
      // },
    ],
  },
};

export default nextConfig;

//p16-sign-sg.tiktokcdn.com
//    remotePatterns: ["new URL("https://p16-sign-va.tiktokcdn.com"), "p16-sign-sg.tiktokcdn.com""],
// ibytedtos.com
