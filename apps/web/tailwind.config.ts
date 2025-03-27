import { withUt } from 'uploadthing/tw'
import { withTV } from 'tailwind-variants/transformer'

/** @type {import('tailwindcss').Config} */
const sharedConfig = require('tailwind-config')
module.exports = withTV(
  withUt({
    ...sharedConfig,
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './layout/**/*.{js,ts,jsx,tsx,mdx}',
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      '../../packages/ui/src/*.{js,ts,jsx,tsx,mdx}',
    ],
  }),
)
