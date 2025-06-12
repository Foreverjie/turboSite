import type { FC, PropsWithChildren } from 'react'
import { cn } from 'ui/src/utils'

export const EntryItemWrapper: FC<
  {
    itemClassName?: string
    style?: React.CSSProperties
  } & PropsWithChildren
> = ({ children, itemClassName, style }) => {
  return (
    <div style={style}>
      <div
        className={cn(
          'hover:bg-theme-item-hover relative duration-200',
          'px-2',
          //   (isActive || isContextMenuOpen) && '!bg-theme-item-active',
          itemClassName,
        )}
      >
        {children}
      </div>
    </div>
  )
}
