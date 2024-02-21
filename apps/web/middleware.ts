import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: [
    '/',
    '/(api|trpc)(.*)',
    '/posts',
    '/notes',
    '/timeline',
    '/not-found',
  ],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/(api|trpc)(.*)'],
}
