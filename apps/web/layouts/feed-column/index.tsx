import { withResponsiveComponent } from '~/utils/selector'

export const MobileFeedScreen = withResponsiveComponent<object>(
  () =>
    import('./index.desktop').then(m => ({
      default: m.DesktopRootLayout,
    })),
  () =>
    import('./index.mobile').then(m => ({
      default: m.MobileRootLayout,
    })),
)
