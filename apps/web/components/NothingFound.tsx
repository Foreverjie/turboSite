import { EmptyIcon } from '~/components/icons/empty'
import { NormalContainer } from '~/components/layout/container/Normal'

export const NothingFound: Component = () => {
  return (
    <NormalContainer className="flex h-[500px] flex-col space-y-4 center [&_p]:my-4">
      <EmptyIcon />
      <p>Nothing here</p>
      <p>Come back later to take a look</p>
    </NormalContainer>
  )
}
