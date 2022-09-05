import { trpc } from '../../utils/trpc'

export default function UserProfile() {
  const { data, isLoading } = trpc.useQuery(['user.Me'])

  return (
    <>
      <div className="">
        <div className=""></div>
      </div>
    </>
  )
}
