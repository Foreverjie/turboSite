// import { UserRole } from '@follow/constants'
import type { FC } from 'react'
// import { useTranslation } from 'react-i18next'
import Link from 'next/link'

// import rsshubLogoUrl from '~/assets/rsshub-icon.png?url'
// import { useUserRole, useWhoami } from '~/atoms/user'
// import { UrlBuilder } from '~/lib/url-builder'
// import { signOut } from '~/queries/auth'
// import { useWallet } from '~/queries/wallet'

// import { useAchievementModal } from '../achievement/hooks'
// import { useActivationModal } from '../activation'
// import { useSettingModal } from '../settings/modal/use-setting-modal-hack'
import type { ProfileButtonProps } from './ProfileButton.electron'
import { UserAvatar } from './UserAvatar'
import { PresentSheet } from '~/components/ui/sheet'
import { EllipsisHorizontalTextWithTooltip } from '~/components/ui/typography/EllipsisWithTooltip'
import { Divider } from '~/components/ui/divider'
import { cn } from 'ui/src/utils'
import { usePresentUserProfileModal } from './hooks'
import { trpc } from '~/utils/trpc'

export const ProfileButton: FC<ProfileButtonProps> = () => {
  // const user = useWhoami()

  const { data: user, isLoading } = trpc.user.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retryOnMount: false,
  })

  const presentUserProfile = usePresentUserProfileModal('dialog')
  // const presentAchievement = useAchievementModal()
  // const { t } = useTranslation()

  // const role = useUserRole()
  // const wallet = useWallet()
  // const { isLoading: isLoadingWallet } = wallet
  // const myWallet = wallet.data?.[0]
  // const presentActivationModal = useActivationModal()
  // const settingModalPresent = useSettingModal()
  return (
    <PresentSheet
      zIndex={99}
      content={
        <>
          <div className="p-4 pt-0">
            <div className="flex flex-col items-center gap-1 text-center leading-none">
              <UserAvatar hideName className="size-16 p-0 [&_*]:border-0" />
              <EllipsisHorizontalTextWithTooltip className="mx-auto max-w-[20ch] truncate text-lg">
                {user?.user_metadata.name}
              </EllipsisHorizontalTextWithTooltip>
              {!!user?.user_metadata.handle && (
                <a href={'#'} className="block">
                  <EllipsisHorizontalTextWithTooltip className="truncate text-xs font-medium text-zinc-500">
                    @{user.user_metadata.handle}
                  </EllipsisHorizontalTextWithTooltip>
                </a>
              )}
            </div>
          </div>

          {/* <Link
            href="/power"
            className="mx-auto flex w-[300px] items-center justify-between font-semibold"
          >
            <PowerButton isLoading={isLoadingWallet} myWallet={myWallet} />
            <Level
              level={myWallet?.level?.level || 0}
              isLoading={isLoadingWallet}
            />
            <ActivityPoints
              className="text-sm"
              points={myWallet?.level?.prevActivityPoints || 0}
              isLoading={isLoadingWallet}
            />
          </Link> */}

          <Divider className="!bg-border h-px" />

          <div className="mx-auto w-full max-w-[350px]">
            <Item
              icon={<i className="i-mgc-user-3-cute-re" />}
              // label={t('user_button.profile')}
              label={'Profile'}
              onClick={() => {
                presentUserProfile(user?.id)
              }}
            />

            {/* <Item
              label={t('user_button.achievement')}
              onClick={() => {
                if (role !== UserRole.Trial) {
                  presentAchievement()
                } else {
                  presentActivationModal()
                }
              }}
              icon={<i className="i-mgc-trophy-cute-re" />}
            /> */}

            <Divider className="!bg-border/80 mx-auto h-px w-[50px]" />

            <Item
              label={'Actions'}
              link="/action"
              icon={<i className="i-mgc-magic-2-cute-re" />}
            />
            {/* <Item
              label={'Preferences'}
              onClick={() => {
                settingModalPresent()
              }}
              icon={<i className="i-mgc-settings-7-cute-re" />}
            /> */}
            <Item
              label={'Log Out'}
              onClick={() => {}}
              icon={<i className="i-mgc-exit-cute-re" />}
            />
          </div>
        </>
      }
    >
      <UserAvatar hideName className="w-6 h-6 shrink-0 p-0 [&_*]:border-0" />
    </PresentSheet>
  )
}

const Item: FC<{
  icon: React.ReactNode
  label: string
  onClick?: () => void
  link?: string
}> = ({ icon, label, onClick, link }) => {
  const containerClassName = cn(
    'relative flex w-full select-none items-center rounded-sm px-4 py-1.5 outline-none transition-colors focus:bg-theme-item-hover',
    'text-base font-medium',
    'focus-within:!outline-transparent',
  )

  const children = (
    <>
      <span className="mr-1.5 inline-flex size-4 items-center justify-center">
        {icon}
      </span>

      {label}
      {/* Justify Fill */}
      <span className="ml-1.5 size-4" />
    </>
  )

  if (link) {
    return (
      <Link href={link} className={containerClassName}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={containerClassName}>
      {children}
    </button>
  )
}
