/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ["static.coinstats.app", "upload.wikimedia.org"],
    // formats: ["image/avif", "image/webp", "image/png", "image/jpg"],
  },
};

module.exports = nextConfig;
