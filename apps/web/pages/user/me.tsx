import { Avatar, AvatarFallback, AvatarImage } from 'ui/src'
import { trpc } from '../../utils/trpc'

export default function UserProfile() {
  const { data: user, isLoading } = trpc.useQuery(['user.Me'])

  return (
    <>
      <div className="">
        <Avatar className="mt-4">
          <div>
            <AvatarImage
              src={
                user?.avatar ??
                'https://jie-site.oss-cn-shenzhen.aliyuncs.com/avatar-man-icon-profile-placeholder-260nw-1229859850-e1623694994111.jpeg'
              }
              alt={user?.name as string}
            />
            <AvatarFallback delayMs={600}>{user?.name}</AvatarFallback>
          </div>
        </Avatar>
        <div className="">{user?.name}</div>
        <div className="">{user?.email}</div>
      </div>
    </>
  )
}
