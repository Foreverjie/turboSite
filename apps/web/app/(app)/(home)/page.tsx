'use client'

import React, { createElement, forwardRef, useCallback, useRef } from 'react'
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
import { Button, ButtonMotionBase, toast } from 'ui'
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
import { RelativeTime } from '../../../components/ui/RelativeTime'

// import { useHomeQueryData } from './query'

export default function Home() {
  return (
    <div>
      <Welcome />
      <PostScreen />
      {/* <NoteScreen /> */}
      {/* <FriendScreen /> */}
      <WindSock />
    </div>
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

  const titleAnimateD =
    title.template.reduce((acc, cur) => {
      return acc + (cur.text?.length || 0)
    }, 0) * 50
  return (
    <div className="mt-0 min-w-0 max-w-screen overflow-hidden lg:mt-[-4.5rem] lg:h-dvh lg:min-h-[800px]">
      <TwoColumnLayout leftContainerClassName="mt-[120px] lg:mt-0 h-[15rem] lg:h-1/2">
        <>
          <m.div
            className="group relative text-center leading-[4] lg:text-left [&_*]:inline-block"
            initial={{ opacity: 0.0001, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={softBouncePreset}
          >
            {title.template.map((t, i) => {
              const { type } = t
              const prevAllTextLength = title.template
                .slice(0, i)
                .reduce((acc, cur) => {
                  return acc + (cur.text?.length || 0)
                }, 0)
              return createElement(
                type,
                { key: i, className: t.class },
                t.text && (
                  <TextUpTransitionView
                    initialDelay={prevAllTextLength * 0.05}
                    eachDelay={0.05}
                  >
                    {t.text}
                  </TextUpTransitionView>
                ),
              )
            })}
          </m.div>

          <BottomToUpTransitionView
            delay={titleAnimateD + 500}
            transition={softBouncePreset}
            className="my-3 flex center md:block"
          >
            <span className="opacity-80">{'Welcome'}</span>
          </BottomToUpTransitionView>

          <ul className="mx-[60px] mt-8 flex flex-wrap gap-4 center lg:mx-auto lg:mt-28 lg:justify-start">
            {Object.entries(socialIds).map(([type, id]: any, index) => {
              // console.log({ type, id })
              if (!isSupportIcon(type)) return null
              return (
                <BottomToUpTransitionView
                  key={type}
                  delay={index * 100 + titleAnimateD + 500}
                  className="inline-block"
                  as="li"
                >
                  <SocialIcon id={id} type={type} />
                </BottomToUpTransitionView>
              )
            })}
          </ul>
        </>

        <div className={cn('lg:size-[300px]', 'size-[200px]', 'mt-24 lg:mt-0')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={'https://avatars.githubusercontent.com/u/20612607?v=4'}
            alt="Site Owner Avatar"
            className={cn(
              'aspect-square rounded-full border border-slate-200 dark:border-neutral-800',
              'lg:h-[300px] lg:w-[300px]',
              'h-[200px] w-[200px]',
            )}
          />
        </div>

        <m.div
          initial={{ opacity: 0.0001, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={softBouncePreset}
          className={cn(
            'inset-x-0 bottom-0 mt-12 flex flex-col center lg:absolute lg:mt-0',
            'text-neutral-800/80 center dark:text-neutral-200/80',
          )}
        >
          <small>
            When the first satellite flew out of the atmosphere <br />
            We thought we would conquer the universe one day.
          </small>
          <span className="mt-8 animate-bounce">
            <i className="i-mingcute-right-line rotate-90 text-2xl" />
          </span>
        </m.div>
      </TwoColumnLayout>
    </div>
  )
}

const PostScreen = () => {
  const { data: posts, isLoading } = trpc.post.all.useQuery(
    {
      limit: 5,
      cursor: null,
    },
    {
      enabled: false,
    },
  )
  return (
    <div className="lg:mt-24">
      <TwoColumnLayout
        leftContainerClassName="my-[5rem] lg:h-1/2"
        rightChildrenClassName="w-full"
      >
        <m.h2
          initial={{
            opacity: 0.0001,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={softSpringPreset}
          className="text-3xl font-medium leading-loose"
        >
          What&apos;s happening
        </m.h2>
        <div>
          <ul className="space-y-4">
            {isLoading &&
              [...Array(1)].map((_, i) => (
                <li key={i} className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-400 rounded"></div>
                      <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                    </div>
                  </div>
                </li>
              ))}
            {posts?.posts.slice(0, 5).map((post, i) => {
              const imageSrc = post.files.length > 0 ? post.files[0] : null

              return (
                <m.li
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  initial={{ opacity: 0.001, x: 50 }}
                  transition={{
                    ...softSpringPreset,
                    delay: 0.3 + 0.2 * i,
                  }}
                  key={post.id}
                  className={cn(
                    'relative w-full overflow-hidden rounded-md',
                    'border border-slate-200 dark:border-neutral-700/80',
                    'group p-4',
                  )}
                >
                  <Link
                    className="flex h-full w-full flex-col gap-4"
                    href={routeBuilder(Routes.Post, {
                      postId: post.postId,
                    })}
                  >
                    <div className="flex flex-row items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.author.avatar}
                        alt={post.author.name.substring(0, 2)}
                        className="w-8 rounded-full"
                      />
                      <div className="flex flex-col gap-1">
                        <span className="ml-2 text-sm opacity-80">
                          {post.author.name}
                        </span>
                        <span className="ml-2 text-xs opacity-60">
                          @{post.author.id}
                        </span>
                      </div>
                    </div>
                    <h4 className="truncate text-xl">{post.content}</h4>
                    <span className="text-xs opacity-60">
                      <RelativeTime date={post.updatedAt} />
                    </span>
                    {/* <PostMetaBar meta={post} className="-mb-2" /> */}

                    <ButtonMotionBase className="absolute bottom-4 right-4 flex items-center p-2 text-accent/95 opacity-0 duration-200 group-hover:opacity-100">
                      Detail
                      <i className="i-mingcute-arrow-right-line" />
                    </ButtonMotionBase>

                    {!!imageSrc && (
                      <div
                        aria-hidden
                        className="mask-cover absolute inset-0 top-0 z-[-1]"
                      >
                        <div
                          className="absolute inset-0 h-full w-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${imageSrc})`,
                          }}
                        />
                      </div>
                    )}
                  </Link>
                </m.li>
              )
            })}
          </ul>

          <m.div
            initial={{ opacity: 0.0001, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ...softBouncePreset,
              delay: 0.3 + 0.2 * (posts?.posts.length || 0),
            }}
            className="relative mt-12 w-full text-center"
          >
            <ButtonMotionBase>
              <Link
                className="shiro-link--underline"
                href={routeBuilder(Routes.Posts, {})}
              >
                There are more, feel free to explore.
              </Link>
            </ButtonMotionBase>
          </m.div>
        </div>
      </TwoColumnLayout>
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
        <Button
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
        </Button>

        <Button
          className="flex gap-2 center"
          onClick={() => {
            // presentSubscribe()
          }}
        >
          Subscribe
          <i className="i-material-symbols-notifications-active" />
        </Button>
      </div>
    </>
  )
}
