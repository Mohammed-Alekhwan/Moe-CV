/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/Moe-CV",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
