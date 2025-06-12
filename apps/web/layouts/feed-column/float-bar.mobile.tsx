// import { Logo } from "@follow/components/icons/logo.js"
import { ButtonMotionBase } from 'ui'
import { DividerVertical } from '~/components/ui/divider'
import { views } from '~/constants'
import { stopPropagation } from '~/lib/dom'
import { cn } from 'ui/src/utils'
import { m, useAnimationControls } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ProfileButton } from '~/components/layout/header/internal/ProfileButton'
import { MotionButtonBase } from '~/components/ui/button'
import { Logo } from '~/icons/logo'

// import { useAudioPlayerAtomSelector } from '~/atoms/player'
// import { useNavigateEntry } from '~/hooks/biz/useNavigateEntry'
// import { useRouteParamsSelector } from '~/hooks/biz/useRouteParams'
// import { useEntry } from '~/store/entry'
// import { useFeedById } from '~/store/feed'
// import { feedIconSelector } from '~/store/feed/selector'
// import { useViewWithSubscription } from '~/store/subscription/hooks'

// import { PodcastButton } from './components/PodcastButton'

export const MobileFloatBar = ({
  scrollContainer,
  className,
  onLogoClick,
  onViewChange,
}: {
  scrollContainer: Nullable<HTMLDivElement>
  className?: string
  onLogoClick?: () => void
  onViewChange?: (view: number) => void
}) => {
  const [isScrollDown, setIsScrollDown] = useState(false)
  const prevScrollY = useRef(0)
  useEffect(() => {
    if (!scrollContainer) return

    const handler = () => {
      const currentY = scrollContainer.scrollTop

      if (currentY < 30) return

      const isScrollEnd =
        scrollContainer.scrollHeight - currentY - scrollContainer.clientHeight <
        10

      if (isScrollEnd) {
        setIsScrollDown(true)
        return
      }

      setIsScrollDown(currentY > prevScrollY.current)
      prevScrollY.current = currentY
    }
    scrollContainer.addEventListener('scroll', handler)
    return () => scrollContainer.removeEventListener('scroll', handler)
  }, [scrollContainer])

  const animateController = useAnimationControls()

  useEffect(() => {
    if (isScrollDown) {
      const computedStyle = getComputedStyle(document.documentElement)
      const safeAreaBottom = computedStyle.getPropertyValue('--sab')
      animateController.start({
        translateY: `calc(100% + 40px + ${safeAreaBottom})`,
        transition: { type: 'tween', duration: 0.1 },
      })
    } else {
      animateController.start({
        translateY: 0,
      })
    }
  }, [isScrollDown, animateController])

  return (
    <div
      className={cn(
        'pb-safe-offset-2 pointer-events-none absolute inset-x-0 bottom-0 flex h-40 items-end',
        className,
      )}
    >
      <m.div
        className={cn(
          'bg-background/90 mx-3 inline-flex h-12 w-full min-w-0 items-center justify-between rounded-2xl border border-neutral-200/60 px-4 backdrop-blur-md dark:border-neutral-800/60',
          'shadow-lg shadow-zinc-200/40 dark:shadow-zinc-900/40',
          'pointer-events-auto transition-all duration-200',
        )}
        transition={{ type: 'spring', damping: 20 }}
        animate={animateController}
      >
        <div className="flex items-center gap-3">
          <PlayerIcon isScrollDown={isScrollDown} onLogoClick={onLogoClick} />
          <DividerVertical className="h-5 shrink-0 opacity-60" />
        </div>
        {/* <ViewTabs onViewChange={onViewChange} /> */}
        <div className="flex items-center gap-3">
          <DividerVertical className="h-5 shrink-0 opacity-60" />
          <ProfileButton />
        </div>
      </m.div>
    </div>
  )
}

// const ViewTabs = ({
//   onViewChange,
// }: {
//   onViewChange?: (view: number) => void
// }) => {
//   const viewsWithSubscription = useViewWithSubscription()
//   const view = useRouteParamsSelector(s => s.view)
//   const navigate = useNavigateEntry()

//   return (
//     <div
//       className="text-text-secondary scrollbar-none flex shrink items-center justify-center gap-6 overflow-x-auto overflow-y-hidden text-xl"
//       onClick={stopPropagation}
//     >
//       {views
//         .filter(item => viewsWithSubscription.includes(item.view))
//         .map(item => (
//           <ButtonMotionBase
//             className={cn(
//               'center flex transition-colors duration-200',
//               view === item.view && item.className,
//             )}
//             key={item.name}
//             onClick={() => {
//               navigate({ view: item.view })
//               onViewChange?.(item.view)
//             }}
//           >
//             <div className="relative flex flex-col items-center">
//               {item.icon}
//             </div>
//           </ButtonMotionBase>
//         ))}
//     </div>
//   )
// }

const PlayerIcon = ({
  onLogoClick,
}: {
  isScrollDown: boolean
  onLogoClick?: () => void
}) => {
  return (
    <MotionButtonBase onClick={onLogoClick}>
      <Logo className="size-5 shrink-0" />
    </MotionButtonBase>
  )
}
