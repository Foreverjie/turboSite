/** @type {import('next').NextConfig} */
// const withTM = require('next-transpile-modules')(['ui'])

module.exports = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ['ui', 'tailwind-config'],
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
}
