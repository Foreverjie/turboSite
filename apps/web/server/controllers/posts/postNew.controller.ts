import {
  PostNewInput,
  PostNewOutput,
  PostNewHookInput,
  PostNewHookOutput,
} from '../../schemas/posts'
import prisma from '../../../prisma/prisma-client'
import { TRPCError } from '@trpc/server'

export const postNewController = async ({
  input,
  ctx,
}: {
  input: PostNewInput
  ctx: any
}): Promise<PostNewOutput> => {
  const post = await prisma.post.create({
    data: {
      content: input.content,
      files: input.files,
      author: {
        connect: { userId: ctx.auth.userId },
      },
    },
  })
  return post
}

export const postNewHookController = async ({
  input,
  ctx,
}: {
  input: PostNewHookInput
  ctx: any
}): Promise<PostNewHookOutput> => {
  if (input.event_type === 'new_entries') {
    const { feed } = input
    await prisma.category.upsert({
      where: { categoryId: feed.id.toString() },
      update: {
        updatedAt: new Date(),
      },
      create: {
        name: feed.title,
        feedUrl: feed.feed_url,
        siteUrl: feed.site_url,
        categoryId: feed.id.toString(),
      },
    })
    for (const entry of input.entries) {
      const f = await prisma.feed.upsert({
        where: { feedId: entry.id.toString() },
        update: {
          updatedAt: new Date(),
        },
        create: {
          title: entry.title,
          content: entry.content,
          url: entry.url,
          feedId: entry.id.toString(),
          categoryId: feed.id.toString(),
          link: entry.url,
        },
      })
    }
  } else {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Invalid event_type',
    })
  }
  return { success: true }
}
