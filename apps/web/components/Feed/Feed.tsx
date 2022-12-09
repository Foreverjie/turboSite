import React, { ReactElement } from 'react'
import { Loading } from 'ui'
import { inferQueryOutput, trpc } from '../../utils/trpc'
import PostCard from './PostCard'

// inferQueryOutput<'post.All'>
const Feed = (): ReactElement => {
  const {
    data: posts,
    isLoading,
  }: { data: inferQueryOutput<'post.All'>; isLoading: boolean } = trpc.useQuery(
    ['post.All'],
  )

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
