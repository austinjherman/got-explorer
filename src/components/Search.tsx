import { useState } from 'react'
import { getCharacterByName, getHouseByName } from '../api-asoiaf'

import { view } from '../App'
import { DataTableInterface, DataTableData } from '../types'

import './Search.css'

type Props = {
  currentViewName: string
  setViewData: React.Dispatch<React.SetStateAction<DataTableInterface>>
}

function Search({ currentViewName, setViewData }: Props) {

  const [searchValue, setSearchValue] = useState('')

  async function handleSearch() {
    let data: DataTableData = []
    if (currentViewName === view.characters) {
      const response = await getCharacterByName(encodeURIComponent(searchValue.trim()))
      if (response.data.length > 0) data.push(response.data[0])
    }
    if (currentViewName === view.houses) {
      const response = await getHouseByName(encodeURIComponent(searchValue.trim()))
      if (response.data.length > 0) data.push(response.data[0])
    }
    setViewData(prev => ({ ...prev, data }))
  }

  return (
    <div className="search-wrap">
      <form className="search" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <label>
          <span className="small">Search {currentViewName} (must search exact name)</span>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} />
        </label>
        <button type="submit">Search</button>
      </form>
      <button className="button--clear" onClick={() => window.location.reload()}>
        Clear Search
      </button>
    </div>
  )
}

export default Search