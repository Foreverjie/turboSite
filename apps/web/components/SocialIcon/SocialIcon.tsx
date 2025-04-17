import { memo, useMemo } from 'react'
import type { ReactNode } from 'react'

import { BilibiliIcon } from './BilibiliIcon'
import { TwitterIcon } from 'lucide-react'
import { ButtonMotionBase } from 'ui'
import { FloatPopover } from '~/components/ui/float-popover'

interface SocialIconProps {
  type: string
  id: string
}

const iconSet: Record<
  string,
  [string, ReactNode, string, (id: string) => string | null]
> = {
  github: [
    'Github',
    <i className="i-mingcute-github-line" />,
    '#181717',
    id => `https://github.com/${id}`,
  ],
  twitter: [
    'Twitter',
    <i className="i-mingcute-twitter-line" />,
    '#1DA1F2',
    id => `https://twitter.com/${id}`,
  ],
  telegram: [
    'Telegram',
    <i className="i-mingcute-telegram-line" />,
    '#0088cc',
    id => `https://t.me/${id}`,
  ],
  mail: [
    'Email',
    <i className="i-mingcute-mail-line" />,
    '#D44638',
    id => `mailto:${id}`,
  ],
  get email() {
    return this.mail
  },
  get feed() {
    return this.rss
  },
  rss: ['RSS', <i className="i-mingcute-rss-line" />, '#FFA500', id => id],
  bilibili: [
    'Bilibili',
    <BilibiliIcon />,
    '#00A1D6',
    id => `https://space.bilibili.com/${id}`,
  ],
  qq: [
    'QQ',
    <i className="i-mingcute-qq-fill" />,
    '#1e6fff',
    id => `https://wpa.qq.com/msgrd?v=3&uin=${id}&site=qq&menu=yes`,
  ],
  wechat: [
    'Wechat',
    <i className="i-mingcute-wechat-fill" />,
    '#2DC100',
    id => null,
  ],
}
const icons = Object.keys(iconSet)

export const isSupportIcon = (icon: string) => icons.includes(icon)
export const SocialIcon = memo((props: SocialIconProps) => {
  const { id, type } = props

  const [name, Icon, iconBg, hrefFn] = useMemo(() => {
    const [name, Icon, iconBg, hrefFn] = (iconSet as any)[type as any] || []
    return [name, Icon, iconBg, hrefFn]
  }, [type])

  if (!name) return null
  const href = hrefFn(id)

  return (
    <FloatPopover
      type="tooltip"
      triggerElement={
        <ButtonMotionBase
          className="flex aspect-square size-10 rounded-full text-2xl text-white center"
          style={{
            background: iconBg,
          }}
        >
          {href !== null ? (
            <a
              target="_blank"
              href={href}
              className="flex center"
              rel="noreferrer"
            >
              {Icon}
            </a>
          ) : (
            <span className="flex center">{Icon}</span>
          )}
        </ButtonMotionBase>
      }
    >
      {href !== null ? name : id}
    </FloatPopover>
  )
})
SocialIcon.displayName = 'SocialIcon'
