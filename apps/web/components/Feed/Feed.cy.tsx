import React from 'react'
import Feed from './Feed'
import { TrpcProvider } from '~/utils/trpcProvider'

describe('<Feed />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <TrpcProvider>
        <Feed />
      </TrpcProvider>,
    )
  })
})
