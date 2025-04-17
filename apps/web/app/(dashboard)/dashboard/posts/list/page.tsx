'use client'

import { useRouter } from 'next/navigation'
import { ButtonMotionBase } from 'ui'
import { PageLoading } from '~/components/layout/PageLoading'
import { CardMasonry } from '~/components/writing/CardMasonry'
import { trpc } from '~/utils/trpc'
import { OffsetHeaderLayout } from '../../../../../components/Dashboard/layouts'
import { LoadMoreIndicator } from '../../../../../components/shared/LoadMoreIndicator'

export default (function Page() {
  const {
    data: userPosts,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = trpc.post.meAll.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
    },
  )

  // const router = useRouter()
  if (isLoading) return <PageLoading />

  return (
    <div className="relative mt-8">
      {userPosts?.pages.map((page, index) => (
        <CardMasonry data={page.posts} key={index} />
      ))}

      {hasNextPage && (
        <LoadMoreIndicator
          onLoading={() => {
            fetchNextPage()
          }}
        />
      )}

      {/* <OffsetHeaderLayout>
        <ButtonMotionBase
          onClick={() => {
            router.push('/dashboard/posts/edit')
          }}
          className="card-shadow"
        >
          <i className="i-mingcute-add-line text-white" />
        </ButtonMotionBase>
      </OffsetHeaderLayout> */}
    </div>
  )
})
