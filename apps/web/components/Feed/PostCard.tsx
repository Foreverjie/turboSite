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
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

function PostCard({
  id,
  author,
  content,
  likeBy,
  files,
}: PostAllOutput[number]) {
  const utils = trpc.useContext()
  const { user } = useUser()
  const likePost = trpc.post.like.useMutation({
    onMutate: async ({ id, like }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await utils.post.all.cancel()

      // Snapshot the previous value
      const previousPosts = utils.post.all.getData()

      // Optimistically update to the new value
      utils.post.all.setData(undefined, oldQueryData => {
        return oldQueryData?.map(post => {
          if (post.id === id && user?.id) {
            return {
              ...post,
              likeBy: like
                ? [...post.likeBy, { userId: user.id }]
                : post.likeBy.filter(l => l.userId !== user?.id),
            }
          }
          return post
        })
      })

      // Return a context object with the snapshotted value
      return { previousPosts }
    },
    onError: (err, like, context) => {
      console.error('Like post err', err, like)
      utils.post.all.setData(undefined, context?.previousPosts)
    },
    onSettled: () => {
      utils.post.all.invalidate()
    },
  })

  const openCommentList = () => {}

  const alreadyLike = user?.id && likeBy.map(l => l.userId).includes(user?.id)

  const toggleLikePost = () => {
    likePost.mutate({ id, like: !alreadyLike })
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
        {files.length > 0 && (
          <Swiper
            slidesPerView={'auto'}
            spaceBetween={24}
            className="photo-swiper m-0 flex items-center justify-start mt-2"
          >
            {files.map(file => (
              <SwiperSlide key={file}>
                <div className="w-32 h-32 mr-2 mb-2 bg-gray-100 rounded-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={file} className="w-full h-full" alt="Img" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
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
              <ThumbsUpIcon size={16} strokeWidth={2} />
              <span>{likeBy.length}</span>
            </div>
            <button className="flex items-center space-x-1 text-gray-500">
              <MessageCircleIcon size={16} strokeWidth={2} />
              <span>0</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500">
              <HeartIcon size={16} strokeWidth={2} />
              <span>0</span>
            </button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PostCard
