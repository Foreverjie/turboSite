'use client'

import { useMemo } from 'react'

import { Focusable } from '~/components/common/Focusable'
import { ActionButton } from '~/components/ui/button'
import { RotatingRefreshIcon } from '~/components/ui/loading'
import { Logo } from '~/icons/logo'
import { trpc } from '~/utils/trpc'
import { cn } from 'ui/src/utils'

import { EntryColumnGrid } from './grid'
import { EntryEmptyList } from './list'
import { EntryColumnWrapper } from './wrapper'

import type { PostAllOutput } from 'trpc-config/src/schemas/posts'

import type { LucideIcon } from 'lucide-react'
import {
  Bell,
  Clapperboard,
  Compass,
  Flame,
  MoreHorizontal,
  Plus,
  Settings,
  Star,
  SunMedium,
  Video,
  Youtube,
} from 'lucide-react'

interface TagStat {
  key: string
  label: string
  count: number
  Icon: LucideIcon
}

interface FeedSummary {
  id: number
  title: string
  icon?: string | null
  count: number
  unreadCount: number
}

type UserData = ReturnType<typeof trpc.user.me.useQuery>['data']

export const DesktopRootLayout = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    refetch,
    isRefetching,
    hasNextPage,
  } = trpc.post.all.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
    },
  )

  const { data: user } = trpc.user.me.useQuery(undefined, {
    staleTime: 60 * 1000,
  })

  const pages = data?.pages ?? []
  const posts = useMemo(
    () => pages.flatMap(page => page.posts),
    [pages],
  )

  const stats = useMemo(() => computeFeedStats(posts), [posts])

  const isEmpty = posts.length === 0

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 bg-[#121216] text-white">
      <DesktopSidebar stats={stats} user={user} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DesktopHeader
          totalCount={stats.totalCount}
          unreadCount={stats.unreadCount}
          onRefresh={() => {
            void refetch()
          }}
          isRefreshing={isRefetching}
          user={user}
        />

        <Focusable
          data-hide-in-print
          className="relative flex min-h-0 flex-1 flex-col overflow-hidden"
        >
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-8 pb-10">
            <EntryColumnWrapper
              onPullToRefresh={() => refetch()}
              key={'desktop-video'}
            >
              {isEmpty ? (
                isLoading ? null : (
                  <EntryEmptyList />
                )
              ) : (
                <EntryColumnGrid
                  gap={14}
                  hasNextPage={!!hasNextPage}
                  fetchNextPage={() => {
                    void fetchNextPage()
                  }}
                  refetch={() => {
                    void refetch()
                  }}
                  groupCounts={[4]}
                  data={posts}
                />
              )}
            </EntryColumnWrapper>
          </div>
        </Focusable>
      </div>
    </div>
  )
}

