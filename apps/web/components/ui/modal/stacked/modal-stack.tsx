import { useAtomValue } from 'jotai'
import { AnimatePresence } from 'motion/react'

import { modalStackAtom } from './atom'
import { useModalStack } from './hooks'
import { ModalInternal } from './modal'
import { useModalStackCalculationAndEffect } from './modal-stack.shared'
import { useEffect } from 'react'

export const ModalStack = () => {
  const { present } = useModalStack()
  useEffect(() => {
    window.presentModal = present
    // Cleanup function to remove it when the component unmounts
    return () => {
      // @ts-expect-error
      delete window.presentModal
    }
  }, [present])

  const stack = useAtomValue(modalStackAtom)

  const { topModalIndex, overlayOptions } = useModalStackCalculationAndEffect()

  return (
    <AnimatePresence mode="popLayout">
      {stack.map((item, index) => (
        <ModalInternal
          key={item.id}
          item={item}
          index={index}
          isTop={index === topModalIndex}
          isBottom={index === 0}
          overlayOptions={overlayOptions}
        />
      ))}
    </AnimatePresence>
  )
}
