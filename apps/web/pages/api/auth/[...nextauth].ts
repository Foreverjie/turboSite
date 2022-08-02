import jwt from 'jsonwebtoken'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Flash',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const data = await axios.post(
          'http://localhost:8080/trpc/auth.login',
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

        return data?.data?.result
      },
    }),
  ],
  pages: {
    signIn: '/signup',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
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
