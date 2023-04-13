/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['ui'])

module.exports = withTM({
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gravatar.com',
        port: '',
        pathname: '/*',
      },
    ],
  },
})
