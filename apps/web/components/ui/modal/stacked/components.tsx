import { ButtonMotionBase } from 'ui'

import { useCurrentModal } from './hooks'

export const ModalClose = () => {
  const { dismiss } = useCurrentModal()

  return (
    <ButtonMotionBase
      aria-label={'Close'}
      className="hover:bg-material-ultra-thick absolute right-6 top-6 flex size-8 items-center justify-center rounded-md duration-200"
      onClick={dismiss}
    >
      <i className="i-mgc-close-cute-re block" />
    </ButtonMotionBase>
  )
}
