import { PlusCircleIcon } from '@heroicons/react/outline'
import React, {
  ReactElement,
  Ref,
  useRef,
  useMemo,
  useState,
  Suspense,
} from 'react'
import { Modal, Text, useModal, Button, Textarea, Loading } from 'ui'
import useInput from 'ui/src/use-input'
import { inferQueryOutput, trpc } from '../../utils/trpc'
import PostCard from './PostCard'

// inferQueryOutput<'post.All'>
const Feed = (): ReactElement => {
  const { setVisible, bindings } = useModal()

  const newPostMutation = trpc.useMutation(['post.New'], {
    onSuccess: () => {
      console.log('refetch posts')
    },
  })
  const {
    data: posts,
    isLoading,
  }: { data: inferQueryOutput<'post.All'>; isLoading: boolean } = trpc.useQuery(
    ['post.All'],
  )

  console.log('posts', posts, isLoading)

  const openNewPostModal = () => {
    setVisible(true)
  }
  const [helper, setHelper] = useState<Helper>({ text: '', color: 'default' })

  const { value, setValue, reset, bindings: textBindings } = useInput('')

  const newPost = async () => {
    if (validatePost(value)) {
      await newPostMutation.mutate({ content: value })
      setVisible(false)
    }
  }

  const validatePost = (value: string): boolean => {
    if (!value) {
      setHelper({
        text: 'Enter something...',
        color: 'error',
      })
      return false
    }
    setHelper({
      text: '',
      color: 'default',
    })
    return true
  }

  return (
    <div className="">
      <>
        {isLoading && <Loading />}

        {posts &&
          posts.map(p => {
            return <PostCard key={p.id} {...p} />
          })}
      </>
    </div>
  )
}

export default Feed
