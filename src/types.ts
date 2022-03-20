import React from 'react'

export type DataTableData = Record<string, string|string[]>[]

export type DataTableInterface = {
  summaryComponent: React.ComponentType<any>
  detailsComponent: React.ComponentType<any>
  data: DataTableData
}

