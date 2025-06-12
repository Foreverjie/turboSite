import { TitleMarquee } from '~/components/ui/marquee'
import dayjs from 'dayjs'

// import { useEntryIsRead } from '~/hooks/biz/useAsRead'

import { cn } from 'ui/src/utils'
import { FeedTitle } from '../components/FeedTitle'
import { FeedIcon } from '~/components/feed/feed-icon'
import { PostAllOutput } from '~/server/schemas/posts'

interface GridItemProps {
  children?: React.ReactNode
  wrapperClassName?: string
  post: PostAllOutput['posts'][number]
}
export function GridItem({ wrapperClassName, children, post }: GridItemProps) {
  return (
    <div className={cn('p-1.5', wrapperClassName)}>
      {children}
      <GridItemFooter post={post} />
    </div>
  )
}

export const GridItemFooter = ({
  // classNames

  titleClassName,
  descriptionClassName,
  timeClassName,
  post,
}: GridItemProps & {
  titleClassName?: string
  descriptionClassName?: string
  timeClassName?: string
}) => {
  return (
    <div className={cn('relative px-2 text-sm')}>
      <div className="flex items-center">
        {/* <div
          className={cn(
            'bg-accent mr-1 size-1.5 shrink-0 self-center rounded-full duration-200',
          )}
        /> */}
        <div
          className={cn(
            'relative mb-1 mt-1.5 flex w-full items-center gap-1 truncate font-medium',
            titleClassName,
          )}
        >
          <TitleMarquee className="min-w-0 grow">{post.title}</TitleMarquee>
        </div>
      </div>
      <div className="flex items-center gap-1 truncate text-[13px]">
        <FeedIcon fallback className="mr-0.5 flex" size={18} />
        <span className={cn('min-w-0 truncate', descriptionClassName)}>
          <FeedTitle title={post.title} />
        </span>
        <span className={cn('text-zinc-500', timeClassName)}>·</span>
        <span className={cn('text-zinc-500', timeClassName)}>
          {dayjs
            .duration(
              dayjs().diff(dayjs(post.publicationDate), 'minute'),
              'minute',
            )
            .humanize()}
        </span>
      </div>
    </div>
  )
}
