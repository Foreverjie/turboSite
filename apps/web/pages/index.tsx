import { CustomPage } from '@/lib/types/page.types'
import Feed from 'components/Feed/Feed'
import Widget from 'components/Widget/Widget'
import { WebLayout } from '@/layouts/WebLayout'
import Head from 'next/head'
import Sidebar from '../components/Sidebar/Sidebar'

const Home: CustomPage = () => {
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

Home.getLayout = page => <WebLayout>{page}</WebLayout>

export default Home
