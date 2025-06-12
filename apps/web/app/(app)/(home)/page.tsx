'use client'

import React, {
  createElement,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { cn } from 'ui/src/utils'
import { m, useInView } from 'motion/react'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { isSupportIcon, SocialIcon } from '~/components/SocialIcon'

// import { PeekLink } from '~/components/modules/peek/PeekLink'
// import { PostMetaBar } from '~/components/modules/post'
import { BottomToUpTransitionView } from '~/components/ui/transition/BottomToUpTransitionView'
import { TextUpTransitionView } from '~/components/ui/transition/TextUpTransitionView'
import {
  microReboundPreset,
  softBouncePreset,
  softSpringPreset,
} from '~/components/ui/transition/spring'
// import { shuffle } from '~/lib/_'
import { routeBuilder, Routes } from '~/utils/route-builder'
import { trpc } from '../../../utils/trpc'
import { ButtonMotionBase, toast } from 'ui'
import {
  Disc3Icon,
  FolderArchiveIcon,
  HeartHandshakeIcon,
  HistoryIcon,
  PodcastIcon,
  SparkleIcon,
  StickyNoteIcon,
} from 'lucide-react'
import { NumberSmoothTransition } from '../../../components/ui/number-smooth-transition/NumberSmoothTransition'
import { StyledButton } from '../../../components/ui/button/StyledButton'
import { MobileFloatBar } from '~/layouts/feed-column/float-bar.mobile'
import { MobileFeedScreen } from '~/layouts/feed-column'
import { EntryColumnWrapper } from '~/layouts/feed-column/wrapper'
import { ENTRY_COLUMN_LIST_SCROLLER_ID } from '~/constants/dom'

// import { useHomeQueryData } from './query'

export default function Home() {
  const routeFeedId = 'home'
  const view = 0 // Assuming view is always 0 for home
  const entries = trpc.post.all.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
    },
  )

  const handleScroll = useCallback(() => {
    // Handle scroll event
  }, [])

  const [scrollContainer, setScrollContainer] = useState<null | HTMLDivElement>(
    null,
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setScrollContainer(
        document.querySelector(
          `#${ENTRY_COLUMN_LIST_SCROLLER_ID}`,
        ) as HTMLDivElement,
      )
    }, 1000)
    return () => clearTimeout(timer)
  }, [view])

  return (
    <>
      <MobileFeedScreen />
      <MobileFloatBar scrollContainer={scrollContainer} />
    </>
  )
}
const TwoColumnLayout = ({
  children,
  leftContainerClassName,
  rightContainerClassName,
  leftChildrenClassName,
  rightChildrenClassName,
  className,
}: {
  children:
    | [React.ReactNode, React.ReactNode]
    | [React.ReactNode, React.ReactNode, React.ReactNode]

  leftContainerClassName?: string
  rightContainerClassName?: string
  leftChildrenClassName?: string
  rightChildrenClassName?: string
  className?: string
}) => {
  return (
    <div
      className={cn(
        'relative mx-auto block size-full min-w-0 max-w-[1800px] flex-col flex-wrap items-center lg:flex lg:flex-row',
        className,
      )}
    >
      {children.slice(0, 2).map((child, i) => {
        return (
          <div
            key={i}
            className={cn(
              'flex w-full flex-col center lg:h-auto lg:w-1/2',
              i === 0 ? leftContainerClassName : rightContainerClassName,
            )}
          >
            <div
              className={cn(
                'relative max-w-full lg:max-w-2xl',
                i === 0 ? leftChildrenClassName : rightChildrenClassName,
              )}
            >
              {child}
            </div>
          </div>
        )
      })}

      {children[2]}
    </div>
  )
}

