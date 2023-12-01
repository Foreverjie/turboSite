import React, { Fragment, ReactElement } from 'react'
import { trpc } from '../../utils/trpc'
import PostCard from './PostCard'
import PostCardLoading from './PostCardLoading'

const Feed = (): ReactElement => {
  const { data, isLoading } = trpc.post.all.useInfiniteQuery(
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
      {data?.pages.map(page =>
        page?.posts?.map(post => <PostCard key={post.id} {...post} />),
      )}
    </Fragment>
  )
}

export default Feed
