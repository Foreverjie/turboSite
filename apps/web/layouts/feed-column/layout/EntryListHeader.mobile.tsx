import type { FC } from 'react'

import { LOGO_MOBILE_ID } from '~/constants/dom'

import type { EntryListHeaderProps } from './EntryListHeader.shared'
import { EllipsisHorizontalTextWithTooltip } from '~/components/ui/typography/EllipsisWithTooltip'
import { cn } from 'ui/src/utils'
import { stopPropagation } from '~/lib/dom'
import { ActionButton } from '~/components/ui/button'
import { RotatingRefreshIcon } from '~/components/ui/loading'
import { PresentSheet } from '~/components/ui/sheet'
import { Logo } from '~/icons/logo'
import { FeedColumnMobile } from '../mobile'

export const EntryListHeader: FC<EntryListHeaderProps> = ({
  refetch,
  isRefreshing,
  hasUpdate,
}) => {
  // const routerParams = useRouteParams()
  // const { t } = useTranslation()

  // const unreadOnly = useGeneralSettingKey('unreadOnly')

  // const { feedId } = routerParams

  const titleInfo = (
    <div className="flex min-w-0 items-center break-all text-lg font-bold leading-tight">
      <EllipsisHorizontalTextWithTooltip className="inline-block !w-auto max-w-full">
        {'Video'}
      </EllipsisHorizontalTextWithTooltip>
    </div>
  )

  return (
    <div
      className={cn(
        'flex w-full flex-col pb-2 pr-4 transition-[padding] duration-300 ease-in-out',
        'pt-safe-offset-2.5 pl-6',
        'bg-background',
      )}
    >
      <div className="flex w-full justify-between pb-1 pl-8">
        <FollowSubscriptionButton />

        {titleInfo}
        <div
          className={cn(
            'relative z-[1] flex items-center gap-1 self-baseline text-zinc-500',

            'translate-x-[6px]',
          )}
          onClick={stopPropagation}
        >
          <ActionButton
            tooltip={'refetch'}
            onClick={() => {
              refetch()
            }}
          >
            <RotatingRefreshIcon
              className={cn(hasUpdate && 'text-accent')}
              isRefreshing={isRefreshing}
            />
          </ActionButton>
        </div>
      </div>
    </div>
  )
}

const FollowSubscriptionButton = () => {
  return (
    <PresentSheet
      zIndex={50}
      dismissableClassName="mb-0"
      triggerAsChild
      content={<FeedColumnMobile asWidget />}
      modalClassName="bg-background pt-4 h-[calc(100svh-3rem)]"
      contentClassName="p-0 overflow-visible"
    >
      <ActionButton
        id={LOGO_MOBILE_ID}
        tooltip="Subscription"
        className="text-text-secondary absolute left-3 translate-y-px"
      >
        <Logo className="size-4" />
      </ActionButton>
    </PresentSheet>
  )
}
