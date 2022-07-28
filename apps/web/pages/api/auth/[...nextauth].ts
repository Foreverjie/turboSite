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
      console.log('user', accessToken)

      const user = {
        status: 'success',
        user: { email: credentials?.email, accessToken },
      }

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
  async jwt(token, user) {
    if (user) {
      token.accessToken = user.token
    }

    return token
  },

  async session(session, token) {
    session.accessToken = token.accessToken
    return session
  },
}

const options = {
  providers,
  callbacks,
}

export default (req: any, res: any) => NextAuth(req, res, options)
