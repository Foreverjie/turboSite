import { PlusCircleIcon } from '@heroicons/react/outline'
import React, { ReactElement, Ref, useRef } from 'react'
import { Modal, Text, useModal, Button, Textarea } from 'ui'
import useInput from 'ui/src/use-input'
import PostBox from './PostBox'

const Feed = (): ReactElement => {
  const { setVisible, bindings } = useModal()

  const openNewPostModal = () => {
    setVisible(true)
  }

  const { value, setValue, reset, bindings: textBindings } = useInput('')

  return (
    <div className="col-span-7 lg:col-span-5 border-x">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <PlusCircleIcon
          className="mr-5 mt-5 h-8 w-8 cursor-pointer text-primary transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
          onClick={openNewPostModal}
        />
      </div>

      <div className="">
        <PostBox />

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
            <Textarea {...textBindings} autoFocus />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setVisible(false)}>Post</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default Feed
