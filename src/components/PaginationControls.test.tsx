import { render, screen } from '@testing-library/react'
import PaginationControls from './PaginationControls'

test('runs next when clicked', () => {
  let count = 0
  render(<PaginationControls
    isLastPage={false} 
    isFirstPage={false} 
    isResults={true}
    nextAction={() => count++}
    prevAction={() => null} />)
  const button = screen.getByText('Next')
  button.click()
  expect(count).toBe(1)
})

test('runs prev when clicked', () => {
  let count = 0
  render(<PaginationControls
    isLastPage={false} 
    isFirstPage={false} 
    isResults={true}
    nextAction={() => null}
    prevAction={() => count++} />)
  const button = screen.getByText('Previous')
  button.click()
  expect(count).toBe(1)
})

test('Prev disabled if isFirstPage', () => {
  render(<PaginationControls
    isLastPage={false} 
    isFirstPage={true} 
    isResults={true}
    nextAction={() => null}
    prevAction={() => null} />)
  const button = screen.getByText('Previous')
  button.hasAttribute('disabled')
  expect(button.hasAttribute('disabled')).toBe(true)
})

test('Next disabled if isLastPage', () => {
  render(<PaginationControls
    isLastPage={true} 
    isFirstPage={false} 
    isResults={true}
    nextAction={() => null}
    prevAction={() => null} />)
  const button = screen.getByText('Next')
  button.hasAttribute('disabled')
  expect(button.hasAttribute('disabled')).toBe(true)
})