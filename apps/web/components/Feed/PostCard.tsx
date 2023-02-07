import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import React from 'react'
import { Card, Grid, Text, Link, Avatar } from 'ui'
import { RouterOutput } from '../../utils/trpc'

function PostCard({
  id,
  author,
  content,
}: RouterOutput['post']['all'][number]) {
  const openCommentList = () => {}
  const likePost = () => {}
  const alreadyLike = true
  return (
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
            onClick={likePost}
          />
          <ChatBubbleOvalLeftEllipsisIcon
            className="h-4 w-4 ml-4 cursor-pointer text-gray-400"
            onClick={openCommentList}
          />
        </div>
      </Card.Body>
    </Card>
  )
}

export default PostCard
