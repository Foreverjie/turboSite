'use client'

import { UserCircleIcon } from 'lucide-react'
import { signIn, signOut } from './action'
import { HeaderActionButton } from './HeaderActionButton'
import { ButtonMotionBase, DropdownMenuItem } from 'ui'
import { useModalStack } from '../../../ui/modal'
import { FC, useCallback } from 'react'
import { useIsMobile } from '../../../../utils/viewport'
import { m } from 'motion/react'

const AuthLoginModalContent = () => {
  const isMobile = useIsMobile()

  const Inner = (
    <>
      <div className="-mt-0 text-center">
        登录到 <b>Flash</b>
      </div>

      <div className="mt-6">
        <AuthProvidersRender />
      </div>
    </>
  )
  if (isMobile) {
    return Inner
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10, transition: { type: 'tween' } }}
      transition={{ type: 'spring' }}
      className="absolute left-1/2 top-1/2"
    >
      <div className="w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-base-100 p-3 shadow-2xl shadow-stone-300 dark:border-neutral-700 dark:shadow-stone-800">
        {Inner}
      </div>
    </m.div>
  )
}

export const AuthProvidersRender: FC = () => {
  //   const providers = useAuthProviders()
  const providers = ['github', 'google', 'facebook', 'twitter']
  //   const [authProcessingLockSet, setAuthProcessingLockSet] = useState(
  //     () => new Set<AuthSocialProviders>(),
  //   )
  return (
    <>
      {providers && (
        <ul className="flex items-center justify-center gap-3">
          {providers.map(provider => (
            <li key={provider}>
              <ButtonMotionBase
                // disabled={authProcessingLockSet.has(provider)}
                onClick={() => {
                  //   if (authProcessingLockSet.has(provider)) return
                  //   authClient.signIn.social({
                  //     provider,
                  //     callbackURL: window.location.href,
                  //   })
                  //   setAuthProcessingLockSet(prev => {
                  //     prev.add(provider)
                  //     return new Set(prev)
                  //   })
                }}
              >
                <div className="flex size-10 items-center justify-center rounded-full border bg-base-100 dark:border-neutral-700">
                  {/* {!authProcessingLockSet.has(provider) ? (
                    <Fragment>
                      {provider === 'github' ? (
                        <GitHubBrandIcon />
                      ) : (
                        <img
                          className="size-4"
                          src={`https://authjs.dev/img/providers/${provider}.svg`}
                        />
                      )}
                    </Fragment>
                  ) : ( */}
                  <div className="center flex">
                    <i className="loading loading-spinner loading-xs opacity-50" />
                  </div>
                  {/* )} */}
                </div>
              </ButtonMotionBase>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export const SignInButton = () => {
  const { present } = useModalStack()

  const handleSignIn = useCallback(() => {
    present({
      title: '',
      overlay: true,
      clickOutsideToDismiss: true,
      CustomModalComponent: ({ children }) => <div>{children}</div>,
      content: AuthLoginModalContent,
    })
  }, [present])
  return (
    <HeaderActionButton
      onClick={() => {
        handleSignIn()
      }}
    >
      <UserCircleIcon size={20} />
    </HeaderActionButton>
  )
}

export const SignOutButton = () => {
  return (
    <DropdownMenuItem
      onClick={() => {
        signOut()
      }}
      icon={<i className="i-mingcute-exit-line size-4" />}
    >
      Sign Out
    </DropdownMenuItem>
  )
}
