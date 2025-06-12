const isWebBuild = !!process.env.WEB_BUILD || !!process.env.VERCEL

module.exports = {
  plugins: {
    tailwindcss: {},
    'tailwindcss/nesting': {},

    autoprefixer: {},
    cssnano: {},

    // ...(isWebBuild ? { autoprefixer: {} } : {}),
    // ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
