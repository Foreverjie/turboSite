'use client'

import { useQuery } from '@tanstack/react-query'
import React, { createElement, forwardRef, useCallback, useRef } from 'react'
import { cn } from 'ui/src/utils'
import { m, useInView } from 'framer-motion'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'
// import { isSupportIcon, SocialIcon } from 'lucide-react'

// import { PeekLink } from '~/components/modules/peek/PeekLink'
// import { PostMetaBar } from '~/components/modules/post'
// import { ButtonMotionBase } from 'ui'
// import { RelativeTime } from '~/components/ui/relative-time'
import { BottomToUpTransitionView } from 'ui/src/transition/BottomToUpTransitionView'
import { TextUpTransitionView } from 'ui/src/transition/TextUpTransitionView'
import {
  microReboundPreset,
  softBouncePreset,
  softSpringPreset,
} from 'ui/src/transition/spring'
// import { shuffle } from '~/lib/_'
import { routeBuilder, Routes } from '~/utils/route-builder'
import {
  useAggregationSelector,
  useAppConfigSelector,
} from '~/providers/root/aggregation-data-provider'
import { trpc } from '../../../utils/trpc'
import { ButtonMotionBase } from 'ui'

// import { useHomeQueryData } from './query'

const Screen = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    className?: string
  }>
>((props, ref) => {
  const inViewRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(inViewRef, { once: true })

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex h-screen min-h-[900px] flex-col center',
        props.className,
      )}
    >
      <span ref={inViewRef} />
      {inView && props.children}
    </div>
  )
})
Screen.displayName = 'Screen'

export default function Home() {
  return (
    <div>
      <Welcome />

      <PostScreen />

      {/* <NoteScreen /> */}
      {/* <FriendScreen /> */}
      <MoreScreen />
    </div>
  )
}
const TwoColumnLayout = ({
  children,
  leftContainerClassName,
  rightContainerClassName,
}: {
  children:
    | [React.ReactNode, React.ReactNode]
    | [React.ReactNode, React.ReactNode, React.ReactNode]

  leftContainerClassName?: string
  rightContainerClassName?: string
}) => {
  return (
    <div className="relative flex h-full w-full flex-col flex-wrap items-center lg:flex-row">
      {children.slice(0, 2).map((child, i) => {
        return (
          <div
            key={i}
            className={cn(
              'flex h-1/2 w-full flex-col center lg:h-auto lg:w-1/2',

              i === 0 ? leftContainerClassName : rightContainerClassName,
            )}
          >
            <div className="relative max-w-full lg:max-w-xl">{child}</div>
          </div>
        )
      })}

      {children[2]}
    </div>
  )
}

const Welcome = () => {
  //   const { title, description } = useAppConfigSelector(config => {
  //     return {
  //       ...config.hero,
  //     }
  //   })!
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
  //   const siteOwner = useAggregationSelector(agg => agg.user)
  //   const { avatar, socialIds } = siteOwner || {}

  const titleAnimateD =
    title.template.reduce((acc, cur) => {
      return acc + (cur.text?.length || 0)
    }, 0) * 50
  return (
    <Screen className="mt-20 lg:mt-[-4.5rem]">
      <TwoColumnLayout leftContainerClassName="mt-[120px] lg:mt-0 h-[15rem] lg:h-1/2">
        <>
          <m.div
            className="group relative leading-[4] [&_*]:inline-block"
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
            className="my-3"
          >
            <span className="opacity-80">{'Welcome'}</span>
          </BottomToUpTransitionView>

          {/* <ul className="mt-8 flex space-x-4 center lg:mt-[7rem] lg:block">
            {Object.entries(socialIds || {}).map(
              ([type, id]: any, index) => {
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
              },
            )}
          </ul> */}
        </>

        <div className={cn('lg:h-[300px] lg:w-[300px]', 'h-[200px] w-[200px]')}>
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
            'absolute bottom-0 left-0 right-0 flex flex-col center',
            'text-neutral-800/80 dark:text-neutral-200/80',
          )}
        >
          <small>
            当第一颗卫星飞向大气层外，我们便以为自己终有一日会征服宇宙。
          </small>
          <span className="mt-8 animate-bounce">
            <i className="icon-[mingcute--right-line] rotate-90 text-2xl" />
          </span>
        </m.div>
      </TwoColumnLayout>
    </Screen>
  )
}

const PostScreen = () => {
  const { data: posts } = trpc.post.all.useQuery({
    limit: 5,
    cursor: null,
  })
  return (
    <Screen className="h-fit min-h-[120vh]">
      <TwoColumnLayout leftContainerClassName="h-[30rem] lg:h-1/2">
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
          这里或许有那么一些对于生活的感慨
          <br />
          也或许有那么一些对于技术的记录。
        </m.h2>
        <div>
          {/* <ul className="space-y-4">
            {posts?.posts.map((post, i) => {
              const imageSrc = post.images?.[0]?.src

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
                    'relative h-[100px] w-full overflow-hidden rounded-md',
                    'border border-slate-200 dark:border-neutral-700/80',
                    'group p-4 pb-0',
                  )}
                >
                  <Link
                    className="flex h-full w-full flex-col"
                    href={routeBuilder(Routes.Post, {
                      category: post.category.slug,
                      slug: post.slug,
                    })}
                  >
                    <h4 className="truncate text-xl font-medium">
                      {post.title}
                    </h4>
                    <PostMetaBar meta={post} className="-mb-2" />

                    <ButtonMotionBase className="absolute bottom-4 right-4 flex items-center p-2 text-accent/95 opacity-0 duration-200 group-hover:opacity-100">
                      阅读全文
                      <i className="icon-[mingcute--arrow-right-line]" />
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
          </ul> */}

          <m.div
            initial={{ opacity: 0.0001, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ...softBouncePreset,
              //   delay: 0.3 + 0.2 * posts.length,
              delay: 0.3 + 0.2 * 5,
            }}
            className="relative mt-12 w-full text-center"
          >
            <ButtonMotionBase>
              <Link
                className="shiro-link--underline"
                href={routeBuilder(Routes.Posts, {})}
              >
                还有更多，要不要看看？
              </Link>
            </ButtonMotionBase>
          </m.div>
        </div>
      </TwoColumnLayout>
    </Screen>
  )
}

const MoreScreen = () => {
  return null
  return (
    <Screen>
      <h2 className="text-2xl font-medium">感谢看到这里。</h2>

      <div className="mt-12 flex w-full center">TODO</div>
    </Screen>
  )
}
