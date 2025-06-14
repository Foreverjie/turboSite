import { atom } from 'jotai'

const w = typeof window !== 'undefined' ? window.innerWidth : 0
const h = typeof window !== 'undefined' ? window.innerHeight : 0

const sm = w >= 640
const md = w >= 768
const lg = w >= 1024
const xl = w >= 1280
const _2xl = w >= 1536

export const viewportAtom = atom({
  /**
   * 640px
   */
  sm,

  /**
   * 768px
   */
  md,

  /**
   * 1024px
   */
  lg,

  /**
   * 1280px
   */
  xl,

  /**
   * 1536px
   */
  '2xl': _2xl,

  h,
  w,
})
