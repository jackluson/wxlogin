/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['thirdwx.qlogo.cn'], // Allow WeChat avatar domains
  },
}

module.exports = nextConfig 