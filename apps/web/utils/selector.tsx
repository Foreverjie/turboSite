import type { ComponentType, ReactNode, RefAttributes } from 'react'
import { lazy, Suspense } from 'react'
import { useIsMobile } from './viewport'

export function withResponsiveComponent<P extends object>(
  desktopImport: () => Promise<{ default: ComponentType<P> }>,
  mobileImport: () => Promise<{ default: ComponentType<P> }>,
  fallbackElement?: ReactNode,
) {
  const LazyDesktopLayout = lazy(desktopImport) as unknown as ComponentType<P>
  const LazyMobileLayout = lazy(mobileImport) as unknown as ComponentType<P>

  return function ResponsiveLayout(props: P) {
    const isMobile = useIsMobile()

    return (
      <Suspense fallback={fallbackElement}>
        {isMobile ? (
          <LazyMobileLayout {...props} />
        ) : (
          <LazyDesktopLayout {...props} />
        )}
      </Suspense>
    )
  }
}

export function withResponsiveSyncComponent<P extends object, R = any>(
  DesktopComponent: ComponentType<P & RefAttributes<R>>,
  MobileComponent: ComponentType<P & RefAttributes<R>>,
) {
  return function ResponsiveLayout({
    ref,
    ...props
  }: P & { ref?: React.Ref<R> | ((node: R | null) => void) }) {
    const isMobile = useIsMobile()
    const componentProps = { ...props } as P & RefAttributes<R>

    console.log('Rendering component:', {
      isMobile,
    })

    return isMobile ? (
      <MobileComponent {...componentProps} ref={ref} />
    ) : (
      <DesktopComponent {...componentProps} ref={ref} />
    )
  }
}
