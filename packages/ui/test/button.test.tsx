import React from 'react'
import * as ReactDOM from 'react-dom'
import { Button } from '../stories/Button'

describe('Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button label="button" />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
