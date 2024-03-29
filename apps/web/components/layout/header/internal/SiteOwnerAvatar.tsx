'use client'

import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'

import { cn } from 'ui/src/utils'
import {
  useAggregationSelector,
  useAppConfigSelector,
} from '~/providers/root/aggregation-data-provider'

export const SiteOwnerAvatar: Component = ({ className }) => {
  //   const liveId = useAppConfigSelector(
  //     (config) => config.module?.bilibili?.liveId,
  //   )

  const isLiving = false
  //   const { data: isLiving } = useQuery({
  //     queryKey: ['live-check'],
  //     queryFn: () =>
  //       fetch(`/api/bilibili/check_live?liveId=${liveId}`, {
  //         next: {
  //           revalidate: 1,
  //         },
  //       })
  //         .then((res) => res.json())
  //         .catch(() => null),
  //     select: useCallback((data: any) => {
  //       return !!data
  //     }, []),
  //     refetchInterval: 1000 * 60,
  //     enabled: !!liveId,
  //     meta: {
  //       persist: false,
  //     },
  //   })

  return (
    <div
      role={isLiving ? 'button' : 'img'}
      className={cn(
        'overflow pointer-events-none relative z-[9] select-none',

        isLiving ? 'cursor-pointer rounded-full' : '',
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={'https://avatars.githubusercontent.com/u/20612607?v=4'}
        alt="Site Owner Avatar"
        width={40}
        height={40}
        className={cn(
          'ring-2 ring-slate-200 dark:ring-neutral-800',
          isLiving ? 'rounded-full' : 'mask mask-squircle',
        )}
      />
      {isLiving && (
        <>
          <p className="absolute bottom-0 right-0 z-[1] rounded-md bg-red-400 p-1 font-[system-ui] text-[6px] text-white dark:bg-orange-700">
            LIVE
          </p>

          <div className="absolute inset-0 scale-100 animate-ping rounded-full ring-2 ring-red-500/80" />
        </>
      )}
    </div>
  )
}
