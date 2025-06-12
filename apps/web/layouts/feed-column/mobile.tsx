// import { Folo } from '@follow/components/icons/folo.js'
import { Logo } from '~/icons/logo'
// import { views } from '@follow/constants'
import { cn } from 'ui/src/utils'
// import useEmblaCarousel from 'embla-carousel-react'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
// import { useTranslation } from 'react-i18next'
import Link from 'next/link'

// import { useNavigateEntry } from '~/hooks/biz/useNavigateEntry'
// import { useRouteParamsSelector } from '~/hooks/biz/useRouteParams'

import { FeedList } from './list'
import { MobileFloatBar } from './float-bar.mobile'
import { ActionButton } from '~/components/ui/button'

export function FeedColumnMobile({ asWidget }: { asWidget?: boolean }) {
  //   const view = useRouteParamsSelector(s => s.view)

  const [feedListScrollRef, setFeedListScrollRef] =
    useState<HTMLDivElement | null>()

  //   const { t } = useTranslation()

  return (
    <div
      className={cn(
        'bg-background relative flex flex-col space-y-3 pb-11',
        asWidget ? 'grow' : 'h-screen',
      )}
    >
      <div className="mt-4 flex items-center justify-between pl-6 pr-2">
        <span className="inline-flex items-center gap-3 text-lg font-bold">
          <Logo className="size-8 shrink-0" />

          {/* <Folo className="size-9" /> */}
        </span>
        <div className="center inline-flex">
          <Link href="/discover" tabIndex={-1}>
            {/* TODO: translate */}
            <ActionButton shortcut="Meta+T" tooltip={'discover'}>
              <i className="i-mgc-add-cute-re text-text-secondary size-5" />
            </ActionButton>
          </Link>
        </div>
      </div>
      <div className="pb-safe-offset-2 relative flex size-full h-0 grow">
        {/* <SwipeWrapper active={view}>
          {views.map((item, index) => (
            <section
              key={item.name}
              className="size-full flex-none shrink-0 snap-center"
            >
              
            </section>
          ))}
        </SwipeWrapper> */}
        <FeedList
          ref={setFeedListScrollRef}
          className="flex size-full flex-col text-sm"
          //   view={index}
        />
      </div>
      <MobileFloatBar
        className={asWidget ? 'pb-safe-offset-2 !bottom-0' : undefined}
        scrollContainer={feedListScrollRef}
      />
    </div>
  )
}

// const SwipeWrapper: FC<{
//   children: React.JSX.Element[]
//   active: number
//   className?: string
// }> = ({ children, active, className }) => {
//   const navigate = useNavigateEntry()

//   const [initialActive] = useState(active)
//   const [emblaRef, emblaApi] = useEmblaCarousel(
//     {
//       loop: false,
//       startIndex: initialActive,
//     },
//     [],
//   )

//   useEffect(() => {
//     if (!emblaApi) return
//     emblaApi.on('select', () => {
//       navigate({ view: emblaApi.selectedScrollSnap() })
//     })
//   }, [emblaApi, navigate])

//   useEffect(() => {
//     if (!emblaApi) return
//     const currentSlideIndex = emblaApi.selectedScrollSnap()
//     if (currentSlideIndex !== Number(active)) {
//       emblaApi.scrollTo(Number(active))
//     }
//   }, [active, emblaApi])

//   return (
//     <div ref={emblaRef} className={cn('w-full overflow-hidden', className)}>
//       <div className="flex size-full">{children}</div>
//     </div>
//   )
// }
