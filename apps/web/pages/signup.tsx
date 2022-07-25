import { LockClosedIcon } from '@heroicons/react/solid'
import { Input } from 'ui'

export default function Example() {
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <form className="mt-8 space-y-6" action="#" method="POST">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <Input
              type="email"
              id="email"
              defaultValue="Email address"
              className="w-full block"
            />
          </form>
        </div>
      </div>
    </>
  )
}
