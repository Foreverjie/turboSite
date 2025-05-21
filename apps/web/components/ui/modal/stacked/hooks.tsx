import { ButtonMotionBase as Button } from 'ui'
import { atom, useAtomValue } from 'jotai'
import type { DragControls } from 'motion/react'
import type { ResizeCallback, ResizeStartCallback } from 're-resizable'
import { use, useState } from 'react'
import { flushSync } from 'react-dom'
// import { useTranslation } from 'react-i18next'
import { useContextSelector } from 'use-context-selector'
import { useEventCallback } from 'usehooks-ts'

import { jotaiStore } from '~/lib/store'

import { modalStackAtom } from './atom'
import { ModalEventBus } from './bus'
import {
  CurrentModalContext,
  CurrentModalStateContext,
  PresentModalContextInternal,
} from './context'
import type { DialogInstance, ModalProps } from './types'

export const modalIdToPropsMap = {} as Record<string, ModalProps>
export const useModalStack = () => {
  const present = use(PresentModalContextInternal)

  return {
    present,
    ...actions,
  }
}
const actions = {
  getTopModalStack() {
    return jotaiStore.get(modalStackAtom).at(-1)
  },
  getModalStackById(id: string) {
    return jotaiStore.get(modalStackAtom).find(item => item.id === id)
  },
  dismiss(id: string) {
    ModalEventBus.dispatch('MODAL_DISPATCH', {
      type: 'dismiss',
      id,
    })
  },
  dismissTop() {
    const topModal = actions.getTopModalStack()

    if (!topModal) return
    actions.dismiss(topModal.id)
  },
  dismissAll() {
    const modalStack = jotaiStore.get(modalStackAtom)
    modalStack.forEach(item => actions.dismiss(item.id))
  },
}

export const useCurrentModal = () => use(CurrentModalContext)

export const useIsInModal = () =>
  useContextSelector(CurrentModalStateContext, v => v.isInModal)

export const useResizeableModal = (
  modalElementRef: React.RefObject<HTMLDivElement | null>,
  {
    enableResizeable,
    dragControls,
  }: {
    enableResizeable: boolean
    dragControls?: DragControls
  },
) => {
  const [resizeableStyle, setResizeableStyle] = useState(
    {} as React.CSSProperties,
  )
  const [isResizeable, setIsResizeable] = useState(false)
  const [preferDragDir, setPreferDragDir] = useState<'x' | 'y' | null>(null)

  const relocateModal = useEventCallback(() => {
    if (!enableResizeable) return
    if (isResizeable) return
    const $modalElement = modalElementRef.current
    if (!$modalElement) return

    const rect = $modalElement.getBoundingClientRect()
    const { x, y } = rect

    flushSync(() => {
      setIsResizeable(true)
      setResizeableStyle({
        position: 'fixed',
        top: `${y}px`,
        left: `${x}px`,
      })
    })
  })
  const handleResizeStart = useEventCallback(((e, dir) => {
    if (!enableResizeable) return
    relocateModal()

    const hasTop = /top/i.test(dir)
    const hasLeft = /left/i.test(dir)
    if (hasTop || hasLeft) {
      dragControls?.start(e as any)
      if (hasTop && hasLeft) {
        setPreferDragDir(null)
      } else if (hasTop) {
        setPreferDragDir('y')
      } else if (hasLeft) {
        setPreferDragDir('x')
      }
    }
  }) satisfies ResizeStartCallback)
  const handleResizeStop = useEventCallback((() => {
    setPreferDragDir(null)
  }) satisfies ResizeCallback)

  return {
    resizeableStyle,
    isResizeable,
    relocateModal,
    handleResizeStart,
    handleResizeStop,
    preferDragDir,
  }
}

export const useIsTopModal = () =>
  useContextSelector(CurrentModalStateContext, v => v.isTop)

export const useDialog = (): DialogInstance => {
  const { present } = useModalStack()
  //   const { t } = useTranslation()
  return {
    ask: useEventCallback(options => {
      return new Promise<boolean>(resolve => {
        present({
          title: options.title,
          content: ({ dismiss }) => (
            <div className="flex max-w-[75ch] flex-col gap-3">
              {options.message}

              <div className="flex items-center justify-end gap-3">
                <Button
                  //   variant="outline"
                  onClick={() => {
                    options.onCancel?.()
                    resolve(false)
                    dismiss()
                  }}
                >
                  {/* {options.cancelText ?? t('words.cancel', { ns: 'common' })} */}
                  {options.cancelText ?? 'Cancel'}
                </Button>
                <Button
                  onClick={() => {
                    options.onConfirm?.()
                    resolve(true)
                    dismiss()
                  }}
                >
                  {/* {options.confirmText ?? t('words.confirm', { ns: 'common' })} */}
                  {options.confirmText ?? 'Confirm'}
                </Button>
              </div>
            </div>
          ),
          canClose: true,
          clickOutsideToDismiss: false,
        })
      })
    }),
  }
}

const modalStackLengthAtom = atom(get => get(modalStackAtom).length)
export const useHasModal = () => useAtomValue(modalStackLengthAtom) > 0
