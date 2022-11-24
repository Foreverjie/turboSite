import React from 'react'
import { Card, Grid, Text, Link } from 'ui'
import { inferQueryOutput } from '../../utils/trpc'

function PostCard({
  id,
  author,
  content,
}: inferQueryOutput<'post.All'>[number]) {
  return (
    <Card css={{ p: '$6', mw: '400px' }}>
      <Card.Header>
        <img alt="nextui logo" src={author.avatar} width="34px" height="34px" />
        <Grid.Container css={{ pl: '$6' }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: '$xs' }}>
              {author.name}
            </Text>
          </Grid>
          {/* <Grid xs={12}>
            <Text css={{ color: '$accents8' }}>nextui.org</Text>
          </Grid> */}
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: '$2' }}>
        <Text>{content}</Text>
      </Card.Body>
      {/* <Card.Footer>
        <Link
          icon
          color="primary"
          target="_blank"
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </Card.Footer> */}
    </Card>
  )
}

export default PostCard
