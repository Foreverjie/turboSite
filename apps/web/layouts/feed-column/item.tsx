import type { FC } from 'react'
import { memo } from 'react'

import { VideoItem } from './components/VideoItem'
import { EntryItemWrapper } from './layout/EntryItemWrapper'
import { PostAllOutput } from '~/server/schemas/posts'

function EntryItemImpl({
  post,
}: {
  post?: PostAllOutput['posts'][number]
} = {}) {
  return (
    <EntryItemWrapper>
      <VideoItem post={post} />
    </EntryItemWrapper>
  )
}

export const EntryItem: FC<{ post: PostAllOutput['posts'][number] }> = memo(
  ({ post }) => {
    return <EntryItemImpl post={post} />
  },
)

export const EntryVirtualListItem = ({
  ref,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  ref?: React.Ref<HTMLDivElement | null>
}) => {
  return (
    <div
      className="absolute left-0 top-0 w-full will-change-transform"
      ref={ref}
      {...props}
    >
      <EntryItemImpl />
    </div>
  )
}
