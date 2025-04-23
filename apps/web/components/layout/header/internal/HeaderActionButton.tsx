import { cn } from 'ui/src/utils'
import type { JSX } from 'react'
import { forwardRef } from 'react'

export const HeaderActionButton = forwardRef<
  HTMLButtonElement,
  JSX.IntrinsicElements['button']
>(({ children, ...rest }, ref) => (
  <button
    ref={ref}
    role="button"
    tabIndex={1}
    className={cn(
      'group size-10 rounded-full bg-base-100',
      'px-3 text-sm ring-1 ring-zinc-900/5 transition dark:ring-white/10 dark:hover:ring-white/20',

      'center flex',
    )}
    {...rest}
    aria-label="Header Action"
  >
    {children}
  </button>
))

HeaderActionButton.displayName = 'HeaderActionButton'
