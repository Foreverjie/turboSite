import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Modal, useModal, Text, Button } from '../src'

export default {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = args => {
  const { setVisible, bindings } = useModal()

  return (
    <>
      <Button auto flat onClick={() => setVisible(true)}>
        Open modal
      </Button>
      <Modal
        scroll
        blur
        fullScreen
        // bottom
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
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Cras mattis
            consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
            facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et. Cras mattis consectetur purus
            sit amet fermentum. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setVisible(false)}>Agree</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export const FullScreenModal = Template.bind({})
