/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  basePath: '/app/stock',   // ✅ Added basePath
};

module.exports = nextConfig;
