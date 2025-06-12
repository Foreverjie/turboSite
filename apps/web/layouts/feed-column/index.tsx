import { withResponsiveComponent } from '~/utils/selector'

const noop = () =>
  Promise.resolve({
    default: () => null,
  })
// export const LeftSidebarLayout = withResponsiveComponent<object>(
//   () =>
//     import('./desktop').then(m => ({
//       default: m.MainDesktopLayout,
//     })),
//   () =>
//     import('./index.mobile').then(m => ({
//       default: m.MobileRootLayout,
//     })),
// )

export const MobileFeedScreen = withResponsiveComponent<object>(noop, () =>
  import('./index.mobile').then(m => ({
    default: m.MobileRootLayout,
  })),
)
