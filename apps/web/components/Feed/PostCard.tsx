import { useUser } from '@clerk/nextjs'
import {
  HeartIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  ThumbsUpIcon,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from 'ui/src/avatar'
import { Card, CardContent, CardFooter, CardHeader } from 'ui/src/card'
import { PostAllOutput } from '../../server/schemas/posts'
import { trpc } from '../../utils/trpc'
import { cn } from 'ui/src/utils'

function PostCard({ id, author, content, likeBy }: PostAllOutput[number]) {
  const utils = trpc.useContext()
  const { user } = useUser()
  const likePost = trpc.post.like.useMutation({
    onSuccess: () => {
      utils.post.all.invalidate()
    },
  })

  const openCommentList = () => {}

  const alreadyLike = user?.id && likeBy.map(l => l.userId).includes(user?.id)

  const toggleLikePost = () => {
    likePost.mutate({ id, like: alreadyLike ? false : true })
  }

  return (
    <Card key={id}>
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
          <div className="flex items-center space-x-4">
            <div
              className={cn(
                'flex items-center space-x-1 text-gray-500',
                alreadyLike ? 'text-red-500' : '',
              )}
              onClick={toggleLikePost}
            >
              <ThumbsUpIcon />
              <span>{likeBy.length}</span>
            </div>
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
