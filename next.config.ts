import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  fallbacks: {
    document: "/offline",
  },
});

const nextConfig: NextConfig = {
  // Use webpack for build (next-pwa compatibility)
  // Turbopack doesn't support next-pwa yet
  turbopack: {},
};

export default withPWA(nextConfig);
