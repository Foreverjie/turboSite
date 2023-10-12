import React, { ElementType } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'ui/src/card'
import { Avatar, AvatarFallback, AvatarImage } from 'ui/src/avatar'
import {
  MoreHorizontalIcon,
  HeartIcon,
  ThumbsUpIcon,
  MessageCircleIcon,
} from 'lucide-react'
import { trpc } from '../../utils/trpc'
import { AuthModal } from '../../components/AuthModal'
import { requireAuth } from '../../utils/auth'
import { useSession } from 'next-auth/react'
import { useQueryClient } from '@tanstack/react-query'
import { RouterOutput } from '../../client/trpcClient'

function PostCard({
  id,
  author,
  content,
}: RouterOutput['post']['all'][number]) {
  // function PostCard() {
  // const utils = trpc.useContext()
  // const queryClient = useQueryClient()
  // const likePost = trpc.post.like.useMutation({
  //   onSuccess: () => {
  //     utils.post.all.invalidate()
  //   },
  // })
  // const dislikePost = trpc.post.dislike.useMutation({
  //   onSuccess: () => {
  //     utils.post.all.invalidate()
  //   },
  // })

  // const { data, status } = useSession()

  const openCommentList = () => {}

  // console.log('likeByIds', likeByIds)
  // const alreadyLike = data?.user?.id && likeByIds.includes(data.user.id)
  const alreadyLike = false

  const toggleLikePost = () => {
    // if (alreadyLike) {
    //   dislikePost.mutate({ id })
    // } else {
    //   likePost.mutate({ id })
    // }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex">
            <Avatar className="mr-2">
              <AvatarImage src={author.avatar} />
              <AvatarFallback>{author.name}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="text-sm font-bold">{author.name}</div>
              <div className="text-sm text-gray-500">
                <span className="text-gray-400">@</span>
                {author.id}
              </div>
            </div>
          </div>
          <MoreHorizontalIcon className="cursor-pointer" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="font-sm">{content}</div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-900"
              onClick={toggleLikePost}
            >
              <ThumbsUpIcon />
              <span>0</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-900">
              <MessageCircleIcon />
              <span>0</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-900">
              <HeartIcon />
              <span>0</span>
            </button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PostCard
