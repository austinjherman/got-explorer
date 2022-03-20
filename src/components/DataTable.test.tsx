import { render, screen } from '@testing-library/react'

import { factory, newMockCharacter } from '../api-asoiaf/types'

import CharacterDetails from './CharacterDetails'
import CharacterSummary from './CharacterSummary'
import DataTable from './DataTable'

test('renders a list', () => {
  const characters = factory(10, newMockCharacter)
  const detailsComponent = CharacterDetails
  const summaryComponent = CharacterSummary
  render(<DataTable 
    data={{ detailsComponent, summaryComponent, data: characters }}
    onItemClick={() => null}/>
  )
  const listItems = screen.getAllByText('Name:')
  expect(listItems.length).toBe(10)
})

test('runs onItemClick when single item clicked', () => {
  let count = 0
  const characters = factory(1, newMockCharacter)
  const detailsComponent = CharacterDetails
  const summaryComponent = CharacterSummary
  render(<DataTable
    data={{ detailsComponent, summaryComponent, data: characters }}
    onItemClick={() => count++}/>
  )
  const button = screen.getByRole('button')
  button.click()
  expect(count).toBe(1)
})