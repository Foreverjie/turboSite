import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authSignInInputSchema } from '~/server/schemas/auth'
import prisma from '~/prisma/prisma-client'
import bcrypt from 'bcryptjs'

export const AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Flash',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { email, password } = await authSignInInputSchema.parseAsync(
            credentials,
          )

          const user = await prisma.user.findUnique({
            where: { email },
          })

          if (!user) return null

          const pwdMatch = await bcrypt.compare(password, user.password)

          if (!pwdMatch) return null

          return {
            id: user.id.toString(),
            email,
            username: user.name,
            avatar: user.avatar,
          }
        } catch (error: any) {
          throw new Error(error?.response?.data?.error?.message)
        }
      },
    }),
  ],
  pages: {
    signIn: '/signIn',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.userId = user.id.toString()
        token.email = user.email
        token.username = user.username
        token.avatar = user.avatar
      }

      return token
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user.userId = token.userId
        session.user.email = token.email
        session.user.username = token.username
        session.user.avatar = token.avatar
      }

      return session
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
}

export default NextAuth(AuthOptions)
