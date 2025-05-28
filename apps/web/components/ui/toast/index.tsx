import { useIsDark } from '~/hooks/common/use-is-dark'
import { Toaster as Sonner } from 'sonner'

import { ZIndexProvider } from '../z-index'
import { cn } from 'ui/src/utils'

type ToasterProps = React.ComponentProps<typeof Sonner>
const TOAST_Z_INDEX = 999999999
export const Toaster = ({ ...props }: ToasterProps) => (
  <ZIndexProvider zIndex={TOAST_Z_INDEX}>
    <Sonner
      theme={useIsDark() ? 'dark' : 'light'}
      toastOptions={{
        className: cn`pointer-events-auto group font-theme`,
        classNames: {
          content: 'min-w-0',
          icon: cn`self-start translate-y-[2px]`,
          actionButton: cn`font-sans font-medium`,
          closeButton: cn`!border-border !bg-background transition-opacity will-change-opacity duration-200 opacity-0 group-hover:opacity-100`,
        },
      }}
      {...props}
    />
  </ZIndexProvider>
)
