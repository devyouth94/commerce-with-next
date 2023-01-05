/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'raw.githubusercontent.com'],
  },
};

module.exports = nextConfig;
