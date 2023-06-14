import React, { Fragment, ReactElement } from 'react'
import { Loading } from 'ui'
import { trpc } from '../../utils/trpc'
import PostCard from './PostCard'

// inferQueryOutput<'post.All'>
const Feed = (): ReactElement => {
  const { data: posts, isLoading } = trpc.post.all.useQuery()

  console.log('posts', posts)

  return (
    <Fragment>
      <div className="flex items-center justify-center">
        Render Fine
        {posts?.length}
        {/* {isLoading && <Loading />} */}
      </div>

      <PostCard />

      {/* {posts &&
        posts.map(p => {
          return <PostCard key={p.id} {...p} />
        })} */}
    </Fragment>
  )
}

export default Feed
