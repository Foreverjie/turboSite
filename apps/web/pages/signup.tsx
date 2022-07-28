import { LockClosedIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { Button, Input } from 'ui'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignIn = (e: any) => {
    e.preventDefault()
    console.log('data', email, password)
    const res = signIn('credentials', {
      email,
      password,
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    })
    if (res.url) {
      router.push(url)
    }
  }

  return (
    <>
      <div className="">
        <div className="">
          <form className="flex flex-col" onSubmit={handleSignIn}>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Email address"
              className="w-full block"
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full block"
              onChange={e => setPassword(e.target.value)}
            />
            {/* <label htmlFor="Confirm password" className="sr-only">
              Confirm password
            </label>
            <Input
              type="password"
              id="passwordConfirm"
              placeholder="Confirm password"
              className="w-full block"
            /> */}
            <Button />
          </form>
        </div>
      </div>
    </>
  )
}
