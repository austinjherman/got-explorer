import { render, screen } from '@testing-library/react'

import App from './App'

test('renders an <h1>', async () => {
  render(<App />)
  const h1Element = await screen.findByRole('heading', { level: 1 })
  expect(h1Element).toBeInTheDocument()
})
