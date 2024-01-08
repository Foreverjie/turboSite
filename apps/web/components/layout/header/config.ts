import { LightBulbIcon } from '@heroicons/react/24/outline'
import {
  HomeIcon,
  ScrollTextIcon,
  TwitterIcon,
  ArchiveIcon,
  MoreHorizontalIcon,
  BathIcon,
  BookOpenIcon,
  BikeIcon,
  LibraryIcon,
  PresentationIcon,
  MessageCircleIcon,
} from 'lucide-react'
import { createElement as h } from 'react'
import type { ReactNode } from 'react'

export interface IHeaderMenu {
  title: string
  path: string
  type?: string
  icon?: ReactNode
  subMenu?: IHeaderMenu[]
}

export const headerMenuConfig: IHeaderMenu[] = [
  {
    title: 'Home',
    path: '/',
    type: 'Home',
    icon: h(HomeIcon),
  },
  {
    title: 'Post',
    path: '/posts',
    type: 'Post',
    icon: h(TwitterIcon),
  },
  {
    title: 'Note',
    path: '/notes',
    type: 'Note',
    icon: h(ScrollTextIcon),
  },
  {
    title: 'Quick Overview',
    path: '/timeline',
    icon: h(ArchiveIcon),
    subMenu: [
      {
        title: 'Life',
        path: '/timeline?type=note',
        icon: h(BikeIcon),
      },
      {
        title: 'Blog',
        path: '/timeline?type=post',
        icon: h(BookOpenIcon),
      },
      {
        title: 'Memory',
        path: '/timeline?memory=1',
        icon: h(BathIcon),
      },
      {
        title: 'Topics',
        path: '/notes/topics',
        icon: h(LibraryIcon),
      },
    ],
  },
  {
    title: 'More',
    path: '#',
    icon: h(MoreHorizontalIcon),
    subMenu: [
      {
        title: 'Thinking',
        icon: h(LightBulbIcon),
        path: '/thinking',
      },
      {
        title: 'Projects',
        icon: h(PresentationIcon),
        path: '/projects',
      },
      {
        title: 'Comments',
        path: '/says',
        icon: h(MessageCircleIcon),
      },
    ],
  },
]
