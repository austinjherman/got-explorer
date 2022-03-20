import React, { useCallback, useEffect, useState } from 'react'

import { getCharactersByPage, getHousesByPage } from './api-asoiaf'
import { DataTableInterface } from './types'

import CharacterDetails from './components/CharacterDetails'
import CharacterSummary from './components/CharacterSummary'
import DataTable from './components/DataTable'
import HouseDetails from './components/HouseDetails'
import HouseSummary from './components/HouseSummary'
import Modal from './components/Modal'
import PaginationControls from './components/PaginationControls'
import Search from './components/Search'

import './App.css'

// view enum helper so we don't have strings all over the place
export enum view {
  characters = 'characters',
  houses = 'houses'
}

// helper function to get the next page
function nextPage(currentPage: number, isLastPage: boolean) {
  if (isLastPage) return currentPage
  return currentPage + 1
}

// helper function to get the previous paage
function prevPage(currentPage: number) {
  if (currentPage <= 1) return 1
  return currentPage - 1
}

function App() {

  // global state
  const [currentViewName, setCurrentViewName] = useState<string>(view.characters)
  // const [errorMessage, setErrorMessage] = useState<string>('')
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const [modalData, setModalData] = useState<React.ComponentType|null>(null)

  // type specific state; we need to keep track of which page we're on for each tab
  const [characterPage, setCharacterPage] = useState(1)
  const [housePage, setHousePage] = useState(1)

  // If our data implements the DataTableInterface, we don't really need to distinguish   // between concrete types in state. Since we know it implements the DataTableInterface, // we know we can pass it to our <DataTable /> component.
  const [viewData, setViewData] = useState<DataTableInterface>({
    summaryComponent: () => null,
    detailsComponent: () => null,
    data: []
  })

  // helper function to populate the view data
  const populateView = useCallback(
    async (page: number) => {
      if (currentViewName === view.characters) {
        const response = await getCharactersByPage(page)
        const detailsComponent = CharacterDetails
        const summaryComponent = CharacterSummary
        setViewData({ detailsComponent, summaryComponent, data: response.data })
        setIsLastPage(response.isLastPage)
      }
      else if (currentViewName === view.houses) {
        const response = await getHousesByPage(page)
        const detailsComponent = HouseDetails
        const summaryComponent = HouseSummary
        setViewData({ detailsComponent, summaryComponent, data: response.data })
        setIsLastPage(response.isLastPage)
      }
    }, [currentViewName]
  )

  useEffect(() => {
    const page = currentViewName === view.characters ? characterPage : housePage
    populateView(page)
  }, [characterPage, currentViewName, housePage, populateView])

  return (
    <div className="app-got" data-modal-open={modalData !== null}>

      <div className="app-main">
        <div className="intro">
          <h1>Game of Thrones Character and House Explorer</h1>
          <p>
            Use the tools below to explore the characters and houses of Game of Thrones.
          </p>
        </div>
        <div className="controls--content">
          <button
            data-active={currentViewName === view.characters}
            onClick={() => setCurrentViewName(view.characters)}>Characters</button>
          <button
            data-active={currentViewName === view.houses}
            onClick={() => setCurrentViewName(view.houses)}>Houses</button>
        </div>
        <Search currentViewName={currentViewName} setViewData={setViewData} />
        <div className="content">
        {currentViewName === view.characters && (
          <PaginationControls
            isFirstPage={characterPage === 1}
            isLastPage={isLastPage}
            isResults={viewData.data.length > 0}
            nextAction={() => setCharacterPage(nextPage(characterPage, isLastPage))}
            prevAction={() => setCharacterPage(prevPage(characterPage))} />
          )}
          {currentViewName === view.houses && (
            <PaginationControls
              isFirstPage={housePage === 1}
              isLastPage={isLastPage}
              isResults={viewData.data.length > 0}
              nextAction={() => setHousePage(nextPage(housePage, isLastPage))}
              prevAction={() => setHousePage(prevPage(housePage))} />
          )}
          <DataTable data={viewData} onItemClick={setModalData} />
        </div>
      </div>

      <div className="app-modal">
        {modalData && (
          <Modal
            close={() => setModalData(null)}
            jsx={() => <viewData.detailsComponent data={modalData} /> }/>
        )}
      </div>

    </div>
  )
}

export default App
