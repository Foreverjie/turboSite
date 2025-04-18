'use client'

import { NormalContainer } from '~/components/layout/container/Normal'
// import { PostsSortingFab } from '~/components/modules/post/fab/PostsSortingFab'
// import { PostTagsFAB } from '~/components/modules/post/fab/PostTagsFAB'
// import { PostItem } from '~/components/modules/post/PostItem'
import { NothingFound } from '~/components/NothingFound'
// import { SearchFAB } from '~/components/modules/shared/SearchFAB'
import { BackToTopFAB } from '~/components/ui/fab'
import { BottomToUpTransitionView } from '~/components/ui/transition/BottomToUpTransitionView'
import { OnlyDesktop } from '~/components/ui/viewport'
import React, { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'
import { Loader2Icon } from 'lucide-react'
import { trpc } from '~/utils/trpc'
import { usePullToRefresh } from '~/hooks/common/use-pull-to-refresh'
import PostCard from '../../../components/Feed/PostCard'

const Page = () => {
  const PAGE_COUNT = 10
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

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

  if (!data?.pages.length && !isLoading) {
    return <NothingFound />
  }
  return (
    <NormalContainer className="w-full">
      <div ref={containerRef}>
        {(isRefetching || isLoading || showRefresh) && (
          <div className="flex justify-center my-4">
            <Loader2Icon
              className={`${isRefetching ? 'animate-spin' : undefined}`}
            />
          </div>
        )}
        <ul>
          {data?.pages.map(page =>
            page.posts.map((post, index) => (
              <BottomToUpTransitionView
                lcpOptimization
                key={post.postId}
                as="li"
                delay={index * 100}
              >
                <PostCard {...post} />
              </BottomToUpTransitionView>
            )),
          )}
        </ul>
      </div>

      {/* <PostsSortingFab />
      <PostTagsFAB />
      <SearchFAB /> */}
      {isFetchingNextPage && (
        <div className="flex justify-center my-4">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
      <BackToTopFAB />

      <OnlyDesktop></OnlyDesktop>
    </NormalContainer>
  )
}

export default Page
