import type { ReactNode } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../tooltip'
import { cn } from 'ui/src/utils'

export const PeekModalBaseButton = ({
  onClick,
  className,
  label,
  icon,
}: {
  onClick: () => void
  className?: string
  label: string
  icon: ReactNode
}) => {
  return (
    <Tooltip>
      <TooltipTrigger
        type="button"
        aria-label={label}
        className={cn(
          'no-drag-region center bg-background ring-border flex size-8 rounded-full p-1 shadow-sm ring-1 empty:hidden',
          className,
        )}
        onClick={onClick}
      >
        {icon}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
