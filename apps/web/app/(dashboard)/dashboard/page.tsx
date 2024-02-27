'use client'

import { IpInfoPopover } from '~/components/Ip/IpInfoPopover'
import { trpc } from '~/utils/trpc'
import { DataStatus, Poem } from '../../../components/Dashboard'

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-[1500px] p-4">
      <h1 className="text-3xl font-light">Welcome back</h1>

      <div className="mt-8 flex flex-col gap-4 lg:grid lg:grid-cols-2">
        {/* <div>
            <h3 className="my-[10px] font-light text-opacity-80">一言</h3>
  
            <Hitokoto />
          </div> */}
        <div>
          <h3 className="my-[10px] font-light text-opacity-80">Today's Poem</h3>
          <Poem />
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-8">
        <UserLoginStat />
        <DataStatus />

        {/* 

        <Version /> */}
      </div>
    </div>
  )
}

const UserLoginStat = () => {
  const { data: user, isLoading } = trpc.user.me.useQuery()
  const { data: ipInfo, isLoading: ipInfoLoading } = trpc.ip.info.useQuery()

  if (isLoading || ipInfoLoading)
    return <div className="loading loading-dots" />
  if (!user) return null
  return (
    <div>
      <h3 className="mb-4 text-xl font-light text-opacity-80">Login Status</h3>
      <div className="relative -mt-2 mb-3 text-gray-500">
        {ipInfo?.ip ? (
          <span className="flex items-center">
            <span className="mr-2">Login IP: </span>
            <IpInfoPopover {...ipInfo} />
          </span>
        ) : null}
        <div className="pt-[.5rem]" />
        {user.lastLoginTime ? (
          <span>
            Login Time:
            <time className="ml-2">
              {new Date(user.lastLoginTime).toDateString()}
            </time>
          </span>
        ) : null}
      </div>
    </div>
  )
}
