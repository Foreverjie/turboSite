import { ClientOnly } from '~/components/common/ClientOnly'
import { BackToTopFAB, FABContainer } from '~/components/ui/fab'

import { Content } from '../content'
// import { Footer } from '../footer'
import { Header } from '../header'
import { Footer } from '../footer'

export const Root: Component = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      <Content>{children}</Content>

      {/* <Footer /> */}
      <ClientOnly>
        <FABContainer>
          <BackToTopFAB />
        </FABContainer>
      </ClientOnly>
    </>
  )
}
