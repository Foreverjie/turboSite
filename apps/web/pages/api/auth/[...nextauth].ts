import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions, Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
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
      const data = jwt.decode(token.accessToken)
      session.user.accessToken = token.accessToken
      session.user.email = data.user.email
      session.user.name = data.user.name
      session.user.avatar = data.user.avatar

      return session
    },
  },
})
