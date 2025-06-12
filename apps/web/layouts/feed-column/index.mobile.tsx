// import { useLoginModalShow, useWhoami } from '~/atoms/user'
// import { useDailyTask } from '~/hooks/biz/useDailyTask'

import { Focusable } from '~/components/common/Focusable'
import { useMobile } from '~/hooks/common/use-mobile'
import { trpc } from '~/utils/trpc'
import { EntryEmptyList, EntryList } from './list'
import { EntryColumnWrapper } from './wrapper'
import { EntryColumnGrid } from './grid'
import { EntryListHeader } from './layout/EntryListHeader.mobile'

export const MobileRootLayout = () => {
  // useDailyTask()
  // const isAuthFail = useLoginModalShow()
  // const user = useWhoami()
  const isMobile = useMobile()

  const { data, isLoading, fetchNextPage, refetch, isRefetching } =
    trpc.post.all.useInfiniteQuery(
      {
        limit: 10,
      },
      {
        getNextPageParam: lastPage => lastPage.nextCursor,
      },
    )

  const isEmpty =
    !data || data.pages.length === 0 || data.pages[0].posts.length === 0

  return (
    <Focusable
      data-hide-in-print
      className="@container relative flex h-full flex-1 flex-col"
    >
      <EntryListHeader
        refetch={refetch}
        isRefreshing={isRefetching}
        hasUpdate={false}
      />

      <EntryColumnWrapper onPullToRefresh={refetch} key={'mobile-video'}>
        {isEmpty ? (
          isLoading ? null : (
            <EntryEmptyList />
          )
        ) : (
          <EntryColumnGrid
            gap={10}
            // listRef={listRef}
            // onRangeChange={handleRangeChange}
            hasNextPage={false}
            // feedId={routeFeedId || ''}
            fetchNextPage={() => {
              console.log('fetchNextPage')
            }}
            refetch={() => {
              console.log('refetch')
            }}
            groupCounts={[4]}
            data={data.pages.flatMap(page => page.posts)} // Footer={<FooterMarkItem view={view} />}
          />
        )}
      </EntryColumnWrapper>
    </Focusable>
  )
}
