import {
  createElement,
  lazy,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { cn } from 'ui/src/utils'
import { PageScrollInfoContext } from '../../../../providers/root/page-scroll-info-provider'
import { PlainModal } from '../../../ui/modal/stacked/custom-modal'
import { useModalStack } from '../../../ui/modal/stacked/hooks'

const LazyUserProfileModalContent = lazy(() =>
  import('./UserProfileModal').then(mod => ({
    default: mod.UserProfileModalContent,
  })),
)

const LazyUserPreferenceModalContent = lazy(() =>
  import('./UserPreferenceModal').then(mod => ({
    default: mod.UserProfileModalContent,
  })),
)

export const useHeaderBgOpacity = ({ y }: { y: number }) => {
  const threshold = 50
  const headerShouldShowBg = true

  const [bgOpacity, setBgOpacity] = useState(0)

  useEffect(() => {
    const opacity = headerShouldShowBg
      ? y >= threshold
        ? 1
        : Math.floor((y / threshold) * 100) / 100
      : 0
    setBgOpacity(opacity)
  }, [headerShouldShowBg, y])

  return bgOpacity
}

export const useMenuOpacity = () => {
  const { y } = useContext(PageScrollInfoContext)
  const headerOpacity = useHeaderBgOpacity({ y })

  return 1 - headerOpacity
}

export const useHeaderMetaShouldShow = () => {
  const v = useMenuOpacity() > 0
  const { title, description } = useHeaderMetaInfo()

  return title !== '' && description !== '' && !v
}

export const useHeaderMetaInfo = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [slug, setSlug] = useState('')

  return {
    title,
    setTitle,
    description,
    setDescription,
    slug,
    setSlug,
  }
}

export const useHeaderShouldShowBg = () => {
  const [shouldShow, setShouldShow] = useState(true)

  return {
    shouldShow,
    setShouldShow,
  }
}

type Variant = 'drawer' | 'dialog'
export const usePresentUserProfileModal = (variant: Variant = 'dialog') => {
  const { present } = useModalStack()
  return useCallback(
    (userId: string | undefined, overrideVariant?: Variant) => {
      if (!userId) return
      const finalVariant = overrideVariant || variant

      present({
        title: 'User Profile',
        id: `user-profile-${userId}`,
        content: () =>
          createElement(LazyUserProfileModalContent, {
            userId,
            variant: finalVariant,
          }),
        CustomModalComponent: PlainModal,
        clickOutsideToDismiss: true,
        modal: finalVariant === 'dialog',
        overlay: finalVariant === 'dialog',
        autoFocus: false,
        modalContainerClassName:
          finalVariant === 'drawer'
            ? cn`right-4 left-[auto] safe-inset-top-4 bottom-4`
            : 'overflow-hidden',
      })
    },
    // [present, presentAsync, variant],
    [present, variant],
  )
}

export const usePresentUserPreferenceModal = (variant: Variant = 'dialog') => {
  const { present } = useModalStack()
  // const presentAsync = useAsyncModal()
  return useCallback(
    ({
      userId,
      displayName,
      isMobile,
    }: {
      userId: string
      displayName: string
      isMobile: boolean
    }) => {
      if (isMobile) {
        return present({
          id: `user-profile-${userId}`,
          title: `${displayName}'s Profile`,
          content: () => createElement(LazyUserPreferenceModalContent),
          overlay: true,
        })
      }

      present({
        title: 'User Preference',
        id: `user-preference`,
        content: () => createElement(LazyUserPreferenceModalContent),
        CustomModalComponent: PlainModal,
        clickOutsideToDismiss: true,
        modal: variant === 'dialog',
        overlay: variant === 'dialog',
        autoFocus: false,
        modalContainerClassName:
          variant === 'drawer'
            ? cn`right-4 left-[auto] safe-inset-top-4 bottom-4`
            : 'overflow-hidden',
      })
    },
    // [present, presentAsync, variant],
    [present, variant],
  )
}
