/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
