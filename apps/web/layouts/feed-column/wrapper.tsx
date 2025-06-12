import { ScrollElementContext } from '~/components/ui/scroll-area/ctx'
import { useState } from 'react'
import type { LegacyRef } from 'react'

import { PullToRefresh } from '~/components/ui/pull-to-refresh'
import { ENTRY_COLUMN_LIST_SCROLLER_ID } from '~/constants/dom'

import type { EntryColumnWrapperProps } from './wrapper.shared'
import { styles } from './wrapper.shared'
import { cn } from 'ui/src/utils'

const noop = async () => {}

export const EntryColumnWrapper = ({
  ref,
  children,
  onPullToRefresh,
  onScroll,
}: EntryColumnWrapperProps) => {
  const [scrollElement, setScrollElement] = useState<HTMLElement | null>(null)

  return (
    <div className={cn(styles, 'relative flex flex-col')}>
      <div ref={ref} className={'grow overflow-hidden mt-2'}>
        <PullToRefresh className="h-full" onRefresh={onPullToRefresh || noop}>
          <ScrollElementContext.Provider value={scrollElement}>
            <div
              className="h-full overflow-y-auto"
              ref={setScrollElement}
              id={ENTRY_COLUMN_LIST_SCROLLER_ID}
              onScroll={onScroll}
            >
              {children}
            </div>
          </ScrollElementContext.Provider>
        </PullToRefresh>
      </div>
    </div>
  )
}
