import React from 'react'

import './DataTableItemDetails.css'

type Props = {
  detail: Record<string,string>
}

function DataTableItemDetails ({ detail }: Props) {
  return (
    <dl>
      {Object.keys(detail).map(i => (
        <React.Fragment key={i}>
          <div className="data-row">
            <strong>{i}</strong>:
            <span>{detail[i] || 'unknown'}</span>
          </div>
        </React.Fragment>
      ))}
    </dl>
  )
}

export default DataTableItemDetails