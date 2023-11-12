'use client'

import React from 'react'
import Image from 'next/image'
import { trpc, trpcApi } from '../../utils/trpc'
import { dateFormat } from '../../utils'
import PostCard from '../../components/Feed/PostCard'

const ProfilePage = () => {
  const { data: user, isLoading } = trpc.user.me.useQuery()

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center">
          {user?.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatar}
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full"
            />
          ) : null}
          <div className="flex flex-col space-y-2 mt-4 items-center sm:mt-0 sm:ml-4">
            <h3 className="text-lg leading-6 font-medium">{user?.name}</h3>
            <p className="text-sm leading-5">{user?.email}</p>
            {user?.createdAt ? (
              <p className="mt-1 text-sm leading-5">
                Joined on {dateFormat(new Date(user.createdAt), 'YYYY-mm-dd')}
              </p>
            ) : null}
          </div>
        </div>

        {user?.Post?.length ? (
          <div className="mt-8">
            <div className="flex flex-col justify-between items-center">
              <h3 className="text-lg leading-6 font-medium">Posts</h3>
              <p className="text-sm leading-5">
                {user?.Post?.length} posts in total
              </p>
              {user.Post.map(post => (
                <PostCard {...post} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ProfilePage
