import { sheetStackAtom } from '../../sheet/context'
import { produce } from 'immer'
import { useAtomValue, useSetAtom } from 'jotai'
import { AnimatePresence } from 'motion/react'
import { createElement, useEffect, useMemo, useRef } from 'react'
import { useEventCallback } from 'usehooks-ts'

import { modalStackAtom } from './atom'
import { MODAL_STACK_Z_INDEX } from './constants'
import type { CurrentModalContentProps, ModalActionsInternal } from './context'
import { CurrentModalContext } from './context'
import { useModalStack } from './hooks'
import { ModalInternal } from './modal'
import { useModalStackCalculationAndEffect } from './modal-stack.shared'
import type { ModalProps } from './types'
import { PresentSheet, SheetRef } from '../../sheet'
import { jotaiStore } from '~/lib/store'

export const ModalStack = () => {
  const { present } = useModalStack()

  const stack = useAtomValue(modalStackAtom)

  useEffect(() => {
    window.presentModal = present
  }, [present])

  const { topModalIndex, overlayOptions } = useModalStackCalculationAndEffect()

  return (
    <AnimatePresence mode="popLayout">
      {stack.map((item, index) => {
        const shouldUseModal = !!item.CustomModalComponent
        if (!shouldUseModal)
          return <ModalToSheet {...item} key={item.id} index={index} />
        return (
          <ModalInternal
            key={item.id}
            item={item}
            index={index}
            isTop={index === topModalIndex}
            isBottom={index === 0}
            overlayOptions={overlayOptions}
          />
        )
      })}
    </AnimatePresence>
  )
}

const ModalToSheet = (props: ModalProps & { index: number; id: string }) => {
  const sheetRef = useRef<SheetRef>(null)
  const drawerLength = useRef(jotaiStore.get(sheetStackAtom).length).current
  const { title, content, id } = props

  const close = useEventCallback(() => {
    setStack(p => p.filter(modal => modal.id !== id))
  })

  const setStack = useSetAtom(modalStackAtom)
  // TODO Compatible with other modal stack methods
  const ModalProps: ModalActionsInternal = useMemo(
    () => ({
      dismiss: () => {
        sheetRef.current?.dismiss().then(() => {
          close()
        })
      },
      getIndex: () => props.index,
      setClickOutSideToDismiss: v => {
        setStack(state =>
          produce(state, draft => {
            const model = draft.find(modal => modal.id === id)
            if (!model) return
            if (model.clickOutsideToDismiss === v) return
            model.clickOutsideToDismiss = v
          }),
        )
      },
    }),
    [close, id, props.index, setStack],
  )
  const modalContentRef = useRef<HTMLDivElement>(null)
  const modalElementRef = useRef<HTMLDivElement>(null)
  const ModalContextProps = useMemo<CurrentModalContentProps>(
    () => ({
      ...ModalProps,
      ref: modalContentRef,
      modalElementRef,
    }),
    [ModalProps],
  )

  const finalChildren = (
    <CurrentModalContext.Provider value={ModalContextProps}>
      {createElement(content, ModalProps)}
    </CurrentModalContext.Provider>
  )

  return (
    <PresentSheet
      ref={sheetRef}
      title={title}
      contentRef={modalContentRef}
      defaultOpen
      zIndex={MODAL_STACK_Z_INDEX + drawerLength}
      onOpenChange={open => {
        if (!open) {
          setTimeout(() => {
            close()
          }, 1000)
        }
      }}
      content={finalChildren}
    />
  )
}
