import { memo } from 'react'

import { ErrorBoundary } from '~/components/common/ErrorBoundary'
import { HeaderDataConfigureProvider } from './internal/HeaderDataConfigureProvider'
import { HeaderWithShadow } from './internal/HeaderWithShadow'
import { BlurredBackground } from './internal/BlurredBackground'
import styles from './internal/grid.module.css'
import { cn } from 'ui/src/utils'
import {
  HeaderCenterArea,
  HeaderLeftButtonArea,
  HeaderLogoArea,
} from './internal/HeaderArea'
import { HeaderDrawerButton } from './internal/HeaderDrawerButton'
import { AnimatedLogo } from './internal/AnimatedLogo'
import { UserAvatar } from './internal/UserAvatar'
import { HeaderContent } from './internal/HeaderContent'
import { ProfileButton } from './internal/ProfileButton'

export const Header = () => {
  return (
    <ErrorBoundary>
      <HeaderDataConfigureProvider>
        <MemoHeader />
      </HeaderDataConfigureProvider>
    </ErrorBoundary>
  )
}

const MemoHeader = memo(() => {
  return (
    <HeaderWithShadow>
      <BlurredBackground />

      <div
        className={cn(
          'relative mx-auto grid h-full min-h-0 max-w-7xl grid-cols-[4.5rem_auto_4.5rem] lg:px-8',
          styles['header--grid'],
        )}
      >
        <HeaderLeftButtonArea>
          <HeaderDrawerButton />
        </HeaderLeftButtonArea>

        <HeaderLogoArea>
          <AnimatedLogo />

          {/* <OnlyMobile>
            <HeaderMeta />
          </OnlyMobile> */}
        </HeaderLogoArea>

        <HeaderCenterArea>
          <HeaderContent />
          {/* <HeaderMeta /> */}
        </HeaderCenterArea>

        <div className="flex size-full items-center">
          <ProfileButton method="modal" animatedAvatar />
        </div>
      </div>
    </HeaderWithShadow>
  )
})

MemoHeader.displayName = 'MemoHeader'
