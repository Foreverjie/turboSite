import { signIn } from 'next-auth/react'
import { HeaderActionButton } from './HeaderActionButton'
import { UserCircleIcon } from 'lucide-react'

export const TriggerComponent = () => {
  return (
    <HeaderActionButton
      aria-label="Guest Login"
      onClick={() => {
        signIn()
      }}
    >
      <UserCircleIcon className="h-4 w-4" />
    </HeaderActionButton>
  )
}
