/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["mongoose", "geoip-lite"],
  outputFileTracingIncludes: {
    "/api/**": ["./node_modules/geoip-lite/data/**"],
  },
};

export default nextConfig;
