import React, { Fragment, ReactElement } from 'react'
import { trpc } from '../../utils/trpc'
import PostCard from './PostCard'
import PostCardLoading from './PostCardLoading'

const Feed = (): ReactElement => {
  const { data, isLoading } = trpc.post.all.useQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
    },
  )

  return (
    <Fragment>
      {isLoading && [1, 2, 3, 4].map(i => <PostCardLoading key={i} />)}
      {data?.posts &&
        data?.posts.map(p => {
          return <PostCard key={p.id} {...p} />
        })}
    </Fragment>
  )
}

export default Feed
