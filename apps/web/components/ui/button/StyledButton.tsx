import Link from 'next/link'
import type { FC, PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

import { ButtonMotionBase } from 'ui'
import { cn } from 'ui/src/utils'

const variantStyles = tv({
  base: 'inline-flex select-none cursor-default items-center gap-2 justify-center rounded-lg py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
  variants: {
    variant: {
      primary: cn(
        'bg-accent text-zinc-100',
        'hover:contrast-[1.10] active:contrast-125',
        'font-semibold',
        'disabled:cursor-not-allowed disabled:bg-accent/40 disabled:opacity-80 disabled:dark:text-zinc-50',
        'dark:text-neutral-800',
      ),
      secondary: cn(
        'group rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20',
        'disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-80 disabled:dark:bg-gray-800 disabled:dark:text-zinc-50',
      ),
      link: cn(
        'text-neutral hover:underline px-0 py-0',
        'disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-80 disabled:dark:bg-gray-800 disabled:dark:text-zinc-50',
      ),
    },
  },
})
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string
}
type NativeLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type SharedProps = {
  variant?: 'primary' | 'secondary' | 'link'
  className?: string
  isLoading?: boolean
}
type ButtonProps = SharedProps & (NativeButtonProps | NativeLinkProps)

export const StyledButton: FC<ButtonProps> = ({
  variant = 'primary',
  className,
  isLoading,
  href,
  children,
  ...props
}) => {
  const commonProps = {
    className: variantStyles({
      variant,
      className: cn(className, isLoading && 'relative text-transparent'),
    }),
    ...(props as any),
  }

  const loadingSpinner = isLoading ? (
    <div className="loading loading-spinner size-5" />
  ) : null

  return href ? (
    <Link href={href} {...commonProps}>
      {isLoading ? loadingSpinner : children}
    </Link>
  ) : (
    <ButtonMotionBase {...commonProps} disabled={isLoading}>
      {isLoading ? loadingSpinner : children}
    </ButtonMotionBase>
  )
}
