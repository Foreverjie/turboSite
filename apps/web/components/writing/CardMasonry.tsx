'use client'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import type { ReactNode } from 'react'

import { useMaskScrollArea } from '~/hooks/shared/use-mask-scroll-area'
import { cn } from 'ui/src/utils'
import { HoverCard, HoverCardTrigger, HoverCardContent } from 'ui'
import { RelativeTime } from '../ui/RelativeTime'
import Link from 'next/link'
import { PostAllOutput } from '../../server/schemas/posts'
import { Tag } from '../ui/tag/Tag'

const columnsCountBreakPoints = {
  0: 1,
  600: 2,
  1024: 3,
  1280: 3,
}

export interface CardProps {
  data: PostAllOutput['posts'][0]
  className?: string
}
export interface CardMasonryProps {
  data: PostAllOutput['posts']
}
export const CardMasonry = (props: CardMasonryProps) => {
  return (
    <div className="m-auto max-w-[1200px]">
      <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
        <Masonry gutter="24px">
          {props.data.map(data => (
            <Card data={data} key={data.postId} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}

export function Card(props: CardProps) {
  const [scrollContainerRef, scrollClassName] =
    useMaskScrollArea<HTMLDivElement>()

  const { className, data } = props

  return (
    <div
      className={cn(
        'relative flex h-[176px] flex-col rounded-md bg-white px-4 py-5 duration-200 card-shadow dark:bg-neutral-950 dark:hover:ring-1 dark:hover:ring-zinc-300',
        className,
      )}
    >
      <div className="flex flex-grow flex-col">
        <div className="line-clamp-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          {'title placeholder'}
        </div>
        {/* {slots?.middle && (
          <div className="mt-2 text-sm text-neutral-800 dark:text-neutral-300">
            {slots.middle?.(data)}
          </div>
        )} */}
        <div
          className={cn(
            'mt-2 h-0 flex-grow overflow-hidden text-sm text-neutral-500 scrollbar-none dark:text-neutral-400',
            scrollClassName,
          )}
          ref={scrollContainerRef}
        >
          {data.content}
        </div>

        <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            {/* <MdiClockOutline /> */}
            <RelativeTime date={data.createdAt} />
            {/* {data?.modified && (
              <HoverCard>
                <HoverCardTrigger className="text-xs">
                  {'(已编辑)'}
                </HoverCardTrigger>
                <HoverCardContent className="text-xs">
                  编辑于 <RelativeTime date={data.modified} />
                </HoverCardContent>
              </HoverCard>
            )} */}
            <HoverCard>
              <HoverCardTrigger>
                <div className="flex items-center gap-2">
                  {/* <FeHash className="translate-y-[0.5px]" /> */}
                  {/* <div>{data.category.name}</div> */}
                  <div>分类：{'测试'}</div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex flex-col gap-1">
                  <div>分类：{'测试'}</div>
                  {/* <div>分类：{data.category.name}</div> */}
                  <div className="flex items-center">
                    <span>标签：</span>
                    <div className="flex gap-2">
                      {['随笔', '测试'].map(tag => (
                        <Tag className="px-2 py-1" text={tag} key={tag} />
                      ))}
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
      <>
        {/* {!!data.pin && (
          <div className="absolute -right-3 -top-3 rounded-full border border-current bg-red-200/80 p-1 text-red-500 dark:bg-red-500/30 dark:text-red-400">
            <PhPushPinFill />
          </div>
        )} */}
        <Link
          className="absolute inset-0 bottom-8 z-[1]"
          href={`/dashboard/posts/edit?id=${data.postId}`}
        />
      </>
    </div>
  )
}
