import React, { Fragment, ReactElement } from 'react'
import { trpc } from '../../utils/trpc'
import PostCard from './PostCard'
import PostCardLoading from './PostCardLoading'

// inferQueryOutput<'post.All'>
const Feed = (): ReactElement => {
  const { data: posts, isLoading } = trpc.post.all.useQuery()

  return (
    <Fragment>
      {isLoading && [1, 2, 3, 4].map(i => <PostCardLoading />)}
      {posts &&
        posts.map(p => {
          return <PostCard key={p.id} {...p} />
        })}
    </Fragment>
  )
}

export default Feed
