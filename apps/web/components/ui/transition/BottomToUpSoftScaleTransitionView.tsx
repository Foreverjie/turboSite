'use client'

import { softBouncePreset } from './spring'
import { createTransitionView } from './factor'

export const BottomToUpSoftScaleTransitionView = createTransitionView({
  from: { opacity: 0.001, y: 50 },
  to: { opacity: 1, y: 0 },
  preset: softBouncePreset,
})
