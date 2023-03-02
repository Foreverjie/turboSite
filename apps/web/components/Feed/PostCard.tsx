import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import React from 'react'
import { Card, Grid, Text, Link, Avatar } from 'ui'
import { RouterOutput, trpc } from '../../utils/trpc'
import { useModal } from 'ui'
import { AuthModal } from '../../components/AuthModal'
import { requireAuth } from '../../utils/auth'
import { useSession } from 'next-auth/react'
import { useQueryClient } from '@tanstack/react-query'

function PostCard({
  id,
  author,
  content,
  likeByIds,
}: RouterOutput['post']['all'][number]) {
  const utils = trpc.useContext()
  const queryClient = useQueryClient()
  const likePost = trpc.post.like.useMutation({
    onSuccess: () => {
      utils.post.all.invalidate()
    },
  })
  const dislikePost = trpc.post.dislike.useMutation({
    onSuccess: () => {
      utils.post.all.invalidate()
    },
  })

  const { data, status } = useSession()

  const openCommentList = () => {}

  console.log('likeByIds', likeByIds)
  const alreadyLike = data?.user?.id && likeByIds.includes(data.user.id)

  const toggleLikePost = () => {
    if (alreadyLike) {
      dislikePost.mutate({ id })
    } else {
      likePost.mutate({ id })
    }
  }

  return (
    <>
      <Card isPressable borderWeight="light">
        <Card.SideContent css={{ pt: '$6', ai: 'flex-start' }}>
          <Avatar
            alt={author.name}
            src={author.avatar}
            width="34px"
            height="34px"
          />
        </Card.SideContent>
        <Card.Body css={{ py: '$1', mt: '$4' }}>
          <Text h4 css={{ lineHeight: '$xs', fontWeight: '$bold' }}>
            {author.name}
          </Text>
          <Text css={{ lineHeight: '$s', mt: '$4', mb: '$8' }}>{content}</Text>
          <div className="flex flex-row mb-2">
            <HeartIcon
              className={`h-4 w-4 cursor-pointer ${
                alreadyLike ? 'fill-current text-red-500' : 'text-gray-400'
              }`}
              onClick={toggleLikePost}
            />
            <ChatBubbleOvalLeftEllipsisIcon
              className="h-4 w-4 ml-4 cursor-pointer text-gray-400"
              onClick={openCommentList}
            />
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default PostCard
