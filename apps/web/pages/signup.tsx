import { LockClosedIcon } from '@heroicons/react/solid'
import { Input } from 'ui'

export default function Example() {
  return (
    <>
      <div className="">
        <div className="">
          <form className="" action="#" method="POST">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Email address"
              className="w-full block"
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full block"
            />
            <label htmlFor="Confirm password" className="sr-only">
              Confirm password
            </label>
            <Input
              type="password"
              id="passwordConfirm"
              placeholder="Confirm password"
              className="w-full block"
            />
          </form>
        </div>
      </div>
    </>
  )
}
