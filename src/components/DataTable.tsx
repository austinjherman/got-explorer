import React from 'react'

import { DataTableInterface } from '../types'

import './DataTable.css'

type Props = {
  data: DataTableInterface
  onItemClick: React.Dispatch<React.SetStateAction<any>>
}

function DataTable({ data, onItemClick }: Props) {
  if (data.data.length < 1) {
    return <p>No results found.</p>
  }
  return (
    <ul className="data-table">
      { data.data.length > 0 && data.data.map((i, idx) => (
        <li key={idx}>
          <button onClick={() => onItemClick(i)}>
            <data.summaryComponent data={i} />
          </button>
        </li>
      )) }
    </ul>
  )
}

export default DataTable