import { CustomPage } from '@/lib/types/page.types'
import Feed from 'components/Feed/Feed'
import { WebLayout } from '@/layouts/WebLayout'
import Head from 'next/head'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Modal, Text, useModal, Button, Textarea, Loading } from 'ui'
import { trpc } from '../utils/trpc'
import { useState } from 'react'
import { SimpleColors } from 'ui/src/utils/prop-types'
import useInput from 'ui/src/use-input'

const Home: CustomPage = () => {
  const { data, isLoading } = trpc.getHello.useQuery()
  console.log('data', data)
  return (
    <div className="lg:max-w-6xl mx-auto">
      <Head>
        <title>Flash</title>
      </Head>

      {/* <Feed /> */}

      {/* <Widget /> */}
    </div>
  )
}

type Helper = {
  text?: string
  color: SimpleColors
}

const HeaderItem = () => {
  const { setVisible, bindings } = useModal()

  const newPostMutation = trpc.useMutation(['post.New'], {
    onSuccess: () => {
      console.log('refetch posts')
    },
  })

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
    <>
      <h1 className="p-5 text-xl font-bold">Home</h1>
      <PlusCircleIcon
        className="m-3 h-8 w-8 cursor-pointer text-primary transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        onClick={openNewPostModal}
      />
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
  )
}

Home.getLayout = page => (
  // <WebLayout headerItem={<HeaderItem />}>{page}</WebLayout>
  <WebLayout headerItem={<></>}>{page}</WebLayout>
)

export default Home
