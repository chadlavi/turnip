import React from 'react'
import { render } from '@testing-library/react'
import Turnip from './Turnip'

test('renders ', () => {
  const { getByText } = render(<Turnip />)
  const h1 = getByText(/turnip calc/i)
  expect(h1).toBeInTheDocument()
})
