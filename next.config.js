/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [20, 32, 48, 64, 96, 128, 256, 384],
  }
}

module.exports = nextConfig