const DesktopSidebar = ({
  stats,
  user,
}: {
  stats: ReturnType<typeof computeFeedStats>
  user: UserData
}) => {
  const userInitial = user?.name?.[0]?.toUpperCase() ?? 'S'
  const userDisplay = user?.name ?? 'Guest'

  return (
    <aside className="hidden h-full min-h-0 w-[280px] flex-col border-r border-white/5 bg-[#111118] px-6 pb-8 pt-7 lg:flex">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-lg font-semibold">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400">
            <Logo className="size-5 text-white" />
          </span>
          Folo
        </div>

        <div className="flex items-center gap-2">
          <ActionButton
            size="sm"
            tooltip="Create feed"
            icon={<Plus className="h-4 w-4" />}
          />
          <ActionButton
            size="sm"
            tooltip="Notifications"
            icon={<Bell className="h-4 w-4" />}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {stats.tagStats.map(stat => (
          <TagStatCard key={stat.key} stat={stat} />
        ))}
      </div>

      <nav className="mt-8 space-y-1 text-sm text-zinc-300">
        <SidebarSectionLabel title="Videos" />
        <SidebarNavItem
          label="Videos"
          count={stats.totalCount}
          active
          icon={<Video className="h-4 w-4" />}
        />
        <SidebarNavItem
          label="Starred"
          count={stats.favoriteCount}
          icon={<Star className="h-4 w-4" />}
        />
      </nav>

      {stats.feeds.length > 0 ? (
        <div className="mt-8">
          <SidebarSectionLabel title="Subscriptions" />
          <div className="mt-2 space-y-1">
            {stats.feeds.slice(0, 6).map((feed, index) => (
              <SidebarFeedItem
                key={feed.id}
                feed={feed}
                active={index === 0}
              />
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-auto flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.04] px-4 py-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-500 text-base font-semibold">
          {userInitial}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-white">
            {userDisplay}
          </div>
          <div className="text-xs text-zinc-500">Stay inspired</div>
        </div>
        <ActionButton
          size="sm"
          tooltip="Profile"
          icon={<MoreHorizontal className="h-4 w-4" />}
        />
      </div>
    </aside>
  )
}

const DesktopHeader = ({
  totalCount,
  unreadCount,
  onRefresh,
  isRefreshing,
  user,
}: {
  totalCount: number
  unreadCount: number
  onRefresh: () => void
  isRefreshing: boolean
  user: UserData
}) => {
  const userInitial = user?.name?.[0]?.toUpperCase() ?? 'S'

  return (
    <header className="flex items-center justify-between border-b border-white/5 bg-[#14141c] px-8 py-6">
      <div>
        <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-cyan-400">
          <div className="flex size-6 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
            <Clapperboard className="h-3.5 w-3.5" />
          </div>
          Videos
        </div>
        <h1 className="mt-2 text-2xl font-semibold text-white">Keep up with creators</h1>
        <p className="mt-1 text-sm text-zinc-500">
          {unreadCount > 0
            ? `${unreadCount} new videos waiting for you`
            : `All ${totalCount} videos caught up — time to explore highlights`}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className={cn(pillButtonStyles(true))}>Latest</button>
        <button className={cn(pillButtonStyles(false))}>Highlights</button>
        <ActionButton
          size="sm"
          tooltip="Refresh feed"
          onClick={onRefresh}
          icon={
            <RotatingRefreshIcon
              isRefreshing={isRefreshing}
              className="!text-inherit"
            />
          }
        />
        <ActionButton
          size="sm"
          tooltip="Explorer"
          icon={<Compass className="h-4 w-4" />}
        />
        <ActionButton
          size="sm"
          tooltip="Settings"
          icon={<Settings className="h-4 w-4" />}
        />
        <ActionButton
          size="sm"
          tooltip="Switch theme"
          icon={<SunMedium className="h-4 w-4" />}
        />
        <div className="ml-2 flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500/30 via-sky-600/40 to-indigo-500/50 text-base font-semibold text-white">
          {userInitial}
        </div>
      </div>
    </header>
  )
}

const TagStatCard = ({ stat }: { stat: TagStat }) => {
  const { Icon } = stat
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.04] px-4 py-3">
      <div className="flex size-10 items-center justify-center rounded-xl bg-white/5 text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-zinc-500">
          {stat.label}
        </div>
        <div className="text-xl font-semibold text-white">{stat.count}</div>
      </div>
    </div>
  )
}

const SidebarSectionLabel = ({ title }: { title: string }) => (
  <div className="px-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
    {title}
  </div>
)

const SidebarNavItem = ({
  label,
  count,
  active,
  icon,
}: {
  label: string
  count: number
  active?: boolean
  icon: React.ReactNode
}) => (
  <button
    type="button"
    className={cn(
      'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors',
      active
        ? 'bg-white/10 text-white'
        : 'text-zinc-400 hover:bg-white/5 hover:text-white',
    )}
  >
    <span className="flex size-8 items-center justify-center rounded-lg bg-white/5">
      {icon}
    </span>
    <span className="flex-1 truncate text-sm font-medium">{label}</span>
    <span className="text-xs text-zinc-400">{count}</span>
  </button>
)

const SidebarFeedItem = ({
  feed,
  active,
}: {
  feed: FeedSummary
  active?: boolean
}) => {
  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors',
        active
          ? 'bg-white/10 text-white'
          : 'text-zinc-300 hover:bg-white/5 hover:text-white',
      )}
    >
      <FeedAvatar title={feed.title} icon={feed.icon} active={active} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">
          {feed.title}
        </div>
        <div className="text-xs text-zinc-500">
          {feed.unreadCount > 0
            ? `${feed.unreadCount} unread`
            : 'All caught up'}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {feed.unreadCount > 0 && (
          <span className="size-2 rounded-full bg-rose-400" />
        )}
        <span className="text-xs text-zinc-500">{feed.count}</span>
      </div>
    </button>
  )
}

