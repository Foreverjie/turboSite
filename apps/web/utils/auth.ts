import { useSession } from 'next-auth/react'

export function requireAuth<T extends (...args: any[]) => any>(
  originalFunction: T,
  onUnauthenticated?: () => void,
): (...args: Parameters<T>) => ReturnType<T> | void {
  const { status } = useSession()
  return function protectedFunction(
    ...args: Parameters<T>
  ): ReturnType<T> | void {
    if (status === 'authenticated') {
      return originalFunction.apply(this, args)
    } else {
      if (onUnauthenticated) {
        onUnauthenticated()
      } else {
        console.log('User not authenticated')
      }
    }
  }
}
