import React from 'react'
import Feed from './Feed'
import { TrpcMockProvider, worker } from '~/utils/trpcProvider'
import { setupServer } from 'msw/node'
import { screen, waitFor } from '@testing-library/react'
import { trpcMsw } from '~/utils/trpc'
import { renderWithProviders } from '~/utils/setupMockServer'

describe('<Feed />', () => {
  before(() => {
    worker.start()
  })
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      // renderWithProviders(<Feed />),
      <TrpcMockProvider>
        <Feed />
      </TrpcMockProvider>,
    )
  })
})
