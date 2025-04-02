'use client'

import { softBouncePreset } from './spring'

import { createTransitionView } from './factor'

export const BottomToUpTransitionView = createTransitionView({
  from: {
    y: 50,
    opacity: 0.001,
  },
  to: {
    y: 0,
    opacity: 1,
  },
  preset: softBouncePreset,
})
