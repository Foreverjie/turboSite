import { SearchIcon } from '@heroicons/react/outline'
import Feed from 'components/Feed/Feed'
import Widget from 'components/Widget/Widget'
import Head from 'next/head'
import Sidebar from '../components/Sidebar/Sidebar'
import { useSession } from 'next-auth/react'
import { trpc } from 'utils/trpc'

const Home = () => {
  const { data, isLoading } = trpc.useQuery(['user.Me'])

  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Flash</title>
      </Head>

      <main className="grid grid-cols-9">
        <Sidebar />

        <Feed />

        <Widget />
      </main>
    </div>
  )
}

export default Home
