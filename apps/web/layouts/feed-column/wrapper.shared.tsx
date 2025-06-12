import { cn } from 'ui/src/utils'

export const styles = cn`relative h-0 grow`
export const animationStyles = cn`duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-24 f-motion-reduce:animate-none`

export interface EntryColumnWrapperProps extends ComponentType {
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void
  onPullToRefresh?: () => Promise<any>
  ref?: React.Ref<HTMLDivElement>
}
