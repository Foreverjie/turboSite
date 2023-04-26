import { trpc } from '@/utils/trpc'
import React, { useState } from 'react'

function SignUp() {
  const [email, setEmail] = useState('864129545@qq.com')
  const [password, setPassword] = useState('12345678')
  const [name, setName] = useState('Jie')
  const [passwordConfirm, setPasswordConfirm] = useState('12345678')
  const signUp = trpc.auth.signUp.useMutation()
  trpc.sayHello.useQuery({ name: 'Jie' })

  // add handleSubmit
  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(email)
    try {
      signUp.mutate({ email, password, name, passwordConfirm })
    } catch (e) {
      console.log('e', e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <label className="text-sm font-medium">Name</label>
      <input
        type="text"
        name="name"
        onChange={e => setName(e.target.value)}
        value={name}
        className="border border-gray-300 rounded-md px-2 py-1"
      />
      <label className="text-sm font-medium">Email</label>
      <input
        type="email"
        name="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
        className="border border-gray-300 rounded-md px-2 py-1"
      />
      <label className="text-sm font-medium">Password</label>
      <input
        type="password"
        name="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
        className="border border-gray-300 rounded-md px-2 py-1"
      />
      <label className="text-sm font-medium">Confirm Password</label>
      <input
        type="password"
        name="passwordConfirm"
        onChange={e => setPasswordConfirm(e.target.value)}
        value={passwordConfirm}
        className="border border-gray-300 rounded-md px-2 py-1"
      />
      <button className="bg-gray-300 rounded-md px-2 py-1">Submit</button>
    </form>
  )
}

export default SignUp
