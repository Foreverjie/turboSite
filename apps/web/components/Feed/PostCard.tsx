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
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.'

  return (
    <Card>
      <CardHeader>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
        {/* Username and userId col */}
        <div className="flex flex-col">
          <div className="text-lg text-gray-900">Shane</div>
          <div className="text-sm text-gray-500">
            <span className="text-gray-400">@</span>shane-fine
          </div>
        </div>
        <MoreHorizontalIcon />
      </CardHeader>
      <CardContent>
        <div className="text-gray-900">{content}</div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-900"
              onClick={toggleLikePost}
            >
              <ThumbsUpIcon />
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
