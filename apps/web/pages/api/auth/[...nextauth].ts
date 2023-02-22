import jwt from 'jsonwebtoken'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { setCookie } from 'nookies'

export default (req: any, res: any) => {
  return NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: 'Flash',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          try {
            const data = await axios.post(
              process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}/trpc/auth.signIn`
                : 'http://localhost:9797/trpc/auth.signIn',
              {
                password: credentials?.password,
                email: credentials?.email,
              },
              {
                headers: {
                  accept: '*/*',
                  'Content-Type': 'application/json',
                },
              },
            )

            setCookie({ res }, 'access-token', data?.data?.result?.data, {
              maxAge: 10 * 24 * 60 * 60,
              path: '/',
              httpOnly: true,
            })

            return data?.data?.result
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
      async jwt({ token, user, account }) {
        if (account && user) {
          console.log('data', user.data)
          return {
            ...token,
            accessToken: user.data,
          }
        }
        return token
      },
      async session({ session, token }) {
        const data: any = jwt.decode(token.accessToken as string)
        const user = {
          id: data?.user?.id,
          accessToken: token.accessToken,
          email: data?.user?.email,
          name: data?.user.name,
          image: data?.user?.avatar,
        }
        return {
          ...session,
          user,
        }
      },
    },
  })
}
