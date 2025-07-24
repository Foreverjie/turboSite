import { PostAllOutput, PostAllInput } from '../../schemas/posts'
import { db } from '../../drizzle/client'
import { TRPCError } from '@trpc/server'

export const postAllController = async (input: {
  input: PostAllInput
  ctx: any
}): Promise<PostAllOutput> => {
  //   try {
  //     const response = await fetch('https://barry.scflash.win/fetch', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({}),
  //   })
  //   const data = await response.json()
  //   console.log('Data fetched:', data)
  // } catch (error) {
  //   throw new TRPCError({
  //     code: 'INTERNAL_SERVER_ERROR',
  //     message: 'Failed to fetch data',
  //   })
  // }

  const { limit, cursor } = input.input ?? {
    limit: 10,
    cursor: undefined,
  }

  const posts = await db.query.rssItemsTable.findMany({
    where: (items, { gt }) => (cursor ? gt(items.id, cursor) : undefined),
    orderBy: (items, { desc }) => [desc(items.datePublished)],
    limit: limit ?? 10,
    with: {
      rssSub: {
        columns: {
          id: true,
          title: true,
          icon: true,
          favicon: true,
          homePageUrl: true,
          description: true,
        }
      }
    }
  })

  let nextCursor: number | undefined = undefined

  if (posts.length > 0) {
    nextCursor = posts[posts.length - 1].id
  }
  return {
    posts,
    nextCursor,
  }
}
