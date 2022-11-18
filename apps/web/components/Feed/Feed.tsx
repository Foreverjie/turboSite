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
import { SimpleColors } from 'ui/src/utils/prop-types'
import { trpc } from '../../utils/trpc'
import PostBox from './PostBox'

type Helper = {
  text?: string
  color: SimpleColors
}

const Feed = (): ReactElement => {
  const { setVisible, bindings } = useModal()

  const newPostMutation = trpc.useMutation(['post.New'])
  const { data: posts, isLoading } = trpc.useQuery(['post.All'])

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
    <div className="col-span-7 lg:col-span-5 border-x">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <PlusCircleIcon
          className="mr-5 mt-5 h-8 w-8 cursor-pointer text-primary transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
          onClick={openNewPostModal}
        />
      </div>

      <>
        {isLoading && <Loading />}

        {posts &&
          posts.map(p => {
            return <div key={p.id}>{p.content}</div>
          })}

        <Modal
          scroll
          blur
          bottom
          closeButton
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          {...bindings}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              New Post
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Loading />
            <Textarea
              {...textBindings}
              autoFocus
              onChange={event => {
                validatePost(event.target.value)
                setValue(event.target.value)
              }}
              helperColor={helper.color}
              placeholder={'Give the world a surprise...'}
              helperText={helper.text}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={newPost}>Post</Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  )
}

export default Feed