const FeedAvatar = ({
  title,
  icon,
  active,
}: {
  title: string
  icon?: string | null
  active?: boolean
}) => {
  const initial = title?.[0]?.toUpperCase() ?? 'F'

  return icon ? (
    <div className="flex size-10 items-center justify-center overflow-hidden rounded-lg bg-white/5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt={title}
        loading="lazy"
        className="size-full object-cover"
      />
    </div>
  ) : (
    <div
      className={cn(
        'flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/20 via-cyan-500/30 to-indigo-500/40 text-base font-semibold text-white',
        active && 'from-sky-500 via-cyan-500 to-indigo-500',
      )}
    >
      {initial}
    </div>
  )
}

const pillButtonStyles = (active: boolean) =>
  cn(
    'rounded-full px-5 py-1.5 text-sm font-medium transition-colors',
    active
      ? 'bg-white text-[#111118] shadow-lg shadow-black/20'
      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white',
  )

type PostItem = PostAllOutput['posts'][number]

function computeFeedStats(posts: PostItem[]) {
  const totalCount = posts.length
  const favoriteCount = posts.filter(post => post.isFavorite > 0).length
  const unreadCount = posts.filter(post => post.isRead === 0).length

  const tagAccumulator = new Map<string, number>()
  posts.forEach(post => {
    post.tags?.forEach(tag => {
      const normalized = tag.trim().toLowerCase()
      if (!normalized) return
      tagAccumulator.set(normalized, (tagAccumulator.get(normalized) ?? 0) + 1)
    })
  })

  const tagStats: TagStat[] = Array.from(tagAccumulator.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag, count]) => ({
      key: tag,
      label: formatTagLabel(tag),
      count,
      Icon: resolveTagIcon(tag),
    }))

  while (tagStats.length < 3) {
    const nextIndex = tagStats.length
    tagStats.push({
      key: `placeholder-${nextIndex}`,
      label: nextIndex === 0 ? 'Discover' : nextIndex === 1 ? 'Creators' : 'Watchlist',
      count: 0,
      Icon: nextIndex === 0 ? Flame : nextIndex === 1 ? Youtube : Clapperboard,
    })
  }

  const feedAccumulator = new Map<number, FeedSummary>()
  posts.forEach(post => {
    if (!post?.rssSub?.id) return
    const existing = feedAccumulator.get(post.rssSub.id) ?? {
      id: post.rssSub.id,
      title: post.rssSub.title,
      icon: post.rssSub.icon || post.rssSub.favicon,
      count: 0,
      unreadCount: 0,
    }
    existing.count += 1
    if (!post.isRead) {
      existing.unreadCount += 1
    }
    feedAccumulator.set(post.rssSub.id, existing)
  })

  const feeds = Array.from(feedAccumulator.values()).sort(
    (a, b) => b.count - a.count,
  )

  return {
    totalCount,
    favoriteCount,
    unreadCount,
    tagStats,
    feeds,
  }
}

const formatTagLabel = (tag: string) => {
  if (!tag) return 'Discover'
  switch (tag) {
    case 'twitter':
      return 'Twitter'
    case 'youtube':
      return 'YouTube'
    case 'bilibili':
      return 'Bilibili'
    case 'news':
      return 'News'
    default:
      return tag.charAt(0).toUpperCase() + tag.slice(1)
  }
}

function resolveTagIcon(tag: string): LucideIcon {
  switch (tag) {
    case 'twitter':
      return Flame
    case 'youtube':
      return Youtube
    case 'bilibili':
      return Video
    case 'news':
      return Compass
    default:
      return Clapperboard
  }
}
