import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingIncludes: {
    "/*": ["./src/lib/models/**/*"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
