import { LockClosedIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { Button, Input } from 'ui/src'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'

export default function SignUp() {
  const [email, setEmail] = useState('864129545@qq.com')
  const [password, setPassword] = useState('12345678')
  const router = useRouter()

  const handleSignIn = async (e: any) => {
    e.preventDefault()
    const res = await signIn('credentials', {
      email,
      password,
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    })
    if (res?.url) {
      router.push(res.url)
    }
  }

  const { data: session, status } = useSession()

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
              value={email}
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
              value={password}
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
