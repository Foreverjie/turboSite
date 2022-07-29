import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions, Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import jwt from 'jsonwebtoken'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: { email: { label: 'Email' }, password: { label: 'Password' } },
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
      const accessToken = data?.data?.result?.data

      const user = {
        status: 'success',
        data: { email: credentials?.email, accessToken },
      }

      console.log('auth', user)

      if (accessToken) {
        return user
      } else {
        return null
      }
    },
  }),
]

const callbacks = {
  // Getting the JWT token from API response
  async jwt({
    token,
    user,
    account,
  }: {
    token: JWT
    user?: User
    account?: any
  }) {
    if (account && user) {
      return {
        ...token,
        accessToken: user.data.accessToken,
      }
    }

    return token
  },

  async session({ session, token }: { session: Session; token: JWT }) {
    session.accessToken = token.accessToken
    return session
  },
}

const options: NextAuthOptions = {
  providers,
  callbacks,
  jwt: {
    async encode({ secret, token }) {
      const jwtClaims = {
        sub: token?.sub,
        name: token?.name,
        email: token?.email,
        iat: Date.now() / 1000,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      }
      console.log('encode', { secret, token }, jwt.sign(jwtClaims, secret))
      return jwt.sign(jwtClaims, secret)
    },
    async decode({ token, secret }) {
      console.log('decode', { token, secret })
      return jwt.verify(token, secret)
    },
  },
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
