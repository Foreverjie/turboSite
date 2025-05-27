import { withResponsiveSyncComponent } from '~/utils/selector'
import { UserPreferenceModalContent as UserPreferenceModalContentDesktop } from './UserPreferenceModal.electron'
import { UserPreferenceModalContent as UserPreferenceModalContentMobile } from './UserPreferenceModal.mobile'

export const UserProfileModalContent = withResponsiveSyncComponent(
  UserPreferenceModalContentDesktop,
  UserPreferenceModalContentMobile,
)
