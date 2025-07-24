import { isMobile } from '~/hooks/common/use-mobile'
import { Skeleton } from '~/components/ui/skeleton'
// import { IN_ELECTRON } from '@follow/shared/constants'
import { stopPropagation } from '~/lib/dom'
// import { transformVideoUrl } from '@follow/utils/url-for-video'
import { cn } from 'ui/src/utils'
// import { useHover } from '@use-gesture/react'
import { useEffect, useMemo, useRef, useState } from 'react'

// import { AudioPlayer } from '~/atoms/player'
import { m } from 'motion/react'
import { RelativeTime } from '~/components/ui/datetime'
// import { HTML } from '~/components/ui/markdown/HTML'
import { Media } from '~/components/ui/media'
// import { usePreviewMedia } from '~/components/ui/media/hooks'
import type { ModalContentComponent } from '~/components/ui/modal'
// import { FixedModalCloseButton } from '~/components/ui/modal/components/close'
// import { PlainModal } from '~/components/ui/modal/stacked/custom-modal'
// import { useModalStack } from '~/components/ui/modal/stacked/hooks'
// import { useRenderStyle } from '~/hooks/biz/useRenderStyle'
// import { useRouteParamsSelector } from '~/hooks/biz/useRouteParams'
import { FeedIcon } from '~/components/feed/feed-icon'
// import { useEntryTranslation } from '~/store/ai/hook'
// import { useEntry } from '~/store/entry/hooks'

import { useModalStack } from '~/components/ui/modal/stacked/hooks'
import { useRouteParamsSelector } from '~/hooks/biz/useRouteParams'
import { useHover } from 'usehooks-ts'
import { GridItem } from '../templates/gird-item-template'
import { FeedTitle } from './FeedTitle'
import { PostAllOutput } from 'trpc-config/src/schemas/posts'

// const ViewTag = IN_ELECTRON ? 'webview' : 'iframe'
const ViewTag = 'iframe'

