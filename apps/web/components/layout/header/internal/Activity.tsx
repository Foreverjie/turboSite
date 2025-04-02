'use client'

import { useQuery } from '@tanstack/react-query'
import React, { memo, useEffect, useMemo } from 'react'
import { AnimatePresence, m } from 'motion/react'
import Image from 'next/image'

import { useActivity } from '~/utils/activity'
// import { ImpressionView } from '~/components/common/ImpressionTracker'
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'ui'
import { softBouncePreset } from '~/components/ui/transition/spring'
// import { TrackerAction } from '~/constants/tracker'
import useDebounceValue from '~/hooks/common/use-debounce-value'
import { usePageIsActive } from '~/hooks/common/use-is-active'
// import { apiClient } from '~/lib/request'
import {
  useAggregationSelector,
  useAppConfigSelector,
} from '~/providers/root/aggregation-data-provider'

// autocorrect: false
const appDescription = {
  Typora: '水文',
  Xcode: '玩个锤子',
  iTerm2: '耍杂技',
  NeteaseMusic: '听歌',
  QQ音乐: '听歌',

  'Google Chrome': '冲浪',
  'Google Chrome Canary': '调试',
  QQ: '水群',
  Messages: '看验证码',
  Code: 'Restart TS Server',
  Infuse: '看片',
  kitty: '撸猫',
  Warp: '耍杂技',
  'Microsoft Word': '码字',
  'Microsoft Excel': '雕花',
  'Microsoft PowerPoint': '画饼',
  SimplyPiano: '练琴',

  'Microsoft Edge': '看b站',
  WindowsTerminal: 'del /f /s /q c:/ (不是',
  卡拉彼丘: '启动！',
  'Genshin.exe': '启动！',
} as any
const appLabels: { [app: string]: string } = {
  'Activity Monitor': 'activity',
  'Chrome Canary': 'chrome_canary',
  'Code - Insiders': 'code',
  'Google Chrome Canary': 'chrome_canary',
  'Google Chrome': 'chrome',
  'System Preferences': 'system',
  'System Settings': 'system',
  'Adobe Illustrator 2023': 'illustrator',
  'Microsoft Word': 'word',
  'Microsoft Excel': 'excel',
  'Microsoft PowerPoint': 'powerpoint',
  'Final Cut Pro': 'final_cut',
  'Logic Pro': 'logic',
  'Hopper Disassembler': 'hopper',
  Warp: 'warp',

  访达: 'finder',
  邮件: 'mail',
  地图: 'maps',
  信息: 'messages',
  音乐: 'music',
  网易云音乐: 'netease',
  备忘录: 'notes',
  Safari浏览器: 'safari',
  微信: 'wechat',
  腾讯会议: 'tencent_meeting',
  Arc: 'arc',
  Chrome: 'chrome',
  Code: 'code',
  Discord: 'discord',
  Figma: 'figma',
  Finder: 'finder',
  Home: 'homekit',
  Infuse: 'infuse',
  Linear: 'linear',
  Mail: 'mail',
  Maps: 'maps',
  Messages: 'messages',
  Music: 'music',
  NetEaseMusic: 'netease',
  Notes: 'notes',
  QQ: 'qq',
  QQ音乐: 'qqmusic',
  Safari: 'safari',
  Slack: 'slack',
  Telegram: 'telegram',
  Typora: 'typora',
  Videos: 'apptv',
  WeChat: 'wechat',
  WebStorm: 'webstorm',
  Xcode: 'xcode',
  iTerm2: 'iterm2',
  kitty: 'kitty',
  TencentMeeting: 'tencent_meeting',
  Lark: 'lark',
  Feishu: 'lark',
  SimplyPiano: 'simply_piano',
  GoLand: 'goland',
  PyCharm: 'pycharm',
  TestFlight: 'tf',
  Playgrounds: 'playgrounds',
  ida64: 'ida64',
  Proxyman: 'proxyman',
  Surge: 'surge',
  Termius: 'termius',
  Thorium: 'thorium',

  cmusic: 'cmusic',

  'Microsoft Edge': 'edge',
  firefox: 'firefox',
  idea64: 'idea',
  'Explorer.EXE': 'windows_explorer',
  WindowsTerminal: 'windows_terminal',
  卡拉彼丘: 'calatopia',
  'Yuanshen.exe': 'genshin',
}

