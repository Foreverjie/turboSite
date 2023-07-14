import { authMiddleware } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export default authMiddleware()

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}

export function middleware(request: NextRequest) {
  const theme = request.cookies.get('theme')?.value ?? 'dark'

  const response = NextResponse.next()

  response.cookies.set('theme', theme, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: new Date(2147483647 * 1000),
  })

  return response
}
