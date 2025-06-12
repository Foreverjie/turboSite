import { withResponsiveSyncComponent } from '~/utils/selector'
import type { ProfileButtonProps } from './ProfileButton.electron'
import { ProfileButton as ProfileButtonDesktop } from './ProfileButton.electron'
import { ProfileButton as ProfileButtonMobile } from './ProfileButton.mobile'

export const ProfileButton = withResponsiveSyncComponent<ProfileButtonProps>(
  ProfileButtonDesktop,
  ProfileButtonMobile,
)