export const Activity = memo(() => {
  const { appConfig } = useAppConfigSelector()
  const activityConfig = appConfig?.module.activity
  const { enable = false, endpoint = '/fn/ps/update' } = activityConfig || {}
  const { activity, setActivity } = useActivity()

  const isPageActive = usePageIsActive()
  //   const { data } = useQuery({
  //     queryKey: ['activity'],
  //     queryFn: async () => {
  //       return await apiClient
  //         .proxy(endpoint)
  //         .post<{
  //           processName: string
  //           mediaInfo?: {
  //             title: string
  //             artist: string
  //           }
  //         }>()
  //         .then(res => res)
  //         .catch(() => {
  //           return { processName: '', mediaInfo: undefined }
  //         })
  //     },
  //     refetchInterval: 1000 * 5 * 60,
  //     refetchOnMount: 'always',
  //     retry: false,
  //     refetchOnReconnect: true,
  //     refetchOnWindowFocus: 'always',
  //     enabled: enable && isPageActive,
  //     meta: {
  //       persist: false,
  //     },
  //   })

  //   useEffect(() => {
  //     if (!data) return
  //     if (data.mediaInfo) {
  //       setActivity({
  //         ...activity,
  //         media: data.mediaInfo,
  //       })
  //     } else {
  //       setActivity({
  //         ...activity,
  //         media: null,
  //       })
  //     }
  //     setActivity({
  //       ...activity,
  //       processName: data.processName,
  //     })
  //   }, [activity, data, setActivity])

  const ownerName = useAggregationSelector().aggregationData?.url.webUrl || ''
  const memoProcessName = useMemo(
    () => ({ processName: activity?.processName || '' }),
    [activity?.processName],
  )

  const { processName, media } = activity
  const debounceProcess = useDebounceValue(processName, 800)

  if (debounceProcess && !appLabels[debounceProcess]) {
    console.log('Not collected process name: ', debounceProcess)
  }

  return (
    <>
      {!!media && (
        <m.div className="absolute bottom-0 left-0 top-0 z-[10] flex items-center lg:left-[-30px]">
          <div className="absolute inset-0 z-[-1] flex center">
            <div className="h-6 w-6 rounded-md ring-2 ring-red-500 dark:ring-red-400" />
          </div>
          <HoverCard>
            <HoverCardTrigger>
              <TriggerComponent processName={cMusicProps.processName} />
            </HoverCardTrigger>
            <HoverCardContent>
              {ownerName} 正在听 {media.title} - {media.artist}
            </HoverCardContent>
          </HoverCard>
        </m.div>
      )}
      {isPageActive && (
        <AnimatePresence>
          {!!appLabels[processName] && (
            <m.div
              key={processName}
              className="pointer-events-auto absolute bottom-0 right-0 top-0 z-[10] flex items-center overflow-hidden lg:right-[-25px]"
              initial={{
                opacity: 0.0001,
                y: 15,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                x: -10,
              }}
              transition={softBouncePreset}
            >
              <HoverCard>
                <HoverCardTrigger>
                  <TriggerComponent processName={memoProcessName.processName} />
                </HoverCardTrigger>
                <HoverCardContent>
                  {/* <ImpressionView
                  action={TrackerAction.Impression}
                  trackerMessage="Activity"
                > */}
                  {ownerName} 正在使用 {processName}
                  {appDescription[processName]
                    ? ` ${appDescription[processName]}`
                    : ''}
                  {/* </ImpressionView> */}
                </HoverCardContent>
              </HoverCard>
            </m.div>
          )}
        </AnimatePresence>
      )}
    </>
  )
})
Activity.displayName = 'Activity'
const cMusicProps = { processName: 'cmusic' }
const TriggerComponent = memo<{
  processName: string
}>(({ processName }) => {
  return (
    <Image
      width={32}
      height={32}
      src={`/apps/${appLabels[processName]}.png`}
      alt={processName}
      priority
      fetchPriority="low"
      className="pointer-events-none select-none"
    />
  )
})

TriggerComponent.displayName = 'ActivityIcon'
