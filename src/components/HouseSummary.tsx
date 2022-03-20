import { House } from '../api-asoiaf/types'

export type HouseSummaryProps = {
  data: House|null
}

function CharacterSummary({ data }: HouseSummaryProps) {
  if (!data) return null
  return <div><strong>Name: </strong>{data.name || 'unknown'}</div>
}

export default CharacterSummary