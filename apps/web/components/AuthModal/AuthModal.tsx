import { signIn, SignInResponse } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { MutableRefObject, useState } from 'react'
import { toast } from 'react-toastify'
import { Modal, Text, Input, Row, Button, Checkbox } from 'ui'
import { Password, Mail } from '.'

function AuthModal({
  visible,
  onClose,
}: {
  visible: boolean
  onClose: () => void
}) {
  const [email, setEmail] = useState('864129545@qq.com')
  const [password, setPassword] = useState('12345678')
  // const router = useRouter()

  const handleSignIn = async () => {
    signIn('credentials', { email, password, redirect: false }).then(
      (response: SignInResponse | undefined) => {
        if (!response?.ok) {
          console.log(response?.error)
          toast(response?.error, { type: 'error' })
        }
      },
    )
  }

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
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
          contentLeft={<Mail fill="currentColor" />}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
          value={password}
          onChange={e => {
            setPassword(e.target.value)
          }}
          contentLeft={<Password fill="currentColor" />}
        />
        <Row justify="space-between">
          <Text size={14}>Don&apos;t have account?</Text>
          <Text size={14}>Forgot password?</Text>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={onClose}>
          Close
        </Button>
        <Button auto onPress={handleSignIn}>
          Sign in
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AuthModal
