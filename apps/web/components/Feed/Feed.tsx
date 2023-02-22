import React, { ReactElement } from 'react'
import { Loading } from 'ui'
import { trpc } from '../../utils/trpc'
import PostCard from './PostCard'

// inferQueryOutput<'post.All'>
const Feed = (): ReactElement => {
  const { data: posts, isLoading } = trpc.post.all.useQuery()

  console.log('posts', posts)

  return (
    <>
      <div className="flex items-center justify-center">
        {isLoading && <Loading />}
      </div>

      {posts &&
        posts.map(p => {
          return <PostCard key={p.id} {...p} />
        })}
    </>
  )
}

export default Feed
