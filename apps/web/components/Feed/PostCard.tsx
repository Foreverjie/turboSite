import React from 'react'
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
import { useModal } from 'ui'
import { AuthModal } from '../../components/AuthModal'
import { requireAuth } from '../../utils/auth'
import { useSession } from 'next-auth/react'
import { useQueryClient } from '@tanstack/react-query'

// function PostCard({ id, author, content, likeByIds }: any) {
function PostCard() {
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

  // mock data
  const author = {
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/300?img=3',
  }

  const content =
    'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex">
            <Avatar className="mr-2">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {/* Username and userId col */}
            <div className="flex flex-col">
              <div className="text-sm font-bold text-gray-900">Shane</div>
              <div className="text-sm text-gray-500">
                <span className="text-gray-400">@</span>shane-fine
              </div>
            </div>
          </div>
          <MoreHorizontalIcon className="cursor-pointer" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="font-sm text-gray-900">{content}</div>
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
