import React from 'react'
import { render } from '@testing-library/react'
import Turnip from './Turnip'

test('renders learn react link', () => {
  const { getByText } = render(<Turnip />)
  const linkElement = getByText(/turnip calc/i)
  expect(linkElement).toBeInTheDocument()
})
