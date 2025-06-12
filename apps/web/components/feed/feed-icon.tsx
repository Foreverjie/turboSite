import { m } from 'motion/react'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from 'ui/src/avatar'
import { cn } from 'ui/src/utils'
import { PlatformIcon } from '../ui/platform-icon'

const getFeedIconSrc = ({
  src,
  siteUrl,
  fallback,
  proxy,
}: {
  src?: string
  siteUrl?: string
  fallback?: boolean
  proxy?: { height: number; width: number }
} = {}) => {
  if (src) {
    return [src, '']
  }
  return ['', '']
}

const FallbackableImage = function FallbackableImage({
  ref,
  fallbackUrl,
  ...rest
}: {
  fallbackUrl: string
} & React.ImgHTMLAttributes<HTMLImageElement> & {
    ref?: React.Ref<HTMLImageElement>
  }) {
  return (
    <img
      onError={e => {
        if (fallbackUrl && e.currentTarget.src !== fallbackUrl) {
          e.currentTarget.src = fallbackUrl
        } else {
          rest.onError?.(e)
          // Empty svg
          e.currentTarget.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3C/svg%3E"
        }
      }}
      {...rest}
      ref={ref}
    />
  )
}

// type FeedIconFeed =
//   | (Pick<FeedModel, 'ownerUserId' | 'id' | 'title' | 'url' | 'image'> & {
//       type: FeedOrListRespModel['type']
//       siteUrl?: string
//     })
//   | FeedOrListRespModel

// type FeedIconEntry = Pick<
//   CombinedEntryModel['entries'],
//   'media' | 'authorAvatar'
// >
const fadeInVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}

const isIconLoadedSet = new Set<string>()
export function FeedIcon({
  //   feed,
  //   entry,
  fallbackUrl,
  className,
  size = 20,
  fallback = true,
  fallbackElement,
  siteUrl,
  useMedia,
  disableFadeIn,
  noMargin,
}: {
  //   feed?: FeedIconFeed | null
  //   entry?: FeedIconEntry | null
  fallbackUrl?: string
  className?: string
  size?: number
  siteUrl?: string
  /**
   * Image loading error fallback to site icon
   */
  fallback?: boolean
  fallbackElement?: ReactNode

  useMedia?: boolean
  disableFadeIn?: boolean
  noMargin?: boolean
}) {
  const marginClassName = noMargin ? '' : 'mr-2'
  //   const image =
  //     (useMedia
  //       ? entry?.media?.find(i => i.type === 'photo')?.url || entry?.authorAvatar
  //       : entry?.authorAvatar) || feed?.image

  //   const colors = useMemo(
  //     () =>
  //       getBackgroundGradient(
  //         feed?.title || (feed as FeedModel)?.url || siteUrl || '',
  //       ),
  //     [feed?.title, (feed as FeedModel)?.url, siteUrl],
  //   )
  let ImageElement: ReactNode
  let finalSrc = ''

  const sizeStyle: React.CSSProperties = useMemo(
    () => ({
      width: size,
      height: size,
    }),
    [size],
  )
  //   const colorfulStyle: React.CSSProperties = useMemo(() => {
  //     const [, , , bgAccent, bgAccentLight, bgAccentUltraLight] = colors
  //     return {
  //       backgroundImage: `linear-gradient(to top, ${bgAccent} 0%, ${bgAccentLight} 99%, ${bgAccentUltraLight} 100%)`,

  //       ...sizeStyle,
  //     }
  //   }, [colors, sizeStyle])

  const fallbackIcon = (
    <span
      //   style={colorfulStyle}
      className={cn(
        'flex shrink-0 items-center justify-center rounded-sm',
        'text-white',
        marginClassName,
        className,
      )}
    >
      <span
        style={{
          fontSize: size / 2,
        }}
      >
        {'影'}
        {/* {!!feed?.title && feed.title[0]} */}
      </span>
    </span>
  )

  switch (true) {
    case !!siteUrl: {
      const [src] = getFeedIconSrc({
        siteUrl,
      })
      finalSrc = src!

      const isIconLoaded = isIconLoadedSet.has(src!)
      isIconLoadedSet.add(src!)

      ImageElement = (
        <PlatformIcon
          url={
            'https://webp.follow.is/?url=https%3A%2F%2Fi0.hdslb.com%2Fbfs%2Fface%2Fc1733474892caa45952b2c09a89323157df7129a.jpg&width=36&height=36'
          }
          style={sizeStyle}
          className={className}
        >
          <m.img
            style={sizeStyle}
            {...(disableFadeIn || isIconLoaded ? {} : fadeInVariant)}
          />
        </PlatformIcon>
      )
      break
    }

    default: {
      ImageElement = (
        <PlatformIcon
          url={
            'https://webp.follow.is/?url=https%3A%2F%2Fi0.hdslb.com%2Fbfs%2Fface%2Fc1733474892caa45952b2c09a89323157df7129a.jpg&width=36&height=36'
          }
          style={sizeStyle}
          className={className}
        >
          <m.img
            src={
              'https://webp.follow.is/?url=https%3A%2F%2Fi0.hdslb.com%2Fbfs%2Fface%2Fc1733474892caa45952b2c09a89323157df7129a.jpg&width=36&height=36'
            }
            style={sizeStyle}
            className="rounded-sm object-cover"
          />
        </PlatformIcon>
      )
      break
    }
  }

  if (!ImageElement) {
    return null
  }

  if (fallback && !!finalSrc) {
    return (
      <Avatar
        className={cn('shrink-0 [&_*]:select-none', marginClassName)}
        style={sizeStyle}
      >
        <AvatarImage
          className="rounded-sm object-cover"
          asChild
          src={
            'https://webp.follow.is/?url=https%3A%2F%2Fi0.hdslb.com%2Fbfs%2Fface%2Fc1733474892caa45952b2c09a89323157df7129a.jpg&width=36&height=36'
          }
        >
          {ImageElement}
        </AvatarImage>
        <AvatarFallback delayMs={200} asChild>
          {fallbackElement || fallbackIcon}
        </AvatarFallback>
      </Avatar>
    )
  }

  // Is Icon
  if (!finalSrc) return ImageElement
  // Else
  return (
    <Avatar
      className={cn('shrink-0 [&_*]:select-none', marginClassName)}
      style={sizeStyle}
    >
      <AvatarImage asChild src={finalSrc}>
        {ImageElement}
      </AvatarImage>
      <AvatarFallback delayMs={200}>
        <div
          className={className}
          style={sizeStyle}
          data-placeholder={finalSrc}
        />
      </AvatarFallback>
    </Avatar>
  )
}
