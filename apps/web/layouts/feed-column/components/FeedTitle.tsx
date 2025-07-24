import { cn } from 'ui/src/utils'
import { EllipsisHorizontalTextWithTooltip } from '~/components/ui/typography/EllipsisWithTooltip'

export const FeedTitle = ({
  className,
  titleClassName,
  title,
  style,
}: {
  className?: string
  titleClassName?: string
  title?: string | null
  style?: React.CSSProperties
}) => {
  return (
    <div
      className={cn('flex select-none items-center truncate', className)}
      style={style}
    >
      <EllipsisHorizontalTextWithTooltip
        className={cn('truncate', titleClassName)}
      >
        {title}
      </EllipsisHorizontalTextWithTooltip>
    </div>
  )
}
