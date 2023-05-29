import { type ReactElement } from 'react'
import { type RenderOptions, render } from '@testing-library/react'
import { TrpcMockProvider } from './trpcProvider'

export const renderWithProviders: any = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return render(ui, {
    wrapper: props => <TrpcMockProvider {...props} />,
    ...options,
  })
}
