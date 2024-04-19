'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { typescriptHappyForwardRef } from 'foxact/typescript-happy-forward-ref'
import { AnimatePresence, motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import type { PropsWithChildren, ReactNode } from 'react'

import { cn } from 'ui/src/utils'

import { RootPortal } from '../portal'
import { useIsMobile } from '../../../utils/viewport'
import { PageScrollInfoContext } from '../../../providers/root/page-scroll-info-provider'

export interface FABConfig {
  id: string
  icon: JSX.Element
  onClick: () => void
}

export const FABBase = typescriptHappyForwardRef(
  (
    props: PropsWithChildren<
      {
        id: string
        show?: boolean
        children: JSX.Element
      } & HTMLMotionProps<'button'>
    >,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const { children, show = true, ...extra } = props
    const { className, ...rest } = extra

    return (
      <AnimatePresence mode="wait">
        {show && (
          <motion.button
            ref={ref}
            aria-label="Floating action button"
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.3, scale: 0.8 }}
            className={cn(
              'mt-2 flex items-center justify-center',
              'size-12 text-lg md:size-10 md:text-base',
              'outline-accent hover:opacity-100 focus:opacity-100 focus:outline-none',
              'rounded-xl border border-zinc-400/20 backdrop-blur-lg dark:border-zinc-500/30 dark:text-zinc-200',
              'bg-zinc-50/80 shadow-lg dark:bg-neutral-900/80',
              'transition-all duration-500 ease-in-out',

              className,
            )}
            {...rest}
          >
            {children}
          </motion.button>
        )}
      </AnimatePresence>
    )
  },
)

export const FABPortable = typescriptHappyForwardRef(
  (
    props: {
      children: React.JSX.Element

      onClick: () => void
      onlyShowInMobile?: boolean
      show?: boolean
    },
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const { onClick, children, show = true } = props
    const id = useId()
    const { element: portalElement } = useContext(FABContainerElementContext)
    const isMobile = useIsMobile()

    if (props.onlyShowInMobile && !isMobile) return null
    if (!portalElement) return null

    return (
      <RootPortal to={portalElement}>
        <FABBase ref={ref} id={id} show={show} onClick={onClick}>
          {children}
        </FABBase>
      </RootPortal>
    )
  },
)

const FABContainerElementContext = createContext({
  element: null as HTMLDivElement | null,
})

export const FABContainer = (props: { children?: ReactNode }) => {
  const isMobile = useIsMobile()

  const { direction } = useContext(PageScrollInfoContext) || { direction: null }

  const [shouldHide, setShouldHide] = useState(false)

  const [element, setElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isMobile) {
      setShouldHide(direction === 'up')
    }
  }, [direction, isMobile])

  const fabContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setElement(fabContainerRef.current)
  }, [])

  return (
    <FABContainerElementContext.Provider value={{ element }}>
      <div
        ref={fabContainerRef}
        data-testid="fab-container"
        data-hide-print
        className={cn(
          'font-lg fixed bottom-[calc(2rem+env(safe-area-inset-bottom))] left-[calc(100vw-3rem-1rem)] z-[9] flex flex-col',
          shouldHide ? 'translate-x-[calc(100%+2rem)]' : '',
          'transition-transform duration-300 ease-in-out',
        )}
      >
        {props.children}
      </div>
    </FABContainerElementContext.Provider>
  )
}
