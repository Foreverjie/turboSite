import React, { Fragment, ReactElement, useEffect } from 'react'
import { debounce } from 'lodash'
import { Loader2Icon } from 'lucide-react'
import { trpc } from '../../utils/trpc'
import PostCard from './PostCard'
import PostCardLoading from './PostCardLoading'
import { usePullToRefresh } from '../../hooks/common/use-pull-to-refresh'

const Feed = (): ReactElement => {
  const PAGE_COUNT = 10
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = React.useState(false)

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
    isRefetching,
  } = trpc.post.all.useInfiniteQuery(
    {
      limit: PAGE_COUNT,
    },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
    },
  )

  const handleScroll = () => {
    if (containerRef.current && typeof window !== 'undefined') {
      const container = containerRef.current
      const { bottom } = container.getBoundingClientRect()
      const { innerHeight } = window
      setIsInView(prev => bottom <= innerHeight)
    }
  }

  useEffect(() => {
    const handleDebouncedScroll = debounce(
      () => data?.pageParams && handleScroll(),
      200,
    )
    window.addEventListener('scroll', handleDebouncedScroll)
    return () => {
      window.removeEventListener('scroll', handleDebouncedScroll)
    }
  }, [data?.pageParams])

  useEffect(() => {
    if (isInView && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isInView])

  const { showRefresh } = usePullToRefresh(containerRef, refetch)

  return (
    <div ref={containerRef}>
      {(isRefetching || showRefresh) && (
        <div className="flex justify-center my-4">
          <Loader2Icon
            className={`${isRefetching ? 'animate-spin' : undefined}`}
          />
        </div>
      )}
      {isLoading && [1, 2, 3, 4].map(i => <PostCardLoading key={i} />)}
      {data?.pages.map(page =>
        page?.posts?.map(post => <PostCard key={post.id} {...post} />),
      )}
      {isFetchingNextPage && (
        <div className="flex justify-center my-4">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
    </div>
  )
}

export default Feed
