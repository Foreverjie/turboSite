import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type OS = 'macOS' | 'iOS' | 'Windows' | 'Android' | 'Linux' | ''

declare const window: {
  platform: NodeJS.Platform
  navigator: Navigator
}

export const once = <T>(fn: () => T): (() => T) => {
  let first = true
  let value: T
  return () => {
    if (first) {
      first = false
      value = fn()
      return value
    }
    return value
  }
}

export const getOS = once((): OS => {
  if (window.platform) {
    switch (window.platform) {
      case 'darwin': {
        return 'macOS'
      }
      case 'win32': {
        return 'Windows'
      }
      case 'linux': {
        return 'Linux'
      }
    }
  }

  const { userAgent } = window.navigator,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod']
  const platform =
    window.navigator.userAgentData?.platform || window.navigator.platform
  let os = platform

  if (macosPlatforms.includes(platform)) {
    os = 'macOS'
  } else if (iosPlatforms.includes(platform)) {
    os = 'iOS'
  } else if (windowsPlatforms.includes(platform)) {
    os = 'Windows'
  } else if (/Android/.test(userAgent)) {
    os = 'Android'
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux'
  }

  return os as OS
})
