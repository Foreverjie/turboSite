import type { Spring, Target } from 'motion/react'

import { microReboundPreset } from '~/components/ui/transition/spring'

const enterStyle: Target = {
  scale: 1,
  opacity: 1,
}
const initialStyle: Target = {
  scale: 0.96,
  opacity: 0,
}

export const modalMontionConfig: {
  initial: Target
  animate: Target
  exit: Target
  transition: Spring
} = {
  initial: initialStyle,
  animate: enterStyle,
  exit: initialStyle,
  transition: microReboundPreset,
}

export const MODAL_STACK_Z_INDEX = 100
