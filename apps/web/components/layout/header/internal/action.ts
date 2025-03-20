'use server'

import { signIn } from '~/auth'

export const signInFromServer = () => {
  signIn()
}
