import { LoadingCircle } from '~/components/ui/loading'
import type { FeedViewType } from '~/constants'
import { cn } from 'ui/src/utils'
import type { FC } from 'react'
import { memo } from 'react'

// import { getSkeletonItemComponentByView } from './Items/getSkeletonItemComponentByView'
import { girdClassNames } from './styles'
import { VideoItem } from './components/VideoItem'

const LoadingCircleFallback = (
  <div className="center mt-2">
    <LoadingCircle size="medium" />
  </div>
)
export const EntryItemSkeleton: FC<{
  count?: number
}> = memo(({ count = 10 }) => {
  const SkeletonItem = VideoItem
  // const SkeletonItem = getSkeletonItemComponentByView(view)

  if (!SkeletonItem) {
    return LoadingCircleFallback
  }

  if (count === 1) {
    return <SkeletonItem />
  }

  return (
    <div className={girdClassNames}>
      {Array.from({ length: count }).map((_, index) => (
        // eslint-disable-next-line @eslint-react/no-array-index-key -- index is unique
        <div key={index}>{<SkeletonItem />}</div>
      ))}
    </div>
  )
})
