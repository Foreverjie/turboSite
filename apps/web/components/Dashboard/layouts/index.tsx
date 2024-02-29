import { PropsWithChildren } from 'react'
import { cn } from 'ui/src/utils'
import { RootPortal } from '../../ui/portal'

export const OffsetHeaderLayout: Component<PropsWithChildren> = props => {
  return (
    <RootPortal>
      <div
        className={cn('fixed right-4 top-[4rem] z-[19] flex', props.className)}
      >
        {props.children}
      </div>
    </RootPortal>
  )
}
