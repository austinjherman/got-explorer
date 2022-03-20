import { render, screen } from '@testing-library/react'

import * as api from '../api-asoiaf'
import { newMockCharacter, newMockHouse } from '../api-asoiaf/types'

import CharacterDetails from './CharacterDetails'

test('asynchronously loads allegiances', async () => {
  const getHouseByIDSpy = jest.spyOn(api, 'getHouseByID')
    .mockImplementation((): Promise<any> => {
      return Promise.resolve({ json: () => Promise.resolve(newMockHouse()) })
    })
  const character = newMockCharacter()
  render(<CharacterDetails data={character} />)
  expect(getHouseByIDSpy).toBeCalled()
  const name = await screen.findByText(/character name/)
  expect(name).toBeInTheDocument()
})