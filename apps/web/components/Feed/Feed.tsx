import { PlusCircleIcon } from '@heroicons/react/outline'
import React, { ReactElement } from 'react'
import { Modal, Text, useModal, Button } from 'ui/src'
import PostBox from './PostBox'

const Feed = (): ReactElement => {
  const { setVisible, bindings } = useModal()

  const openNewPostModal = () => {
    setVisible(true)
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

      <div className="">
        <PostBox />

        <Modal
          scroll
          blur
          bottom
          preventClose
          closeButton
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          {...bindings}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Modal with a lot of content
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text id="modal-description">
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros. Praesent commodo cursus
              magna, vel scelerisque nisl consectetur et. Cras mattis
              consectetur purus sit amet fermentum. Cras mattis consectetur
              purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
              in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
              vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
              nisl consectetur et. Cras mattis consectetur purus sit amet
              fermentum. Cras mattis consectetur purus sit amet fermentum. Cras
              justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
              risus, porta ac consectetur ac, vestibulum at eros. Praesent
              commodo cursus magna, vel scelerisque nisl consectetur et. Cras
              mattis consectetur purus sit amet fermentum. Cras mattis
              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
              vel scelerisque nisl consectetur et. Cras mattis consectetur purus
              sit amet fermentum.
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setVisible(false)}>Agree</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default Feed