export function VideoItem({ post }: { post?: PostAllOutput['posts'][number] }) {
  if (!post) return null
  //   const entry = useEntry(entryId) || entryPreview

  const isActive = false
  //   const [miniIframeSrc, iframeSrc] = useMemo(
  //     () => [
  //       transformVideoUrl({
  //         url: entry?.entries.url ?? '',
  //         mini: true,
  //         isIframe: !IN_ELECTRON,
  //         attachments: entry?.entries.attachments,
  //       }),
  //       transformVideoUrl({
  //         url: entry?.entries.url ?? '',
  //         isIframe: !IN_ELECTRON,
  //         attachments: entry?.entries.attachments,
  //       }),
  //     ],
  //     [entry?.entries.attachments, entry?.entries.url],
  //   )
  const modalStack = useModalStack()
  //   const previewMedia = usePreviewMedia()

  const ref = useRef<HTMLDivElement>(null)
  const hovered = useHover(ref)

  const [showPreview, setShowPreview] = useState(false)
  useEffect(() => {
    if (hovered) {
      const timer = setTimeout(() => {
        setShowPreview(true)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setShowPreview(false)
      return () => {}
    }
  }, [hovered])

  //   if (!entry) return null
  return (
    <GridItem post={post}>
      <div
        className="cursor-card w-full"
        onClick={e => {
          //   if (isMobile() && entry.entries.url) {
          //     window.open(entry.entries.url, '_blank')
          //     e.stopPropagation()
          //     return
          //   }
          //   if (iframeSrc) {
          //     modalStack.present({
          //       title: '',
          //       content: props => (
          //         <PreviewVideoModalContent
          //           src={iframeSrc}
          //           entryId={entryId}
          //           {...props}
          //         />
          //       ),
          //       clickOutsideToDismiss: true,
          //       CustomModalComponent: PlainModal,
          //       overlay: true,
          //     })
          //   } else {
          //     const videoMediaList =
          //       entry.entries.media?.filter(media => media.type === 'video') || []
          //     if (videoMediaList.length > 0) {
          //       previewMedia(videoMediaList)
          //     }
          //   }
        }}
      >
        <div className="overflow-x-auto" ref={ref}>
          <Media
            key={'entry.entries.media[0].url'}
            src={
              imgSrc
                ? `https://webp.follow.is/?url=${encodeURIComponent(
                    imgSrc,
                  )}&width=640&height=360`
                : undefined
            }
            type={'photo'}
            previewImageUrl={
              post.attachments[0].url ? post.attachments[0].url : undefined
            }
            className={cn(
              'aspect-video w-full shrink-0 rounded-md object-cover',
              isActive && 'rounded-b-none',
            )}
            loading="lazy"
            proxy={{
              width: 640,
              height: 360,
            }}
            showFallback={true}
          />
        </div>
      </div>
    </GridItem>
  )
}

// const PreviewVideoModalContent: ModalContentComponent<{
//   src: string
//   entryId: string
// }> = ({ dismiss, src, entryId }) => {
//   const entry = useEntry(entryId)
//   const translation = useEntryTranslation({ entry, extraFields: ['content'] })
//   const content = translation.data?.content || entry?.entries.content
//   const currentAudioPlayerIsPlay = useRef(
//     AudioPlayer.get().status === 'playing',
//   )

//   const renderStyle = useRenderStyle()
//   useEffect(() => {
//     const currentValue = currentAudioPlayerIsPlay.current
//     if (currentValue) {
//       AudioPlayer.pause()
//     }
//     return () => {
//       if (currentValue) {
//         AudioPlayer.play()
//       }
//     }
//   }, [])
//   return (
//     <m.div
//       exit={{ scale: 0.94, opacity: 0 }}
//       className="size-full p-12"
//       onClick={() => dismiss()}
//     >
//       <m.div
//         onFocusCapture={stopPropagation}
//         initial={true}
//         exit={{
//           opacity: 0,
//         }}
//         className="safe-inset-top-4 fixed right-4 flex items-center"
//       >
//         <FixedModalCloseButton onClick={dismiss} />
//       </m.div>

//       <ViewTag src={src} className="size-full" />
//       {/* {!!content && (
//         <div className="bg-background p-10 pt-5 backdrop-blur-sm">
//           <HTML
//             as="div"
//             className="prose dark:prose-invert !max-w-full"
//             noMedia
//             style={renderStyle}
//           >
//             {content}
//           </HTML>
//         </div>
//       )} */}
//     </m.div>
//   )
// }

export function VideoItemStateLess({ entry, feed }: any) {
  return (
    <div className="text-text relative mx-auto w-full max-w-lg rounded-md transition-colors">
      <div className="relative">
        <div className="p-1.5">
          <div className="w-full">
            <div className="overflow-x-auto">
              {entry.media?.[0] ? (
                <Media
                  thumbnail
                  src={entry.media[0].url}
                  type={entry.media[0].type}
                  previewImageUrl={entry.media[0].preview_image_url}
                  className="aspect-video w-full shrink-0 overflow-hidden"
                  mediaContainerClassName={'w-auto h-auto rounded'}
                  loading="lazy"
                  proxy={{
                    width: 0,
                    height: 0,
                  }}
                  height={entry.media[0].height}
                  width={entry.media[0].width}
                  blurhash={entry.media[0].blurhash}
                />
              ) : (
                <Skeleton className="aspect-video w-full shrink-0 overflow-hidden" />
              )}
            </div>
          </div>
          <div className="relative flex-1 px-2 pb-3 pt-1 text-sm">
            <div className="relative mb-1 mt-1.5 truncate font-medium leading-none">
              {entry.title}
            </div>
            <div className="text-text-secondary mt-1 flex items-center gap-1 truncate text-[13px]">
              <FeedIcon fallback className="size-4" />
              <FeedTitle />
              <span className="text-material-opaque">·</span>
              {!!entry.publishedAt && <RelativeTime date={entry.publishedAt} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const VideoItemSkeleton = (
  <div className="relative mx-auto w-full max-w-lg rounded-md">
    <div className="relative">
      <div className="p-1.5">
        <div className="w-full">
          <div className="overflow-x-auto">
            <Skeleton className="aspect-video w-full shrink-0 overflow-hidden" />
          </div>
        </div>
        <div className="relative flex-1 px-2 pb-3 pt-1 text-sm">
          <div className="relative mb-1 mt-1.5 truncate font-medium leading-none">
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="mt-1 flex items-center gap-1 truncate text-[13px]">
            <Skeleton className="mr-0.5 size-4" />
            <Skeleton className="h-3 w-1/2" />
            <span className="text-material-opaque">·</span>
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </div>
    </div>
  </div>
)
