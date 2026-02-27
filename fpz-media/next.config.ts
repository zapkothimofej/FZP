import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Type checking is run separately via tsc; skip during build to avoid OOM on constrained CI
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
