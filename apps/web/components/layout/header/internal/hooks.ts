import {
  createElement,
  lazy,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { PageScrollInfoContext } from '../../../../providers/root/page-scroll-info-provider'
import { useModalStack } from '../../../ui/modal/stacked/hooks'
import { isMobile } from '../../../../utils'
import { PlainModal } from '../../../ui/modal/stacked/custom-modal'
import { cn } from 'ui/src/utils'

const LazyUserProfileModalContent = lazy(() =>
  import('./UserProfileModal').then(mod => ({
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
  // const presentAsync = useAsyncModal()
  return useCallback(
    (userId: string | undefined, overrideVariant?: Variant) => {
      if (!userId) return
      const finalVariant = overrideVariant || variant

      // if (isMobile()) {
      //   const useDataFetcher = () => {
      //     const user = useAuthQuery(users.profile({ userId }))
      //     const subscriptions = useUserSubscriptionsQuery(user.data?.id)
      //     return {
      //       ...user,
      //       isLoading: user.isLoading || subscriptions.isLoading,
      //     }
      //   }
      //   type ResponseType = Awaited<ReturnType<ReturnType<typeof useDataFetcher>["fn"]>>
      //   return presentAsync<ResponseType>({
      //     id: `user-profile-${userId}`,
      //     title: (data: ResponseType) => `${data.name}'s Profile`,

      //     content: () => createElement(LazyUserProfileModalContent, { userId }),
      //     useDataFetcher,
      //     overlay: true,
      //   })
      // }

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
