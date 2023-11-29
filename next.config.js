/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // TODO: Added to protect the app from malicious users
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
