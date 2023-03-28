import jwt from 'jsonwebtoken'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
// import { setCookie } from 'nookies'

// import { PrismaAdapter } from '@next-auth/prisma-adapter'

// export const authOptions = {
//   // Include user.id on session
//   callbacks: {
//     session({ session, user }: any) {
//       if (session.user) {
//         session.user.id = user.id
//       }
//       return session
//     },
//   },
//   // Configure one or more authentication providers
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GithubProvider({
//       clientId: env.GITHUB_CLIENT_ID,
//       clientSecret: env.GITHUB_CLIENT_SECRET,
//     }),
//   ],
// }

export const AuthOptions = {
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

          // setCookie({ res }, 'access-token', data?.data?.result?.data, {
          //   maxAge: 10 * 24 * 60 * 60,
          //   path: '/',
          //   httpOnly: true,
          // })

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
    async jwt({ token, user, account }: any) {
      if (account && user) {
        console.log('data', user.data)
        return {
          ...token,
          accessToken: user.data,
        }
      }
      return token
    },
    async session({ session, token }: any) {
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
}

export default NextAuth(AuthOptions)
