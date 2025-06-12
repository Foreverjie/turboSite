import type { Range, VirtualItem, Virtualizer } from '@tanstack/react-virtual'
import { defaultRangeExtractor, useVirtualizer } from '@tanstack/react-virtual'
import type { HTMLMotionProps } from 'motion/react'
import type { FC, MutableRefObject, ReactNode } from 'react'
import {
  Fragment,
  memo,
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
// import { useTranslation } from "react-i18next"
import { useEventCallback } from 'usehooks-ts'

import { m } from 'motion/react'
// import { EntryColumnShortcutHandler } from './EntryColumnShortcutHandler'
import { EntryVirtualListItem } from './item'
import { cn } from 'ui/src/utils'
import { LRUCache } from '~/utils/lru-cache'
import { DateItem } from './components/DateItem'
import { useScrollViewElement } from '~/components/ui/scroll-area/hooks'
import { useTypeScriptHappyCallback } from '~/hooks/common/use-typescript-happy-callback'
import { EmptyIcon } from '~/icons/empty'
import { PostAllOutput } from '~/server/schemas/posts'

export const EntryEmptyList = ({
  ref,
  ...props
}: HTMLMotionProps<'div'> & { ref?: React.Ref<HTMLDivElement | null> }) => {
  // const { t } = useTranslation()
  return (
    <m.div
      className="absolute -mt-6 flex size-full grow flex-col items-center justify-center gap-2 text-zinc-400"
      {...props}
      ref={ref}
    >
      <div className="flex -translate-y-6 flex-col items-center justify-center gap-2">
        <EmptyIcon className="size-[30px]" />
        <span className="text-base">{'zero items'}</span>
      </div>
    </m.div>
  )
}

export type EntryListProps = {
  // feedId: string
  data: PostAllOutput['posts']
  entriesIds?: string[]

  hasNextPage: boolean
  fetchNextPage: () => void
  refetch: () => void

  groupCounts?: number[]
  gap?: number

  Footer?: FC | ReactNode

  onRangeChange?: (range: Range) => void

  listRef?: MutableRefObject<Virtualizer<HTMLElement, Element> | undefined>
}

const capacity = 3
const offsetCache = new LRUCache<string, number>(capacity)
const measurementsCache = new LRUCache<string, VirtualItem[]>(capacity)
// Prevent scroll list move when press up/down key, the up/down key should be taken over by the shortcut key we defined.
const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
  }
}
export const EntryList: FC<EntryListProps> = memo(
  ({
    fetchNextPage,
    refetch,
    hasNextPage,
    groupCounts,
    Footer,
    listRef,
    onRangeChange,
    gap,
  }) => {
    const scrollRef = useScrollViewElement()

    const stickyIndexes = useMemo(
      () =>
        groupCounts
          ? groupCounts.reduce(
              (acc, count, index) => {
                acc[index + 1] = acc[index]! + count
                return acc
              },
              [0],
            )
          : [],
      [groupCounts],
    )

    const cacheKey = `id`
    const rowVirtualizer = useVirtualizer({
      count: 10 + 1,
      estimateSize: () => 112,
      overscan: 5,
      gap,
      getScrollElement: () => scrollRef,
      initialOffset: offsetCache.get(cacheKey) ?? 0,
      initialMeasurementsCache: measurementsCache.get(cacheKey) ?? [],
      onChange: useTypeScriptHappyCallback(
        (virtualizer: Virtualizer<HTMLElement, Element>) => {
          if (!virtualizer.isScrolling) {
            measurementsCache.put(cacheKey, virtualizer.measurementsCache)
            offsetCache.put(cacheKey, virtualizer.scrollOffset ?? 0)
          }

          onRangeChange?.(virtualizer.range as Range)
        },
        [cacheKey],
      ),
      rangeExtractor: useTypeScriptHappyCallback(
        (range: Range) => {
          activeStickyIndexRef.current =
            [...stickyIndexes]
              .reverse()
              .find(index => range.startIndex >= index) ?? 0

          const next = new Set([
            activeStickyIndexRef.current,
            ...defaultRangeExtractor(range),
          ])

          return Array.from(next).sort((a, b) => a - b)
        },
        [stickyIndexes],
      ),
    })

    useEffect(() => {
      if (!listRef) return
      listRef.current = rowVirtualizer
    }, [rowVirtualizer, listRef])

    const handleScrollTo = useEventCallback((index: number) => {
      rowVirtualizer.scrollToIndex(index)
    })

    const activeStickyIndexRef = useRef(0)
    const checkIsActiveSticky = (index: number) =>
      activeStickyIndexRef.current === index
    const checkIsStickyItem = (index: number) => stickyIndexes.includes(index)

    const virtualItems = rowVirtualizer.getVirtualItems()
    // useEffect(() => {
    //   const lastItem = virtualItems.at(-1)

    //   if (!lastItem) {
    //     return
    //   }

    //   const isPlaceholderRow = lastItem.index === 10

    //   if (isPlaceholderRow && hasNextPage) {
    //     fetchNextPage()
    //   }
    // }, [fetchNextPage, hasNextPage, virtualItems])

    const [isScrollTop, setIsScrollTop] = useState(true)

    useEffect(() => {
      const $scrollRef = scrollRef
      if (!$scrollRef) return
      const handleScroll = () => {
        setIsScrollTop($scrollRef.scrollTop <= 0)
      }
      $scrollRef.addEventListener('scroll', handleScroll)

      return () => {
        $scrollRef.removeEventListener('scroll', handleScroll)
      }
    }, [scrollRef])

    const [ready, setReady] = useState(false)

    useEffect(() => {
      startTransition(() => {
        setReady(true)
      })
    }, [])

    return (
      <>
        <div
          onKeyDown={handleKeyDown}
          className={'relative w-full select-text'}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            if (!ready) return null
            // Last placeholder row
            const isLoaderRow = virtualRow.index === 10

            const transform = `translateY(${virtualRow.start}px)`
            if (isLoaderRow) {
              const Content = typeof Footer === 'function' ? <Footer /> : Footer

              return (
                <div
                  ref={rowVirtualizer.measureElement}
                  className="absolute left-0 top-0 w-full will-change-transform"
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  style={{
                    transform,
                  }}
                >
                  {Content}
                </div>
              )
            }
            const isStickyItem = checkIsStickyItem(virtualRow.index)
            const isActiveStickyItem =
              !isScrollTop && checkIsActiveSticky(virtualRow.index)
            return (
              <Fragment key={virtualRow.key}>
                {isStickyItem && (
                  <div
                    className={cn(
                      'bg-background',
                      isActiveStickyItem
                        ? 'sticky top-0 z-[1]'
                        : 'absolute left-0 top-0 w-full will-change-transform',
                    )}
                    style={
                      !isActiveStickyItem
                        ? {
                            transform,
                          }
                        : undefined
                    }
                  >
                    <EntryHeadDateItem
                      entryId={virtualRow.index.toString()}
                      isSticky={isActiveStickyItem}
                    />
                  </div>
                )}

                <EntryVirtualListItem
                  data-index={virtualRow.index}
                  style={{
                    transform,
                    paddingTop: isStickyItem ? '1.75rem' : undefined,
                  }}
                  ref={rowVirtualizer.measureElement}
                />
              </Fragment>
            )
          })}
        </div>

        {/* <EntryColumnShortcutHandler
          refetch={refetch}
          data={entriesIds}
          handleScrollTo={handleScrollTo}
        /> */}
      </>
    )
  },
)

const EntryHeadDateItem: FC<{
  entryId: string
  isSticky?: boolean
}> = memo(({ entryId, isSticky }) => {
  const date = new Date().toDateString()

  return <DateItem isSticky={isSticky} date={date} />
})

EntryHeadDateItem.displayName = 'EntryHeadDateItem'
