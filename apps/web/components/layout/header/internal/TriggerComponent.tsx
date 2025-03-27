import { HeaderActionButton } from './HeaderActionButton'
import { UserCircleIcon } from 'lucide-react'

export const TriggerComponent = () => {
  return (
    <HeaderActionButton aria-label="Guest Login" onClick={() => {}}>
      <UserCircleIcon className="h-4 w-4" />
    </HeaderActionButton>
  )
}
