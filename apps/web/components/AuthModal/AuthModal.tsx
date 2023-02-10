import React, { MutableRefObject, useState } from 'react'
import { Modal, Text, Input, Row, Button, Checkbox } from 'ui'
import { Password, Mail } from '.'

function AuthModal({
  visible,
  onClose,
}: {
  visible: boolean
  onClose: () => void
}) {
  return (
    <Modal
      closeButton
      preventClose
      aria-labelledby="modal-title"
      open={visible}
      onClose={onClose}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Welcome to
          <Text b size={18}>
            NextUI
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
          contentLeft={<Mail fill="currentColor" />}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
          contentLeft={<Password fill="currentColor" />}
        />
        <Row justify="space-between">
          <Checkbox>
            <Text size={14}>Remember me</Text>
          </Checkbox>
          <Text size={14}>Forgot password?</Text>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={onClose}>
          Close
        </Button>
        <Button auto onPress={onClose}>
          Sign in
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AuthModal
