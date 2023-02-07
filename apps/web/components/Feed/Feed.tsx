import React, { ReactElement } from 'react'
import { Loading } from 'ui'
import { RouterOutput, trpc } from '../../utils/trpc'
import PostCard from './PostCard'

// inferQueryOutput<'post.All'>
const Feed = (): ReactElement => {
  const {
    data: posts,
    isLoading,
  }: {
    data: RouterOutput['post']['all']
    isLoading: boolean
  } = trpc.post.all.useQuery()

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
