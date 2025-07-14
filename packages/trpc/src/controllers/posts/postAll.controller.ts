import { PostAllOutput, PostAllInput } from '../../schemas/posts'
import { db } from '../../drizzle/client'

export const postAllController = async (input: {
  input: PostAllInput
  ctx: any
}): Promise<PostAllOutput> => {
  const { limit, cursor } = input.input ?? {
    limit: 10,
    cursor: undefined,
  }

  const posts = await db.query.rssItemsTable.findMany({
    where: (items, { gt }) => (cursor ? gt(items.id, cursor) : undefined),
    orderBy: (items, { desc }) => [desc(items.publicationDate)],
    limit: limit ?? 10,
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