const Welcome = () => {
  const socialIds = {
    github: 'Foreverjie',
    wechat: 'zzjshane',
    bilibili: '86848823',
  }

  const title = {
    template: [
      {
        type: 'h1',
        text: "Hi, I'm ",
        class: 'font-light text-4xl',
      },
      {
        type: 'h1',
        text: 'Shane',
        class: 'font-medium mx-2 text-4xl',
      },
      {
        type: 'h1',
        text: '👋。',
        class: 'font-light text-4xl',
      },
      {
        type: 'br',
      },
      {
        type: 'h1',
        text: 'A',
        class: 'font-light text-4xl',
      },
      {
        type: 'code',
        text: '<Developer/>',
        class:
          'font-medium mx-2 text-3xl rounded p-1 bg-gray-200 dark:bg-gray-800/0 hover:dark:bg-gray-800/100 bg-opacity-0 hover:bg-opacity-100 transition-background duration-200',
      },
      {
        type: 'span',
        class:
          'inline-block w-[1px] h-8 -bottom-2 relative bg-gray-800/80 dark:bg-gray-200/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:animation-blink',
      },
    ],
  }

  const [scrollContainer, setScrollContainer] = useState<null | HTMLDivElement>(
    null,
  )

  const titleAnimateD =
    title.template.reduce((acc, cur) => {
      return acc + (cur.text?.length || 0)
    }, 0) * 50
  return (
    <div className="flex h-screen min-w-0 grow overflow-hidden">
      <MobileFloatBar
        scrollContainer={scrollContainer}
        onLogoClick={() => {
          console.log('Logo clicked')
        }}
        onViewChange={view => {
          console.log('View changed to:', view)
        }}
      />
    </div>
  )
}

const windsock = [
  {
    title: 'Post',
    path: '/posts',
    type: 'Post',
    subMenu: [],
    icon: PodcastIcon,
  },
  {
    title: 'Note',
    type: 'Note',
    path: '/notes',
    icon: StickyNoteIcon,
  },
  {
    title: 'History',
    icon: HistoryIcon,
    path: '/timeline',
  },
  {
    title: 'Friends',
    icon: HeartHandshakeIcon,
    path: '/friends',
  },
  {
    title: 'Thinking',
    icon: SparkleIcon,
    path: '/thinking',
  },
  {
    title: 'Projects',
    icon: FolderArchiveIcon,
    path: '/projects',
  },
  {
    title: 'Says',
    path: '/says',
    icon: Disc3Icon,
  },
]

const WindSock = () => {
  const count = 123

  return (
    <>
      <div className="mt-28 flex flex-col center">
        <div className="my-5 text-2xl font-medium">Let the wind tell you</div>
        <div className="mb-24 opacity-90">Go somewhere else?</div>
        <ul className="flex flex-col flex-wrap gap-2 gap-y-8 opacity-80 lg:flex-row">
          {windsock.map((item, index) => {
            return (
              <m.li
                initial={{ opacity: 0.0001, y: 10 }}
                viewport={{ once: true }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    stiffness: 641,
                    damping: 23,
                    mass: 3.9,
                    type: 'spring',
                    delay: index * 0.05,
                  },
                }}
                transition={{
                  delay: 0.001,
                }}
                whileHover={{
                  y: -10,
                  transition: {
                    ...microReboundPreset,
                    delay: 0.001,
                  },
                }}
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <a
                  href={item.path}
                  className="flex items-center gap-4 text-neutral-800 duration-200 hover:!text-accent dark:text-neutral-200"
                >
                  {createElement(item.icon, { className: 'w-6 h-6' })}
                  <span>{item.title}</span>
                </a>

                {index != windsock.length - 1 && (
                  <span className="mx-4 hidden select-none lg:inline"> · </span>
                )}
              </m.li>
            )
          })}
        </ul>
      </div>

      <div className="mt-24 flex justify-center gap-4">
        <StyledButton
          className="flex gap-2 bg-red-400 center"
          onClick={() => {
            // apiClient
            //   .proxy('like_this')
            //   .post()
            //   .then(() => {
            //     queryClient.setQueryData(likeQueryKey, (prev: any) => {
            //       return prev + 1
            //     })
            //   })

            toast('Thank You!', undefined, {
              iconElement: (
                <m.i
                  className="i-mingcute-heart-fill text-uk-red-light"
                  initial={{
                    scale: 0.96,
                  }}
                  animate={{
                    scale: 1.22,
                  }}
                  transition={{
                    easings: ['easeInOut'],
                    delay: 0.3,
                    repeat: 5,
                    repeatDelay: 0.3,
                  }}
                />
              ),
            })
          }}
        >
          喜欢本站 <i className="i-mingcute-heart-fill" />{' '}
          <NumberSmoothTransition>
            {count as any as string}
          </NumberSmoothTransition>
        </StyledButton>

        <StyledButton
          className="flex gap-2 center"
          onClick={() => {
            // presentSubscribe()
          }}
        >
          Subscribe
          <i className="i-material-symbols-notifications-active" />
        </StyledButton>
      </div>
    </>
  )
}
