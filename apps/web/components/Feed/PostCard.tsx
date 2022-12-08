import React from 'react'
import { Card, Grid, Text, Link, Avatar } from 'ui'
import { inferQueryOutput } from '../../utils/trpc'

function PostCard({
  id,
  author,
  content,
}: inferQueryOutput<'post.All'>[number]) {
  return (
    <Card isPressable borderWeight="light">
      <Card.SideContent css={{ pt: '$6' }}>
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
      </Card.Body>
      {/* <Card.Footer></Card.Footer> */}
    </Card>
  )
}

export default PostCard
