'use client'

import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { useRouter } from 'next/navigation'

import { useViewport } from '~/utils/viewport'
import { useResolveAdminUrl } from '~/utils/url'
import { useSingleAndDoubleClick } from '~/hooks/common/use-single-double-click'
import { Routes } from '~/utils/route-builder'
import { useAppConfigSelector } from '~/providers/root/aggregation-data-provider'

import { Activity } from './Activity'
import { useHeaderMetaShouldShow } from './hooks'
import { SiteOwnerAvatar } from './SiteOwnerAvatar'
import { Bilibili } from '~/app/config'
import { trpc } from '~/utils/trpc'
import { UserType } from '@prisma/client'

// const TapLogo = () => {
//   const { isSignedIn } = {
//     isSignedIn: true,
//   }

//   const router = useRouter()

//   const { data: isLiving } = useQuery({
//     queryKey: ['live-check'],
//     enabled: false,
//   })

//   const { liveId } = (useAppConfigSelector().appConfig?.module.bilibili ||
//     {}) as Bilibili

//   const goLive = useCallback(() => {
//     window.open(`https://live.bilibili.com/${liveId}`)
//   }, [liveId])

//   const resolveAdminUrl = useResolveAdminUrl()

//   const fn = useSingleAndDoubleClick(
//     () => {
//       if (isLiving) return goLive()
//       router.push(Routes.Home)
//     },
//     () => {
//       if (isSignedIn && userData?.role === UserType.ADMIN) {
//         location.href = resolveAdminUrl()

//         return
//       }
//       router.push(
//         `${Routes.Login}?redirect=${encodeURIComponent(location.pathname)}`,
//       )
//     },
//   )
//   // return <Logo onClick={fn} className="cursor-pointer" />
//   return (
//     <button onClick={fn}>
//       <SiteOwnerAvatar className="cursor-pointer" />
//       <span className="sr-only">Owner Avatar</span>
//     </button>
//   )
// }
export const AnimatedLogo = () => {
  const shouldShowMeta = useHeaderMetaShouldShow()

  const viewport = useViewport()
  const isDesktop = viewport?.lg && viewport?.w !== 0

  if (isDesktop)
    return (
      <>
        {/* <TapLogo /> */}
        <Activity />
      </>
    )

  return (
    <AnimatePresence>
      {!shouldShowMeta && (
        <m.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // className="scale-75"
        >
          <Activity />
          {/* <TapLogo /> */}
        </m.div>
      )}
    </AnimatePresence>
  )
}
