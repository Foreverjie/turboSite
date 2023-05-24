import { Avatar, AvatarFallback, AvatarImage } from 'ui/src'
import { trpc } from '../../utils/trpc'

export default function UserProfile() {
  const { data: user, isLoading } = trpc.useQuery(['user.Me'])

  return (
    <>
      <div className="">
        <Avatar user={user} />
        <div className="">{user?.name}</div>
        <div className="">{user?.email}</div>
      </div>
    </>
  )
}
