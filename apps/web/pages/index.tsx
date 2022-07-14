import { SearchIcon } from '@heroicons/react/outline'
import Feed from 'components/Feed/Feed'
import Widget from 'components/Widget/Widget'
import Head from 'next/head'
import Sidebar from '../components/Sidebar/Sidebar'

const Home = () => {
  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Jie's TurboSite</title>
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
